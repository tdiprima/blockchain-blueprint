const crypto = require("crypto");

// Represents a single block in the blockchain
class Block {
  /**
   * Constructs a new Block.
   * @param {number} index - The index of the block in the blockchain.
   * @param {number} timestamp - The creation timestamp of the block.
   * @param {any} data - The data stored in the block.
   * @param {string} previousHash - The hash of the previous block in the chain.
   */
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  /**
   * Calculates the SHA-256 hash of the block's contents.
   * @returns {string} - The calculated hash.
   */
  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.previousHash +
          this.timestamp +
          JSON.stringify(this.data) +
          this.nonce
      )
      .digest("hex");
  }

  /**
   * Mines the block by finding a hash that meets the difficulty requirement.
   * @param {number} difficulty - The number of leading zeros required in the hash.
   */
  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
  }
}

// Represents the blockchain, which is a chain of blocks
class Blockchain {
  /**
   * Constructs a new Blockchain.
   */
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  /**
   * Creates the first block in the blockchain.
   * @returns {Block} - The genesis block.
   */
  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis block", "0");
  }

  /**
   * Retrieves the latest block in the blockchain.
   * @returns {Block} - The latest block.
   */
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Adds a new block to the blockchain after mining it.
   * @param {Block} newBlock - The new block to be added.
   */
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  /**
   * Validates the integrity of the blockchain.
   * @returns {boolean} - True if the blockchain is valid, false otherwise.
   */
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports = { Block, Blockchain };
