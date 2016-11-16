'use strict';

const crypto =require('crypto');

/**
 * md5和sha加密方法
 *
//加密方法：md5; sha1; 更安全的：sha256; sha512
const hash = crypto.createHash('md5');

hash.update('hello node.js!');
// hash.update('hello world!');

console.log(hash.digest('hex'));

/**
 * Hmac哈希算法，利用md5和sha1算法，配合秘钥生成签名
 *
const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('hello world!');

console.log(hmac.digest('hex'));

/**
 * AES对称加密算法
 *
function aesEncrupt(data, key){
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf-8', 'hex');
    console.log('aesEncrupt`s crypted: ' + crypted);
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key){
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    console.log('aesDecrypt`s decrypted: ' + decrypted);
    decrypted += decipher.final('utf-8');
    return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrupt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);

/**
 * Diffie-Hellman 算法，一种秘钥交换协议
 */
// 甲方的key
var partA = crypto.createDiffieHellman(512);
var partA_keys = partA.generateKeys();

var prime = partA.getPrime();
var generator = partA.getGenerator();

console.log('Prime: ' + prime.toString('hex'));
console.log('Generator: ' + generator.toString('hex'));

// 乙方放入key
var partB = crypto.createDiffieHellman(prime, generator);
var partB_keys = partB.generateKeys();

// exchange and generate secret:
var partA_secret = partA.computeSecret(partB_keys);
var partB_secret = partB.computeSecret(partA_keys);

console.log('Secret of Part A: ' + partA_secret.toString('hex'));
console.log('Secret of Part B: ' + partB_secret.toString('hex'));