// This file is intended to test or demonstrate the functionality of the simpleBlockchain.js file by creating a blockchain, adding a block, and checking its validity.
const { Block, Blockchain } = require('./simpleBlockchain.js');

// Create a new blockchain
const myBlockchain = new Blockchain();

// Add a new block
const newBlock = new Block(1, Date.now(), { amount: 4 });
myBlockchain.addBlock(newBlock);

console.log('Blockchain valid?', myBlockchain.isChainValid());
console.log(JSON.stringify(myBlockchain, null, 2));
