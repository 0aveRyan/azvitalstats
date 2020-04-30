import glob from 'glob';
import path from 'path';
import fs from 'fs';

import forEach from 'lodash.foreach';
import merge from 'lodash.merge';

import { writeJSON } from './utils.mjs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

function combine() {
    let rawData = {};
    glob(__dirname + '/static/api/*.json', {}, function( err, files ) {
        files.forEach( function( file ) {
            if (err) throw err;

            const contents = fs.readFileSync( file );
            const fileData = JSON.parse( contents );

            if ( 'undefined' !== fileData.NOTES 
                && 'undefined' !== fileData.YEAR 
                && 'undefined' !== fileData.TYPE
            ) {
                forEach( fileData, ( data, sectionKey ) => {
                    if ( 
                        'VALIDATION' !== sectionKey 
                        && 'NOTES' !== sectionKey 
                        && 'YEAR' !== sectionKey
                        && 'TYPE' !== sectionKey
                    ) {
                        forEach( data, ( value, itemKey ) => {
                            if ( 'REGION' !== itemKey ) {
                                let someObject = {
                                    [fileData.YEAR]: {
                                        [sectionKey]: {
                                            [itemKey]: {
                                                [fileData.TYPE]: value
                                            }
                                        }
                                    }
                                }
                                merge( rawData, someObject );
                            }
                        })
                    }
                });
            }
        })
        let all = merge( rawData, { TYPE: 'ALL' } );
        writeJSON( 'combined/all', all );
        forEach( rawData, ( data, year ) => {
            if ( 'TYPE' !== year ) {
                let yearData = merge( data, { TYPE: 'COMBINED', YEAR: year } );
                writeJSON( 'combined/' + year, yearData );
            }
        });
    });
}

combine();
