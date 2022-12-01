const {
    input,
    numbers
} = require('./input');

const normaliseValueIdMap = (bingo) => {
    const obj = {}
    let sum = 0;
    bingo.forEach((row, i) => {
        row.forEach((col, j) => {
            obj[bingo[i][j]] = [i, j]
            sum += Number(bingo[i][j])
        })
    })

    return {
        obj,
        sum
    };
}

const bingoHashMap = []

input.forEach((bingo, i) => {
    const {
        obj,
        sum
    } = normaliseValueIdMap(bingo);
    bingoHashMap.push({
        valueIdMap: obj,
        checked: {
            row: [],
            col: [],
        },
        sum
    });

})

//part 1
for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    for (let j = 0; j < bingoHashMap.length; j++) {
        const bingo = bingoHashMap[j];
        if (bingo.valueIdMap[number]) {
            if (bingo.checked.row[bingo.valueIdMap[number][0]]) {
                bingo.checked.row[bingo.valueIdMap[number][0]] = bingo.checked.row[bingo.valueIdMap[number][0]] + 1;
            } else {
                bingo.checked.row[bingo.valueIdMap[number][0]] = 1;
            }
            if (bingo.checked.col[bingo.valueIdMap[number][1]]) {
                bingo.checked.col[bingo.valueIdMap[number][1]] = bingo.checked.col[bingo.valueIdMap[number][1]] + 1;
            } else {
                bingo.checked.col[bingo.valueIdMap[number][1]] = 1;
            }
            bingo.sum -= Number(number);
        }

        //check win
        if (i > 3 && (bingo.checked.row.includes(5) || bingo.checked.col.includes(5))) {
            console.log(Number(number) * Number(bingo.sum));
            return;
        }
    }
}


let count = 0;
let exclude = {

}
// //part 2
for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    for (let j = 0; j < bingoHashMap.length; j++) {
        if (exclude[j]) {
            continue;
        }
        const bingo = bingoHashMap[j];
        if (bingo.valueIdMap[number]) {
            if (bingo.checked.row[bingo.valueIdMap[number][0]]) {
                bingo.checked.row[bingo.valueIdMap[number][0]] = bingo.checked.row[bingo.valueIdMap[number][0]] + 1;
            } else {
                bingo.checked.row[bingo.valueIdMap[number][0]] = 1;
            }
            if (bingo.checked.col[bingo.valueIdMap[number][1]]) {
                bingo.checked.col[bingo.valueIdMap[number][1]] = bingo.checked.col[bingo.valueIdMap[number][1]] + 1;
            } else {
                bingo.checked.col[bingo.valueIdMap[number][1]] = 1;
            }
            bingo.sum -= Number(number);
        }

        //check win
        if (i > 3 && (bingo.checked.row.includes(5) || bingo.checked.col.includes(5))) {
            count++

            if (count === input.length) {
                console.log(Number(number) * Number(bingo.sum));
                return;
            } else {
                exclude[j] = true;
            }

        }
    }
}
