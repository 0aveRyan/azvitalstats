import glob from 'glob';
import path from 'path';
import { parseAZMarsDivsToJSON, parseAZDeathBirthsToJSON } from './utils.mjs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

function extractAll() {
    glob(__dirname + '/sheets/*.xlsx', {}, function( err, files ) {
        files.forEach( async function( file ) {
            if (err) throw err;
            if ( file.includes( 'births20' ) || file.includes( 'deaths20' ) ) {
                await parseAZDeathBirthsToJSON( file );
            } else {
                await parseAZMarsDivsToJSON( file );
            }
        })
    });
}

extractAll();
