const generateGUID = require("./GenerateGUID");

class Node {
  constructor(data) {
    this.data = data;
    this.children = [];
    this.id = generateGUID()
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  add(data, toNodeData) {
    const node = new Node(data);
    const parent = toNodeData ? this.findBFS(toNodeData) : null;
    if(parent) {
      parent.children.push(node);
    } else {
      if(!this.root) {
        this.root = node;
      } else {
        throw Error('Root node is already assigned'); 
      }
    }
    return node;
  }

  remove(data) {
    if(this.root.data === data) {
      this.root = null;
    }

    var queue = [this.root];
    while(queue.length) {
      var node = queue.shift();
      for(var i = 0; i < node.children.length; i++) {
        if(node.children[i].data === data) {
          node.children.splice(i, 1);
        } else {
          queue.push(node.children[i]);
        }
      }
    }
  }

  findBFS(data) {
    const queue = [this.root];
    while(queue.length) {
      const node = queue.shift();
      if(node.id === data.id) {
        return node;
      }
      for(let i = 0; i < node.children.length; i++) {
        queue.push(node.children[i]);
      }
    }
    return null;
  }

  findParent(data, src = this.root) {
    if (src.children.some(node => node.id === data.id)) {
      return src;
    } else {
      for (const child of src.children) {
        const parent = this.findParent(data, child);
        if (parent) {
          return parent;
        }
      }
      return null;
    }
  }

  findById(id){
    const queue = [this.root];
    while(queue.length) {
      const node = queue.shift();
      if(node.data.id === id) {
        return node;
      }
      for(let i = 0; i < node.children.length; i++) {
        queue.push(node.children[i]);
      }
    }
    return null;
  }

  printTree(node = this.root){
    console.log(node.data)
    node.children.forEach(element => {
        this.printTree(element);
    });
  }
}

module.exports =  Tree
