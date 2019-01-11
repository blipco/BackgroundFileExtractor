const axios = require('axios');
const fs = require('fs');
require('dotenv').config()
const fileIds = require('./fileIds');

for(let i=0;i<=fileIds.length;i++) {

    axios({
        url:`https://api.goformz.com:443/v2/files/${fileIds[i]}`,
        method: 'get',
        headers: {'Authorization':`Bearer ${process.env.BEARER}`},

    })
    .then((response) => {
        axios({
            url: response.data.link,
            method: 'get',
            headers: {'Authorization':`Bearer ${process.env.BEARER}`}
        })
        .then((response) => {
            fs.writeFile(`./backgroundPdfs/${fileIds[i]}.pdf`, response, (error) => {
                if (error) console.log('fs.writeFile Error', error);
                    console.log('fs.WriteFile Saved!');
            });
        })
        .catch((error) => {
            console.log('Second Axios Call Error',error);
        })
        
    })
    .catch((error) => {
        console.log('First Axios Call Error',error);
    });

};