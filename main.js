const xlsx = require('node-xlsx');
const fs = require('fs');
const { getInfo } = require('./func.js');
const start = "2020-05-31 00:00:01";
const end = "2020-05-31 23:59:59";

let sheet = xlsx.parse('./data.xlsx')[0];
console.log(sheet['name']);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

async function load() {
    let res = [];
    let names = [];
    for (var rowId in sheet['data']) {
        await sleep(2300);
        var row = sheet['data'][rowId];
        if (row.length > 0 && rowId > 0 && !names.includes(row[1])) {
            let name = row[1];
            names.push(name);
            console.log(name);
            let num = await getInfo(row[7], start, end);
            res.push([name, num]);
        };
    };
    res.sort(function(a, b) { return b[1] - a[1] });
    // console.log(res);
    let txt = '';
    res.forEach(function(ele) {
        txt += ele[0] + ' : ' + ele[1] + '\n';
    });
    fs.writeFile('result.txt', txt, { flag: 'w', encoding: 'utf-8' }, function(err) {
        if (err) {
            console.log('写入失败');
        } else {
            console.log('写入成功');
        }
    });
};

load();