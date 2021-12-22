const input = require('./input');

//part 1
const obj = {};
const ans = [];

const checkAndUpdateCrossPoint = (key) => {
    obj[key] = obj[key] ? obj[key] + 1 : 1;
    if(obj[key] === 2){
        ans.push(obj[key]);
    }
}

const markPointX = (i,j, x) => {
    for(let k =i; k<=j; k++){
        const key = `${x}-${k}`;
        checkAndUpdateCrossPoint(key);
           
    }
}


const markPointY = (i,j, y) => {
    for(let k =i; k<=j; k++){
        const key = `${k}-${y}`;
        checkAndUpdateCrossPoint(key);
    }
}
const updatePoint = (point) => {
    const [pointA, pointB] = point;
    const x1 = Number(pointA[0]);
    const y1 = Number(pointA[1]);
    const x2 = Number(pointB[0]);
    const y2 = Number(pointB[1]);

    if(x1 === x2){
        
        if(y1 > y2){
            markPointX(y2, y1, x1);
        }else{
            markPointX(y1, y2, x1);   
        }
    }else {
        if(x1 > x2){
            markPointY(x2, x1, y1);
        }else{
            markPointY(x1, x2, y1);
        }
    }

}

for(let i = 0; i<input.length; i++){
    const current = input[i];
    if(current[0][0] === current[1][0] || current[0][1] === current[1][1]){
        updatePoint(current);
    }
}

console.log(ans.length);