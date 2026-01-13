import bcrypt from 'bcrypt';

const plainPassword = 'password';
const hash = await bcrypt.hash(plainPassword, 10);
console.log(hash);