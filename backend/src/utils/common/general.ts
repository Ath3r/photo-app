import bcrypt from 'bcrypt';

const encryptPassword = (password: string) => {
  const salt = parseInt(process.env.JWT_SALT as string);
  return bcrypt.hashSync(password, salt);
}

const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
}

export { encryptPassword, comparePassword };