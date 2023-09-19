import CryptoJS from 'crypto-js';

const AES_KEY = 'GptKEYForCHISON';

/**
 * 密码加密
 */
export function encryptByAES(str: string) {
    return CryptoJS.AES.encrypt(str, AES_KEY).toString();
}

/* 密码解密 */
export function decryptByAES(text: string) {
    const bytes = CryptoJS.AES.decrypt(text, AES_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}