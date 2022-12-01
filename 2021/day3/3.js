const input =  require('./input');


const result = {
    
}

input.forEach(item => {
    item.split('').forEach( (char,index) => {
        if(!result?.[index]?.[char]){
            if(!result?.[index]) result[index] = {};
            result[index][char] = 1; 
        }else {
            result[index][char]++;
        }
    })
})

let gammaRate = ''
let epsilonRate = ''
Object.values(result).forEach(item => {
    if(item['0']> item['1']){
        gammaRate += '0';
        epsilonRate += '1';
    }else {
        gammaRate += '1';
        epsilonRate += '0';
    }
})


//part 1
console.log(parseInt(gammaRate, 2) *  parseInt(epsilonRate, 2));


//part 2

const getMaxNumber = (arr, i) => {
    if(arr.length === 1){
        return arr[0];
    }
    const arr1 = []
    const arr2 = [];
    let oneCount = 0;
    let zeroCount = 0;
    arr.forEach( item => {
        if(item[i] === '1'){
            oneCount++;
            arr1.push(item);
        }else {
            zeroCount++;
            arr2.push(item);
        }
    })

    if(oneCount > zeroCount ){
        return getMaxNumber(arr1, i+1);
    }else if(oneCount === zeroCount){
        return getMaxNumber(arr1, i+1);
    }else {
        return getMaxNumber(arr2, i+1);
    }

}

const getMinNumber = (arr, i) => {
    if(arr.length === 1){
        return arr[0];
    }
    const arr1 = []
    const arr2 = [];
    let oneCount = 0;
    let zeroCount = 0;
    arr.forEach( item => {
        if(item[i] === '1'){
            oneCount++;
            arr1.push(item);
        }else {
            zeroCount++;
            arr2.push(item);
        }
    })

    if(oneCount < zeroCount ){
        return getMinNumber(arr1, i+1);
    }else if(oneCount === zeroCount){
        return getMinNumber(arr2, i+1);
    }else {
        return getMinNumber(arr2, i+1);
    }

}
const O2Rating = parseInt(getMaxNumber(input, 0), 2);
const Co2ScrubberRating = parseInt(getMinNumber(input, 0),2);
const lifeSupportRating = O2Rating * Co2ScrubberRating;
console.log(lifeSupportRating);
