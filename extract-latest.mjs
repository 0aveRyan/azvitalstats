import { 
    types,
    year,
    parseAZMarsDivsToJSON, 
    parseAZDeathBirthsToJSON
} from './utils.mjs';

types.forEach( ( type ) => {
    const file = './sheets/' + type + year + '.xlsx';
    if ( file.includes( 'births20' ) || file.includes( 'deaths20' ) ) {
        parseAZDeathBirthsToJSON( file );
    } else {
        parseAZMarsDivsToJSON( file );
    }
});