# 🧱 Simple Blockchain + CryptoUtils 🔐  
A bite-sized blockchain demo with encryption magic. Perfect for learning or tinkering.

---

## ⚡️ Wait... What *is* Blockchain?

Think of it like a notebook where each page (block) is glued to the previous one using a unique seal (hash). If someone tries to rip a page out and change it, the glue breaks and everyone knows it's been tampered with. That's how blockchain makes sure no one's messing with the data.

**Each block contains:**

- Data (like transactions, health records, whatever)
- A hash (digital fingerprint)
- The hash of the previous block (chain magic)
- A nonce (a number used to make the hash match rules — aka "mining")

## 🧠 What's in this Repo?

### 🧩 Core Files
- **`blockchain.js` / `simpleBlockchain.js`** – These are your blockchain engines. Define `Block` and `Blockchain` classes.
- **`cryptoUtils.js`** – Handles AES-192-CBC encryption/decryption of sensitive data. You can encrypt anything: patient records, passwords, your grocery list.

### 🧪 Test Files
- **`blockchain.test.js`** – Unit tests for the blockchain stuff, written using [bun](https://bun.sh/) test runner.
- **`cryptoUtils.test.js`** – Unit test for encrypting/decrypting JSON objects.
- **`blockchainTest.js`** – A simple demo script that adds a block and prints the whole chain.

## 🛠 How To Use This

### 1. 🔧 Prereqs
You need Node.js or [Bun](https://bun.sh/) (preferably Bun if you're running the tests).

```bash
# If using Node
npm install

# Or install Bun (if you haven't)
curl -fsSL https://bun.sh/install | bash
```

### 2. 🚀 Run the Demo

```bash
node blockchainTest.js
```

You'll see:

- A block get mined (with a valid hash)
- Full blockchain printed out
- Whether the chain is still valid

### 3. 🧪 Run the Tests (with Bun)

```bash
bun test
```

You'll get test results for:

- Hash calculation
- Mining
- Chain validity
- Encryption/decryption

## 🔐 Encrypting Stuff

```js
const { encryptData, decryptData } = require('./cryptoUtils');

(async () => {
  const data = JSON.stringify({ hello: "world" });
  const key = "SuperSecret123";

  const encrypted = await encryptData(data, key);
  const decrypted = await decryptData(encrypted, key);

  console.log({ encrypted, decrypted });
})();
```

## 🧠 TL;DR

- Blockchain = tamper-proof list of records 🔗
- You mine blocks to make sure the hash is valid (starts with `0000`, etc.)
- You can encrypt/decrypt stuff on top with `cryptoUtils.js`
- You can test everything with Bun (`bun test`)
- Run the demo with `node blockchainTest.js`
