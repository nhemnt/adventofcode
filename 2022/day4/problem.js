const input = require("./input");

const inRange = (x1, y1, x2, y2) => {
  return (x1 >= x2 && y1 <= y2) || (x2 >= x1 && y2 <= y1);
};
const pairsFullyContainerOtherContainers = (inp) => {
  let count = 0;
  inp.forEach((el) => {
    let [s1, s2] = el.split(",");
    const [s1r1, s1r2] = s1.split("-");
    const [s2r1, s2r2] = s2.split("-");
    if (inRange(Number(s1r1), Number(s1r2), Number(s2r1), Number(s2r2))) {
      count++;
    }
  });

  return count;
};

const isOverlap = (x1, y1, x2, y2) => {
  return (x1 >= x2 && x1 <= y2) || (x2 >= x1 && x2 <= y1);
};

const pairOverlapOtherContainers = (inp) => {
  let count = 0;
  inp.forEach((el) => {
    let [s1, s2] = el.split(",");
    const [s1r1, s1r2] = s1.split("-");
    const [s2r1, s2r2] = s2.split("-");
    if (isOverlap(Number(s1r1), Number(s1r2), Number(s2r1), Number(s2r2))) {
      count++;
    }
  });

  return count;
};
console.log(pairsFullyContainerOtherContainers(input));
console.log(pairOverlapOtherContainers(input));
