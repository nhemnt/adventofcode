const input = require("./input");
const Graph = require("../../utils/Graph");
const MY_LOCATION = "S";
const GOAL = "E";
const normailiseInput = input.map((el) => el.split(""));
let startPoint, endPoint;
const ASCII_MAPPING = {
  S: 97,
  E: 122,
};
const getAsciiVal = (val) => {
  if (val === "E") return ASCII_MAPPING["E"];
  else if (val === "S") return ASCII_MAPPING["S"];
  return val.charCodeAt();
};
const vertices = [];

for (let i = 0; i < normailiseInput.length; i++) {
  // let startFound = false, endFound = false;
  for (let j = 0; j < normailiseInput[i].length; j++) {
    vertices.push(`${i}_${j}`);
    if (normailiseInput[i][j] === MY_LOCATION) {
      startPoint = [i, j];
      // startFound = true;
    }
    if (normailiseInput[i][j] === GOAL) {
      endPoint = [i, j];
      // endFound = true;
    }
  }
  // if(startFound && endFound) break;
}

const getGraph = () => {
  const g = new Graph(vertices.length);
  vertices.forEach((vertice) => {
    g.addVertex(vertice);
  });
  const inp = normailiseInput;
  for (let i = 0; i < inp.length; i++) {
    for (let j = 0; j < inp[i].length; j++) {
      const directions = [
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
        [i, j + 1],
      ];
      for (let k = 0; k < directions.length; k++) {
        const [x, y] = directions[k];
        if (x < 0 || y < 0 || x >= inp.length || y >= inp[0].length) continue;
        const currentVal = inp[i][j];
        const compareVal = inp[x][y];
        if (getAsciiVal(compareVal) - getAsciiVal(currentVal) <= 1) {
          g.addEdge(`${i}_${j}`, `${x}_${y}`);
        }
      }
    }
  }
  return g;
};

const getSmallestPath = (graph, start, end) => {
  const verticesMap = {};
  const chossenMap = {};

  const startadjacent = graph.adjacent.get(start);
  for (const vertice of graph.vertices) {
    if (startadjacent.has(vertice)) {
      verticesMap[vertice] = 1;
    } else {
      verticesMap[vertice] = Infinity;
    }
    chossenMap[vertice] = false;
  }

  const taken = {};
  const getSmallestFromVerticesMap = () => {
    let min = Infinity;
    let k;
    Object.entries(verticesMap).forEach(([key, value]) => {
      if (value <= min && !taken[key]) {
        min = value;
        k = key;
      }
    });
    taken[k] = true;
    return k;
  };

  while (true) {
    const smallest = getSmallestFromVerticesMap();

    if (end === smallest) {
      return verticesMap[smallest];
    }

    const smallestAdjacent = graph.adjacent.get(smallest);
    const adjacentKeys = [...smallestAdjacent.keys()];
    for (const sa of adjacentKeys) {
      if (verticesMap[sa] === Infinity) {
        verticesMap[sa] = verticesMap[smallest] + 1;
      } else {
        if (smallest + 1 <= verticesMap[sa]) {
          verticesMap[sa] = smallest + 1;
        }
      }
    }
  }
};
const part1 = (graph) => {
  return getSmallestPath(
    graph,
    `${startPoint[0]}_${startPoint[1]}`,
    `${endPoint[0]}_${endPoint[1]}`
  );
};
console.log(part1(getGraph()));
