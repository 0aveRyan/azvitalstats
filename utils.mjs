import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import sum from 'lodash.sum';
import values from 'lodash.values';
import merge from 'lodash.merge';
import keyBy from 'lodash.keyby';
import mapKeys from 'lodash.mapkeys';
import mapValues from 'lodash.mapvalues';

const types = [ 'births', 'deaths', 'mars', 'divs' ];
const date = new Date();
const year = date.getFullYear();
const rootUrl = 'https://pub.azdhs.gov/health-stats/mu/';

/**
 * Take path to .xlsx file, return object of first sheet.
 * @param {string} path 
 */
function readXLSXtoObj( path ) {
    const workbook = XLSX.readFile(path);
    const sheet    = workbook.SheetNames[0];
    return XLSX.utils.sheet_to_json( workbook.Sheets[ sheet ] );
}

/**
 * Take filename and data, write JSON to directory.
 * @param {string} filenameNoExt Base filename (minus extension)
 * @param {object} data Data object to convert to JSON.
 */
function writeJSON( filenameNoExt, data ) {
    return fs.writeFile( 
        'static/api/' + filenameNoExt + ".json", 
        JSON.stringify( data, null, '\t' ), 
        function( err ) {
            if (err) throw err;
            console.log( filenameNoExt + ' created successfully' );
        }
    );
}

function parseAZDeathBirthsToJSON( filePath ) {
    const filename    = path.basename( filePath );
    const filenameRaw = filename.substr(0, filename.lastIndexOf("."));
    console.log( 'Parsing ' + filenameRaw + ' ...' );
    const raw         = readXLSXtoObj( filePath );
    let rawData = [];
    let group = -1;
    const notes = Object.values( raw.pop() )[0];
    raw.shift() && raw.shift() && raw.pop(); // remove title rows and notes
    raw.forEach( function( v ) {
        let row = values( v );
        if ( row.length === 3 && row[0] === row[0].toUpperCase() ) {
            group++;
            rawData[group] = { REGION: row[0], [ row[1].toUpperCase() ]: row[2] }
        } else if ( row.length === 2 && parseInt( row[1] ) > 0 ) {
            rawData[group] = merge( rawData[group], { [ row[0].toUpperCase() ]: row[1] } );
        }
    })
    let data = keyBy( rawData, 'REGION' );
    console.log( 'Validating ' + filenameRaw + ' ...' );
    let validation = validateData( data );
    data.TYPE = filenameRaw.replace(/[0-9]/g, '' ).toUpperCase();
    data.YEAR = parseInt( filenameRaw.replace(/\D/g,'') );
    data.NOTES = notes;
    writeJSON( filenameRaw, merge( data, { VALIDATION: validation } ) );
}

function parseAZMarsDivsToJSON( filePath ) {
    const filename    = path.basename( filePath );
    const filenameRaw = filename.substr(0, filename.lastIndexOf("."));
    console.log( 'Parsing ' + filenameRaw + ' ...' );
    const workbook = XLSX.readFile(filePath);
    const raw = XLSX.utils.sheet_to_json( workbook.Sheets[ workbook.SheetNames[0] ] );
    const notes = Object.values(raw[raw.length - 1])[0];
    const sheetKey = Object.keys(raw[1])[0];
    const keyNormalization = {
        REGION: 'REGION',
        JAN: 'JANUARY',
        FEB: 'FEBRUARY',
        MAR: 'MARCH',
        APR: 'APRIL',
        MAY: 'MAY',
        JUN: 'JUNE',
        JUL: 'JULY',
        AUG: 'AUGUST',
        SEP: 'SEPTEMBER',
        OCT: 'OCTOBER',
        NOV: 'NOVEMBER',
        DEC: 'DECEMBER',
        TOTAL: 'TOTAL',
    };
    let keys = mapValues( raw[0], ( value ) => ( value.toUpperCase() ) );
    keys[sheetKey] = 'REGION';
    keys = mapValues( keys, ( value ) => { return keyNormalization[value] } );
    raw.shift() && raw.pop(); // remove keys & notes
    let rawData = [];
    raw.forEach( function( row ) {
        let newRow = mapKeys( row, ( v, k ) => { return keys[ k ] } );
        if ( 'TOTAL' === newRow.REGION ) {
            newRow.REGION = 'ARIZONA';
        }
        newRow.REGION = newRow.REGION.toUpperCase();
        rawData.push( newRow );
    } );
    let data = keyBy( rawData, 'REGION' );
    let validation = validateData( data );
    data.TYPE = filenameRaw.replace(/[0-9]/g, '' ).toUpperCase();
    data.YEAR = parseInt( filenameRaw.replace(/\D/g,'') );
    data.NOTES = notes;
    writeJSON( filenameRaw, merge( data, { VALIDATION: validation } ) );
}

function validateData( data ) {
    let validation = {};
    let stats = Object.keys( data.ARIZONA ).splice(1);
    stats.forEach( function( v ) {
        let statValues = mapValues( data, function( obj ) {
            if ( obj.REGION !== 'ARIZONA' ) {
                return obj[ v ];
            }

            return 0;
        });
        let reportedSum = data.ARIZONA[ v ];
        let calculatedSum = sum( values( statValues ) );
        let matches = {};
        if ( reportedSum === calculatedSum ) {
            matches.MATCHES = true;
        } else {
            matches.MATCHES = false;
            matches.REPORTED = reportedSum;
            matches.CALCULATED = calculatedSum;
        }
        validation[ v ] = matches;
    });

    return validation;
}

export {
    types,
    date,
    year,
    rootUrl,
    writeJSON,
    parseAZMarsDivsToJSON, 
    parseAZDeathBirthsToJSON 
};
