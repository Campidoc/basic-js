const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.isDirect = direct;
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');
    return this.processText(message, key, 'encrypt');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) throw new Error('Incorrect arguments!');
    return this.processText(encryptedMessage, key, 'decrypt');
  }

  processText(text, key, mode) {
    const result = [];
    let keyIndex = 0;
    
    const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
    
    for (let i = 0; i < text.length; i++) {
      const currentChar = text[i];
      
      if (!/[A-Za-z]/.test(currentChar)) {
        result.push(currentChar);
        continue;
      }
      
      const textCharCode = currentChar.toUpperCase().charCodeAt(0) - 65;
      const keyCharCode = cleanKey[keyIndex % cleanKey.length].charCodeAt(0) - 65;
      keyIndex++;
      
      let resultCharCode;
      if (mode === 'encrypt') {
        resultCharCode = (textCharCode + keyCharCode) % 26;
      } else {
        resultCharCode = (textCharCode - keyCharCode + 26) % 26;
      }
      
      result.push(String.fromCharCode(resultCharCode + 65));
    }
    
    let finalResult = result.join('');
    if (!this.isDirect) {
      finalResult = finalResult.split('').reverse().join('');
    }
    
    return finalResult;
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
