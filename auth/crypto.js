// crypto.js
import { arrayBufferToBase64, base64ToArrayBuffer } from '../utils/helpers.js';

async function getKeyFromPassword(password, salt = "widechat") {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]);
    return await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: enc.encode(salt), iterations: 100000, hash: "SHA-256" },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

// Movida para dentro de crypto.js, não precisa ser exportada se usada apenas aqui
function generateRandomIV(length = 12) {
    return crypto.getRandomValues(new Uint8Array(length));
}

export async function encrypt(text, password) {
    const key = await getKeyFromPassword(password);
    const enc = new TextEncoder();
    const iv = generateRandomIV(12); // Usando a função interna agora
    const encoded = enc.encode(text);
    const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
    const encryptedBytes = new Uint8Array(ciphertext);
    const combined = new Uint8Array(iv.byteLength + encryptedBytes.byteLength);
    combined.set(iv);
    combined.set(encryptedBytes, iv.byteLength);

    // Usando o helper para conversão Base64
    return arrayBufferToBase64(combined);
}

export async function decrypt(cipherBase64, password) {
    try {
        // Usando o helper para conversão Base64
        const data = base64ToArrayBuffer(cipherBase64);
        const iv = data.slice(0, 12);
        const ciphertext = data.slice(12);
        const key = await getKeyFromPassword(password);
        const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
        return new TextDecoder().decode(decrypted);
    } catch (err) {
        console.error("Erro ao descriptografar senha:", err);
        return null;
    }
}