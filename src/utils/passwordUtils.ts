import bcrypt from 'bcrypt';

const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, 10);
};

const comparePassword = (plainPassword: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
};

export { hashPassword, comparePassword };