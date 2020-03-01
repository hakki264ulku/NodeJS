
// To calc duration
const START_TIMER = +new Date();

const request = require('request');
const chalk = require('chalk');

const url =
    'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&format=json&select=pl_name,pl_facility,pl_discmethod,st_teff,st_dist,rowupdate';

request({ url }, (err, response) => {
    // Always check if there is an error
    if (err) {
        console.error('An error occured');
    }
    try {
        const data = JSON.parse(response.body);

        for (let i = 0; i < 100; i++) {
            
            let { pl_name, pl_facility, pl_discmethod, st_teff, st_dist, rowupdate } = data[i];
            
            console.log(`Gezegenin literatürde en çok kullanılan adı: ${chalk.bold.red(pl_name)}
Gezegenin keşfinin yapıldığı tesis adı: ${chalk.green(pl_facility)}
Gezegen keşfinde kullanılan metod: ${chalk.green(pl_discmethod)}
Gezegenin efektif sıcaklığı: ${chalk.green(st_teff - 273)} °C
Gezegenin ışık yılı cinsinden mesafesi: ${chalk.green(st_dist * 3.26)}
Gezegen parametrelerinin güncellendiği en son tarih: ${chalk.green(rowupdate)}
|----|`);
        }

        // To calc duration
        console.log(`Total: ${(+new Date() - START_TIMER)/1000} sec`);
    } catch (e) {
        console.error('An error occured.');
    }
});

