import { enc, AES } from 'crypto-js';


const secretKey = process.env.REACT_APP_SECREAT_KEY;

export const encrypt = (data) => {
  const ciphertext = AES.encrypt(data, secretKey);
  return ciphertext.toString();
};

export const decrypt = (ciphertext) => {
  const bytes = AES.decrypt(ciphertext, secretKey);
  return bytes.toString(enc.Utf8);
};