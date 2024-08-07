import { describe, expect, test } from "bun:test";
import { Block, Blockchain } from "../src/blockchain.js";

describe("Block", () => {
  test("should correctly calculate hash", () => {
    const block = new Block(1, Date.now(), { amount: 4 }, "0");
    const hash = block.calculateHash();
    expect(hash).toBe(block.hash);
  });

  test("should mine a block and find a hash that matches difficulty", () => {
    const block = new Block(1, Date.now(), { amount: 4 }, "0");
    block.mineBlock(2);
    expect(block.hash.substring(0, 2)).toBe("00");
  });
});

describe("Blockchain", () => {
  test("should create genesis block", () => {
    const blockchain = new Blockchain();
    const genesisBlock = blockchain.chain[0];
    expect(genesisBlock.index).toBe(0);
    expect(genesisBlock.previousHash).toBe("0");
    expect(genesisBlock.data).toBe("Genesis block");
  });

  test("should add a new block to the chain", () => {
    const blockchain = new Blockchain();
    const newBlock = new Block(1, Date.now(), { amount: 4 });
    blockchain.addBlock(newBlock);
    expect(blockchain.chain.length).toBe(2);
    expect(blockchain.chain[1].data).toEqual({ amount: 4 });
  });

  test("should validate the chain", () => {
    const blockchain = new Blockchain();
    blockchain.addBlock(new Block(1, Date.now(), { amount: 4 }));
    blockchain.addBlock(new Block(2, Date.now(), { amount: 8 }));
    expect(blockchain.isChainValid()).toBe(true);
  });

  test("should invalidate the chain if a block's data is tampered with", () => {
    const blockchain = new Blockchain();
    blockchain.addBlock(new Block(1, Date.now(), { amount: 4 }));
    blockchain.chain[1].data = { amount: 100 }; // Tampering with data
    expect(blockchain.isChainValid()).toBe(false);
  });

  test("should invalidate the chain if a block's hash is tampered with", () => {
    const blockchain = new Blockchain();
    blockchain.addBlock(new Block(1, Date.now(), { amount: 4 }));
    blockchain.chain[1].hash = "somefakehash"; // Tampering with hash
    expect(blockchain.isChainValid()).toBe(false);
  });
});
