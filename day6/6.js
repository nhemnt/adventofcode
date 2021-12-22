const input = require('./input');

const getTotalFish = (days) => {

    let a = [ ...input ]
    for(let i = 0; i< days; i++){
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

    return a.length;
}



// part 1

console.log(getTotalFish(80));


// part 2 using objects because of space complexity
const totalAvailableFishCount = 9
let fishCount = [...new Array(totalAvailableFishCount)].reduce((acc, _, i) => {
    return {...acc, [i]: 0}
}, {})

for(let i =0; i<input.length; i++){
    fishCount[input[i]] = fishCount[input[i]] + 1;
}

const updateFishCount = (count) => {
    const copyCount = {...count};
    [...new Array(totalAvailableFishCount)]
    .forEach((_,index) => {
        if(index !== 6 && index !== 8){
            copyCount[index] = Number(count[index+1]);
        }else if(index === 6){
            copyCount[index] = Number(count[index+1]) + Number(count[0]);
        }else { 
            //index === 8
            copyCount[index] = Number(count[0]);
        }
    })

    return copyCount
}

for(let i = 0; i< 256; i++){
    fishCount = updateFishCount(fishCount);
}
console.log(Object.values(fishCount).reduce((acc, prev) => acc + Number(prev), 0));