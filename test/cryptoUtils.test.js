import { describe, expect, test } from "bun:test";
import { decryptData, encryptData } from "../src/cryptoUtils.js";

describe("cryptoUtils", () => {
  test("should encrypt and decrypt data", async () => {
    const data = {
      patientId: "12345",
      diagnosis: "Common Cold",
      medication: "Aspirin",
    };
    const secretKey = "ThisIsAVerySecretKey";
    const encryptedData = await encryptData(JSON.stringify(data), secretKey);
    const decryptedData = await decryptData(encryptedData, secretKey);
    expect(JSON.parse(decryptedData)).toEqual(data);
  });
});
