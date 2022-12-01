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


//part 2
const count2 = {}
const sumCache = {}


const calcSum = (j) => {
    let sum = 0
    for(let i = j; i > 0; i--){
        if(sumCache[i]){
            sum += sumCache[i];
            break;
        }
        sum += i;
    }
    if(!sumCache[j]) sumCache[j] = sum
    return sum;
}
const getSum = (i) => {
    return sumCache[i] ? sumCache[i] : calcSum(i);
}
for(let i = first; i<= last; i++){
    count2[i] = input.reduce((acc, current) => acc + getSum(Math.abs(current - i)), 0)
}

console.log(Math.min(...Object.values(count2)))
