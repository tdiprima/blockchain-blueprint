const { Block, Blockchain } = require('./foo.js');

// Create a new blockchain
const myBlockchain = new Blockchain();

// Add a new block
const newBlock = new Block(1, Date.now(), { amount: 4 });
myBlockchain.addBlock(newBlock);

console.log('Blockchain valid?', myBlockchain.isChainValid());
console.log(JSON.stringify(myBlockchain, null, 2));
