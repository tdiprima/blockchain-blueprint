import { describe, expect, test } from "bun:test";
import { Block, Blockchain } from "../src/blockchain.js";

describe("Block", () => {
  const blockchain = new Blockchain();
  // blockchain.addBlock(new Block(0, Date.now(), "Genesis Block", "0")); // Already done in the constructor

  test("calculateHash", () => {
    const block = new Block(1, Date.now(), "Test block", blockchain.chain[0].hash);
    const hash = block.calculateHash();
    // Hash should be 64 characters
    // And it should be the same as the hash in the block object
    expect(hash).toBe(block.hash);
  });

  test("mineBlock", () => {
    const block = new Block(1, Date.now(), "Test block", blockchain.chain[0].hash);
    block.mineBlock(2);
    expect(block.hash.substring(0, 2)).toBe("00");
  });
});


describe("Blockchain", () => {
  test("addBlock", () => {
    const blockchain = new Blockchain();
    const block = new Block(1, Date.now(), "Test block", blockchain.chain[0].hash);
    blockchain.addBlock(block);
    expect(blockchain.chain[1]).toEqual(block);
  });

  test("isChainValid", () => {
    const blockchain = new Blockchain();
    const block = new Block(1, Date.now(), "Test block", blockchain.chain[0].hash);
    blockchain.addBlock(block);
    expect(blockchain.isChainValid()).toBe(true);
  });

  test("createGenesisBlock", () => {
    const blockchain = new Blockchain();
    // Won't be equal because of the timestamp and hash
    expect(blockchain.createGenesisBlock()).toEqual(new Block(0, Date.now(), "Genesis block", "0"));
  });

  test("getLatestBlock", () => {
    const blockchain = new Blockchain();
    expect(blockchain.getLatestBlock()).toEqual(new Block(0, Date.now(), "Genesis block", "0"));
  });
})
