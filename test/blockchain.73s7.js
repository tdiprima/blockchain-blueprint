import { describe, expect, test } from "bun:test";
import { Block, Blockchain } from "../src/blockchain.js";

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
        expect(blockchain.createGenesisBlock()).toEqual(new Block(0, Date.now(), "Genesis block", "0"));
    });
})
