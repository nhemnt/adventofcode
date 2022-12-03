const input = require('./input');

const ASCII_MAPPING = {
  Z: 90,
};

const getPoints = (char) => {
  if (char.charCodeAt() <= ASCII_MAPPING.Z) {
    return char.charCodeAt() - 65 + 27;
  } else {
    return char.charCodeAt() - 96;
  }
};
const getSumOfPriorities = (inp) => {
  let sum = 0;
  inp.forEach((element) => {
    const half1 = element.substring(0, element.length / 2);
    const half2 = element.substring(element.length / 2);
    const half1Map = new Map();
    const half2Map = new Map();
    for (let i = 0; i < half1.length; i++) {
      if (!half1Map.has(half1[i])) {
        half1Map.set(half1[i], 1);
      }
    }
    for (let i = 0; i < half1.length; i++) {
      if (!half2Map.has(half2[i])) {
        half2Map.set(half2[i], 1);
      }
    }

    for (let [key] of half1Map) {
      if (half2Map.has(key)) {
        sum += getPoints(key);
        break;
      }
    }
  });

  return sum;
};

function arraysInCommon(arrays){
    let i, common,
    L= arrays.length, min= Infinity;
    while(L){
        if(arrays[--L].length<min){
            min= arrays[L].length;
            i= L;
        }
    }
    common= arrays.splice(i, 1)[0];
    return common.filter(function(itm, indx){
        if(common.indexOf(itm)=== indx){
            return arrays.every(function(arr){
                return arr.indexOf(itm)!= -1;
            });
        }
    });
}

const getSumOfPrioritiesByLines = (inp, n) => {
  let sum = 0;
  for (let i = 0; i < inp.length; i = i + n) {
    const map = new Map();
    const half1 = inp[i];
    const half2 = inp[i + 1];
    const half3 = inp[i + 2];
    const half1Map = new Map();
    const half2Map = new Map();
    const half3Map = new Map();

    for (let i = 0; i < half1.length; i++) {
      if (!half1Map.has(half1[i])) {
        half1Map.set(half1[i], 1);
      }
    }
    for (let i = 0; i < half2.length; i++) {
      if (!half2Map.has(half2[i])) {
        half2Map.set(half2[i], 1);
      }
    }

    for (let i = 0; i < half3.length; i++) {
      if (!half3Map.has(half3[i])) {
        half3Map.set(half3[i], 1);
      }
    }
    
  sum += getPoints(arraysInCommon([[...half1Map.keys()], [...half2Map.keys()], [...half3Map.keys()]])[0])
  }

  return sum
};
console.log(getSumOfPriorities(input));
console.log(getSumOfPrioritiesByLines(input, 3));
