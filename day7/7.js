const input = require('./input');

const sortedList = input.sort();

//part 1
const first = sortedList[0];
const last = sortedList[input.length - 1];
const count = {}
for(let i = first; i<= last; i++){
    count[i] = input.reduce((acc, current) => acc + Math.abs(current - i), 0)
}

console.log(Math.min(...Object.values(count)))
