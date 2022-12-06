const input = require('./input');

const detectMarker = (inp, n) => {
  const map = new Map();
  for(let i=0; i<inp.length; i++){

    if(map.has(inp[i])){
      map.set(inp[i], map.get(inp[i]) +1)
    }else{
      map.set(inp[i], 1);
    }

     if(i > n-1){
      const val = map.get(inp[i-n]);
      if(val === 1){
        map.delete(inp[i-n]);
      }else{
        map.set(inp[i-n], val-1);
      }
    }
     if(map.size === n && [...map.values()].every(el => el ===1)){
      return i+1;
    }
  }
  
}

console.log(detectMarker(input, 4));
console.log(detectMarker(input, 14));