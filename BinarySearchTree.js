import Node from "./Node.js";

export default class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new Node(value);
    if (!this.root) {
      this.root = node;
      return this;
    }
    let tree = this.root;
    while (true) {
      if (value < tree.data) {
        if (!tree.left) {
          tree.left = node;
          return this;
        }
        tree = tree.left;
      } else {
        if (!tree.right) {
          tree.right = node;
          return this;
        }
        tree = tree.right;
      }
    }
  }

  find(value) {
    let tree = this.root;
    while (tree) {
      if (value === tree.data) {
        return tree;
      }
      tree = value < tree.data ? tree.left : tree.right;
    }
    return null;
  }

  deleteItem(value) {
    this.root = this._deleteNode(this.root, value);
  }

  _deleteNode(node, value) {
    if (!node) return null;
    if (value < node.data) {
      node.left = this._deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this._deleteNode(node.right, value);
    } else {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let minNode = this._findMin(node.right);
      node.data = minNode.data;
      node.right = this._deleteNode(node.right, minNode.data);
    }
    return node;
  }

  _findMin(node) {
    while (node.left) node = node.left;
    return node;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  levelOrder(callback) {
    if (!callback) throw new Error("Callback required");
    let queue = [this.root];
    while (queue.length) {
      let node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrder(callback) {
    if (!callback) throw new Error("Callback required");
    this._inOrderTraversal(this.root, callback);
  }

  _inOrderTraversal(node, callback) {
    if (node === null) return;
    this._inOrderTraversal(node.left, callback);
    callback(node);
    this._inOrderTraversal(node.right, callback);
  }

  preOrder(callback) {
    if (!callback) throw new Error("Callback required");
    this._preOrderTraversal(this.root, callback);
  }

  _preOrderTraversal(node, callback) {
    if (node === null) return;
    callback(node);
    this._preOrderTraversal(node.left, callback);
    this._preOrderTraversal(node.right, callback);
  }

  postOrder(callback) {
    if (!callback) throw new Error("Callback required");
    this._postOrderTraversal(this.root, callback);
  }

  _postOrderTraversal(node, callback) {
    if (node === null) return;
    this._postOrderTraversal(node.left, callback);
    this._postOrderTraversal(node.right, callback);
    callback(node);
  }

  height(node) {
    if (node === null) return -1;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  depth(node) {
    let depth = 0;
    let current = this.root;
    while (current && current !== node) {
      if (node.data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      depth++;
    }
    return current ? depth : -1;
  }

  isBalanced() {
    return this._isBalanced(this.root);
  }

  _isBalanced(node) {
    if (node === null) return true;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    if (Math.abs(leftHeight - rightHeight) > 1) return false;
    return this._isBalanced(node.left) && this._isBalanced(node.right);
  }

  rebalance() {
    let nodes = [];
    this.inOrder(node => nodes.push(node.data));
    this.root = this._buildTreeFromArray(nodes);
  }

  _buildTreeFromArray(arr) {
    if (arr.length === 0) return null;
    let mid = Math.floor(arr.length / 2);
    let node = new Node(arr[mid]);
    node.left = this._buildTreeFromArray(arr.slice(0, mid));
    node.right = this._buildTreeFromArray(arr.slice(mid + 1));
    return node;
  }
}
