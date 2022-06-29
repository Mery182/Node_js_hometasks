process.argv;
let x = process.argv.slice(2);
let numberX = x.map(element => Number(element));
let sum = numberX.reduce((sum, el) => sum + el);
console.log(sum);