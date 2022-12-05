const { input, stack } = require('./input');
const normaliseInput = (str) => {
  return str
    .replace('move ', '')
    .replace(' from ', ' ')
    .replace(' to ', ' ')
    .split(' ')
    .map((el) => Number(el));
};

function parseData(data) {
  const [rawState] = data.split(/\r?\n\r?\n/);
  const stateLines = rawState.split(/\r?\n/);
  const stackCount = (stateLines.pop().trim().length + 3) / 4;
  const stacks = [...Array(stackCount).keys()].map(() => []);

  stateLines.forEach((line) => {
    for (let i = 0; i < stackCount; i++) {
      const ch = line[i * 4 + 1];
      if (ch != ' ') stacks[i].unshift(ch);
    }
  });

  return stacks;
}

const crateEndsUpOnTopOfEachStack = (st, inp) => {
  const copy = JSON.parse(JSON.stringify(st));
  inp.forEach((el) => {
    const [n, x, y] = el; // move n from x to y
    copy[y - 1] = [
      ...copy[y - 1],
      ...copy[x - 1].splice(copy[x - 1].length - n).reverse(),
    ];
  });
  return copy.reduce((acc, cur) => {
    return acc + cur[cur.length - 1];
  }, '');
};

const crateEndsUpOnTopOfEachStackWithoutReverse = (st, inp) => {
  const copy = JSON.parse(JSON.stringify(st));
  inp.forEach((el) => {
    const [n, x, y] = el; // move n from x to y
    copy[y - 1] = [
      ...copy[y - 1],
      ...copy[x - 1].splice(copy[x - 1].length - n),
    ];
  });
  return copy.reduce((acc, cur) => {
    return acc + cur[cur.length - 1];
  }, '');
};
const parsedStack = parseData(stack);
const parsedInput = input.map(normaliseInput);
console.log(crateEndsUpOnTopOfEachStack(parsedStack, parsedInput));
console.log(
  crateEndsUpOnTopOfEachStackWithoutReverse(parsedStack, parsedInput)
);
