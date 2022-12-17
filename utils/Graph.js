class Graph {
  constructor() {
    this.vertices = [];
    this.adjacent = new Map();
    this.edges = 0;
  }

  addVertex(v) {
    this.vertices.push(v);
    this.adjacent.set(v, new Map());
  }

  addEdge(v, w, weight = 1) {
    const vMap = this.adjacent.get(v);
    vMap.set(w, weight);
    this.edges++;
  }

  // printGraph() {
  //   // get all the vertices
  //   const get_keys = Object.keys(this.adjacent);

  //   // iterate over the vertices
  //   for (const i of get_keys) {
  //     // get the corresponding adjacency list
  //     // for the vertex
  //     const get_values = this.adjacent[i];
  //     let conc = "";

  //     // iterate over the adjacency list
  //     // concatenate the values into a string
  //     for (const j of get_values) conc += j + " ";

  //     // print the vertex and its adjacency list
  //     console.log(i + " -> " + conc);
  //   }
  // }
}

module.exports = Graph;
