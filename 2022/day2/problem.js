const input = require('./input');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const MAPPING = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
};

const POINTS = {
  WIN: 6,
  DRAW: 3,
  LOST: 0,
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3,
  X: 0,
  Y: 3,
  Z: 6
};

const getTotalScores = (inp) => {
  let totalScore = 0;
  inp.forEach((el) => {
    const [o, m] = el.split(' ');
    totalScore += POINTS[MAPPING[m]];
    if (MAPPING[o] === ROCK) {
      if (MAPPING[m] === ROCK) {
        totalScore += POINTS.DRAW;
      } else if (MAPPING[m] === PAPER) {
        totalScore += POINTS.WIN;
      }
    } else if (MAPPING[o] === PAPER) {
      if (MAPPING[m] === PAPER) {
        totalScore +=  POINTS.DRAW;
      } else if(MAPPING[m] === SCISSORS){
        totalScore +=  POINTS.WIN;
      }
    } else {
      if (MAPPING[m] === ROCK) {
        totalScore += POINTS.WIN;
      } else if(MAPPING[m] === SCISSORS){
        totalScore += POINTS.DRAW;
      }
    }
  });

  return totalScore;
};

const getHand = (hand, type) => {
  if(type === "WIN"){
    if(hand === ROCK) return PAPER;
    if(hand === PAPER) return SCISSORS;
    return ROCK;
  }else{
    if(hand === ROCK) return SCISSORS;
    if(hand === PAPER) return ROCK;
    return PAPER;
  }
 
}
const getTotalScoresAsPerNewRules = (inp) => {
  let totalScore = 0;
  inp.forEach((el) => {
    const [o, m] = el.split(' ');
    totalScore += POINTS[m];
    if(m === "X"){ //loss
      const hand = getHand(MAPPING[o], "LOSS");
       totalScore += POINTS[hand];
    }else if(m === "Y"){ //draw
      totalScore += POINTS[MAPPING[o]];
    }else{ //win
      const hand = getHand(MAPPING[o], "WIN");
        totalScore += POINTS[hand];
    }
  });

  return totalScore;
}

console.log(getTotalScores(input));
console.log(getTotalScoresAsPerNewRules(input));