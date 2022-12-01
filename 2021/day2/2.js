const input =  require('./input');

let depth = 0;
let horizontalPosition = 0;

input.forEach( item => {
    if(item[0] === "forward"){
        horizontalPosition += Number(item[1])
    }else {
        depth = item[0] === "down" ?  depth + Number(item[1]) : depth - Number(item[1]);
    }
})

//part 1
console.log(depth * horizontalPosition);


//part 2

let aim = 0;
depth = 0;
horizontalPosition = 0;


//down  aim + x;
//up   aim - x;
// forward - horizontalPosition + x;
        // - depth + (aim * x);


input.forEach( item => {
    if(item[0] === "forward"){
        horizontalPosition += Number(item[1])
        depth = depth + (aim * Number(item[1]));
    }else  {
        if(item[0] === "down"){
            aim += Number(item[1]);
        }else {
            aim -= Number(item[1]);
        }
    }
})

console.log(depth * horizontalPosition);
