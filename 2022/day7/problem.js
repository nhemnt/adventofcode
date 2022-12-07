const input = require('./input');
const Tree = require('../../utils/Tree');
class Container {
  constructor(name, size, type) {
    this.name = name;
    this.size = size;
    this.type = type;
  }
}
const MAX_SIZE = 100000;
const REQUIRED_SPACE = 30000000;
const UPDATE_SIZE = 70000000;

const TYPE = {
  DIR: 'dir',
  FILE: 'file',
};
const COMMAND = {
  CD: 'cd',
  LS: 'ls',
};
const PATH = {
  root: '/',
  back: '..',
};
const createTree = (inp) => {
  const tree = new Tree();
  tree.add(new Container('root', 0, TYPE.DIR));
  let currDir;
  const traverseNodes = (arr, index) => {
    let count = 1;
    if (index >= arr.length) {
      return;
    }

    if (arr[index].startsWith('$ ')) {
      const command = arr[index].replace('$ ', '');
      if (command === COMMAND.LS) {
        while (arr[index + count] && !arr[index + count]?.startsWith('$ ')) {
          const isDir = arr[index + count].startsWith(TYPE.DIR);
          const [typeVsSize, name] = arr[index + count].split(' ');
          tree.add(
            new Container(
              name,
              isDir ? 0 : Number(typeVsSize),
              isDir ? TYPE.DIR : TYPE.FILE
            ),
            currDir
          );
          count++;
        }
        return traverseNodes(arr, index + count);
      } else {
        // command = "cd"

        const [, path] = command.split(' ');
        if (path === PATH.root) {
          currDir = tree.root;
        } else if (path === PATH.back) {
          currDir = tree.findParent(currDir);
        } else {
          currDir = currDir.children.find((el) => el.data.name === path);
        }
        return traverseNodes(arr, index + 1);
      }
    } else {
      throw Error('Should not come here');
    }
  };
  traverseNodes(inp, 0);

  const updateSize = (node) => {
    if (node.data.type === TYPE.DIR) {
      node.children.forEach((childNode) => {
        if (childNode.data.type === TYPE.DIR) {
          updateSize(childNode);
          node.data.size += childNode.data.size;
        } else {
          node.data.size += childNode.data.size;
        }
      });
    }
  };
  updateSize(tree.root);
  return tree;
};
const sizeMappedTree = createTree(input);

const findAllValidDir = (tree) => {
  let sum = 0;

  const calculateSum = (node) => {
    if (node.data.type === TYPE.DIR) {
      if (node.data.size <= MAX_SIZE) sum += node.data.size;

      node.children.forEach((childNode) => {
        calculateSum(childNode);
      });
    }
  };

  calculateSum(tree.root);
  return sum;
};

const findSmallDir = (tree) => {
  const totalSpace = tree.root.data.size;
  const availableSpace = 30000000 - (70000000 - totalSpace);
  let space = Number.MAX_VALUE,
    dir;
  const nearestToAvailableSpace = (node) => {
    if (node.data.type === TYPE.DIR) {
      if (node.data.size >= availableSpace) {
        const diff = node.data.size - availableSpace;

        if (diff < space) {
          space = diff;
          dir = node.data;
        }
      }

      node.children.forEach((childNode) => {
        nearestToAvailableSpace(childNode);
      });
    }
  };

  nearestToAvailableSpace(tree.root);
  return dir.size;
};

console.log(findAllValidDir(sizeMappedTree));
console.log(findSmallDir(sizeMappedTree));
