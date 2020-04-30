import download from 'download-file';

import {
    types,
    year,
    rootUrl
} from './utils.mjs';

types.forEach( async ( type ) => {
    const filename = type + year + '.xlsx';
    const url = rootUrl + type + '/' + filename;

    console.log( 'Downloading ' + filename + ' ...' );
     
    download(
        url, 
        {
            directory: './sheets/',
            filename
        }, 
        function(err){
            if (err) throw err;
            console.log( filename + ' downloaded.')
        }
    ); 
});

