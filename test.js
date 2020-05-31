const { getInfo } = require('./func.js');
const start = "2020-05-30 00:00:01";
const end = "2020-05-30 23:59:59";

let num = getInfo('https://leetcode.com/rachelguo/', start, end);
console.log(num);