import BinarySearchTree from './BinarySearchTree.js';

const generateRandomNumbers = (size, max) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
};

const driverScript = () => {
  const randomNumbers = generateRandomNumbers(15, 100);
  const bst = new BinarySearchTree();
  randomNumbers.forEach(num => bst.insert(num));

  console.log("Binary Search Tree Created:");
  bst.prettyPrint();

  console.log("Is the tree balanced? ", bst.isBalanced());

  console.log("Level Order Traversal:");
  bst.levelOrder(node => console.log(node.data));
  
  console.log("Preorder Traversal:");
  bst.preOrder(node => console.log(node.data));

  console.log("Postorder Traversal:");
  bst.postOrder(node => console.log(node.data));

  console.log("Inorder Traversal:");
  bst.inOrder(node => console.log(node.data));

  [150, 200, 250, 300, 350].forEach(num => bst.insert(num));
  console.log("Tree After Adding Unbalancing Elements:");
  bst.prettyPrint();

  console.log("Is the tree balanced? ", bst.isBalanced());

  bst.rebalance();
  console.log("Tree After Rebalancing:");
  bst.prettyPrint();

  console.log("Is the tree balanced? ", bst.isBalanced());

  console.log("Level Order Traversal After Rebalancing:");
  bst.levelOrder(node => console.log(node.data));
  
  console.log("Preorder Traversal After Rebalancing:");
  bst.preOrder(node => console.log(node.data));

  console.log("Postorder Traversal After Rebalancing:");
  bst.postOrder(node => console.log(node.data));

  console.log("Inorder Traversal After Rebalancing:");
  bst.inOrder(node => console.log(node.data));
};

driverScript();
