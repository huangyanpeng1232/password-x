import md5 from "js-md5";
import CryptoJS from 'crypto-js';

// 获取浏览器指纹
export function getBowerId() {
    let height = window.screen.height;
    let width = window.screen.width;
    let language = navigator.language;
    let pixelDepth = screen.pixelDepth;
    let canvas = document.createElement('canvas');
    let gl = canvas.getContext('experimental-webgl');
    let debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    let gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)

    let brandsStr = ''
    let brands = navigator.userAgentData.brands
    for (let i = 0; i < brands.length; i++) {
        brandsStr += brands[i].brand
    }
    return md5(height + width + language + pixelDepth + gpu + brandsStr)
}

// AES加密
export function encrypt(key, data) {
    const dataHex = CryptoJS.enc.Utf8.parse(data); // 需要加密的数据
    const keyHex = CryptoJS.enc.Utf8.parse(key); // 秘钥
    const ivHex = CryptoJS.enc.Utf8.parse(''); // 偏移量
    const encrypted = CryptoJS.AES.encrypt(dataHex, keyHex, {
        iv: ivHex, mode: CryptoJS.mode.CBC, // 加密模式
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.ciphertext.toString();
}

// AES解密
export function decrypt(key, data) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(data);
    let src = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const keyHex = CryptoJS.enc.Utf8.parse(key); // 秘钥
    const ivHex = CryptoJS.enc.Utf8.parse('');
    let decrypt = CryptoJS.AES.decrypt(src, keyHex, {
        iv: ivHex, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7,
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}