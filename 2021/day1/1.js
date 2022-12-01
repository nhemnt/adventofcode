const input =  require('./input');


const getIncreasedCount = (arr) => {

    let count = 0;
    
    for(let i =1; i<arr.length; i++){
        if(Number(arr[i]) > Number(arr[i-1])){
            count++;
        }
    }

    return count;
}



const summedArr = input.reduce((prev, current, index , arr) => {
    if(index >= 2) {
        prev.push(Number(current) + Number(arr[index-1]) + Number(arr[index-2]) );

    }
        return prev;
}, [])


//part1
console.log(getIncreasedCount(input))

//part2
console.log(getIncreasedCount(summedArr))
