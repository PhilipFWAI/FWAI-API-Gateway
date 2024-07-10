import bcrypt from 'bcrypt';

const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, 10);
};

const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compareSync(plainPassword, hashedPassword);
};

export { hashPassword, comparePassword };