const input = require('./input');
const numOfCycle = 80;

// part 1
let a = [ ...input ]
for(let i = 0; i< numOfCycle; i++){
    const newArr = []
    const updatedInput = a.map(row => {
        const isZero = row - 1 < 0;
        if(isZero){
            newArr.push(8);
        }
        return row - 1 < 0 ? 6 : row - 1;
    }) 
    a = [...updatedInput, ...newArr];
}

console.log(a.length)