const input =  require('./input');

const totalCaloriesElfCarrying = (cals) => {
  let currentMax = 0;
  let max = Number.NEGATIVE_INFINITY;
  cals.forEach(cal => {
    if(cal === "") {
      if(currentMax > max){
        max = currentMax
      }
      currentMax = 0
    }else{
      currentMax += Number(cal);
    }

  })

  return max;
}

const totalCaloriesElfCarryingInSequence = (cals, n) => {
  const result = []
  let total = 0;

   cals.forEach(cal => {
    if(cal === "") {
      result.push(total);
      total = 0;
    }else{
      total += Number(cal);
    }

  })

  result.sort((a, b) => b-a);
  let ans = 0;
  for(let i=0; i<n; i++){
    ans += result[i];
  }
  return ans;
}



console.log(totalCaloriesElfCarrying(input))
console.log(totalCaloriesElfCarryingInSequence(input,3));