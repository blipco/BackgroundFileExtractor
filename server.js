const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
const fileType = require('file-type');
const fileIds = require('./fileIds/fileIds');

for(let i=0;i<=fileIds.length;i++) {
axios({
        url:`https://api.goformz.com:443/v2/files/${fileIds[i]}`,
        method: 'get',
        headers: {'Authorization':`Basic ${process.env.BASIC}==`},
    })
    .then((response) => {
        axios({
            url: `${response.data.link}`,
            method: 'get',
            responseType: 'arraybuffer'
        })
        .then((response1) => {
            console.log('filetype',fileType(response1.data).ext)
            fs.writeFile(`./fileStorage/${fileIds[i]}.${fileType(response1.data).ext}`,response1.data, (error) => {
                if (error) console.log('fs.writeFile Error', error);
                    console.log('fs.WriteFile Saved!');
            });
        })
        .catch((error) => {
            console.log('Second Axios Call',error);
        });
    })
    .catch((error) => {
        console.log('First Axios Call',error);
    });
};