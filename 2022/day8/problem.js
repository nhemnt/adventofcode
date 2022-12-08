const input = require('./input');

const visibleTreesFromOutsideGrid = (inp) => {
  const x = inp.length;
  const y = inp[0].length;
  const cornerSize = 2 * x + 2 * y - 4;
  let visbleTrees = cornerSize;
  const left = [...new Array(inp.length)].map((el) => [
    ...new Array(inp[0].length),
  ]);
  const right = [...new Array(inp.length)].map((el) => [
    ...new Array(inp[0].length),
  ]);
  const top = [...new Array(inp.length)].map((el) => [
    ...new Array(inp[0].length),
  ]);
  const bottom = [...new Array(inp.length)].map((el) => [
    ...new Array(inp[0].length),
  ]);

  for (let i = 0; i < inp.length; i++) {
    let max = 0;
    for (let j = 0; j < inp[i].length; j++) {
      if (inp[i][j] > max) {
        max = inp[i][j];
      }
      left[i][j] = max;
    }
    max = 0;
  }

  for (let i = inp.length - 1; i >= 0; i--) {
    let max = 0;
    for (let j = inp[i].length - 1; j >= 0; j--) {
      if (inp[i][j] > max) {
        max = inp[i][j];
      }
      right[i][j] = max;
    }
    max = 0;
  }

  for (let i = 0; i < inp.length; i++) {
    let max = 0;
    for (let j = 0; j < inp[i].length; j++) {
      if (inp[j][i] > max) {
        max = inp[j][i];
      }
      top[j][i] = max;
    }
    max = 0;
  }

  for (let i = inp.length - 1; i >= 0; i--) {
    let max = 0;
    for (let j = inp[i].length - 1; j >= 0; j--) {
      if (inp[j][i] > max) {
        max = inp[j][i];
      }
      bottom[j][i] = max;
    }
    max = 0;
  }

  for (let i = 1; i < inp.length - 1; i++) {
    for (let j = 1; j < inp[i].length - 1; j++) {
      const curr = inp[i][j];
      const leftMax = left[i][j - 1];
      const rightMax = right[i][j + 1];
      const topMax = top[i - 1][j];
      const bottomMax = bottom[i + 1][j];
      if (
        curr > leftMax ||
        curr > rightMax ||
        curr > topMax ||
        curr > bottomMax
      ) {
        visbleTrees++;
      }
    }
  }
  return visbleTrees;
};

const normalisedInput = (arr) =>
  arr.map((el) => el.split('').map((x) => Number(x)));

const highestScenicScore = (inp) => {
  let max = 0;
  const visibility = (dir, x, y, val) => {
    if (dir === 'top') {
      let count = 0;
      for (let i = x - 1; i >= 0; i--) {
        count++;
        if (inp[i][y] >= val) {
          return count;
        }
      }
      return count;
    } else if (dir === 'right') {
      let count = 0;
      for (let i = y + 1; i < inp[0].length; i++) {
        count++;
        if (inp[x][i] >= val) {
          return count;
        }
      }
      return count;
    } else if (dir === 'bottom') {
      let count = 0;
      for (let i = x + 1; i < inp.length; i++) {
        count++;
        if (inp[i][y] >= val) {
          return count;
        }
      }
      return count;
    } else {
      let count = 0;
      for (let i = y - 1; i >= 0; i--) {
        count++;
        if (inp[x][i] >= val) {
          return count;
        }
      }
      return count;
    }
  };
  for (let i = 0; i < inp.length; i++) {
    for (let j = 0; j < inp[i].length; j++) {
      const top = visibility('top', i, j, inp[i][j]);
      const right = visibility('right', i, j, inp[i][j]);
      const bottom = visibility('bottom', i, j, inp[i][j]);
      const left = visibility('left', i, j, inp[i][j]);
      const total = top * right * bottom * left;
      if (total > max) max = total;
    }
  }

  return max;
};

console.log(visibleTreesFromOutsideGrid(normalisedInput(input)));
console.log(highestScenicScore(normalisedInput(input)));
