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
const getPoints = (point) => {
    const [pointA, pointB] = point;
    const x1 = Number(pointA[0]);
    const y1 = Number(pointA[1]);
    const x2 = Number(pointB[0]);
    const y2 = Number(pointB[1]);
    return {
        x1, y1, x2, y2
    }
}

const updatePoint = (x1, y1, x2, y2) => {

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

const markDiagonal = ( x1, y1, x2, y2) => {

    if(x2 > x1){
        if(y2 > y1){
            let counter = 0;
            for(let i = x1; i<=x2; i++){
                const key = `${i}-${y1 + counter}`;
                counter++;
                checkAndUpdateCrossPoint(key);
            }

        }else {
            let counter = 0;
            for(let i = x1; i<=x2; i++){
                const key = `${i}-${y1 - counter}`;
                counter++;
                checkAndUpdateCrossPoint(key);
            }
        }
    }else {
        console.log('shouln not come here');
    }

}

for(let i = 0; i<input.length; i++){
    const current = input[i];
    let { x1, y1, x2, y2 } = getPoints(current);
    if(current[0][0] === current[1][0] || current[0][1] === current[1][1]){
        updatePoint(x1, y1, x2, y2);
    //part 2
    }else if(Math.abs(x1 - x2) === Math.abs(y1 - y2)){
       
        if(x1 > x2){
            const temp1 = x1;
            x1 = x2;
            x2 = temp1;

            const temp2 = y1;
            y1 = y2;
            y2 = temp2;
        }
        markDiagonal( x1, y1, x2, y2);
    }
}

console.log(ans.length);