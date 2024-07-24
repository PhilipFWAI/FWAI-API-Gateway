import randomstring from 'randomstring';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

const generateAccessToken = (id: number, key: string): string => {
  return sign({ id }, key);
};

const verifyToken = (token: string, key: string): JwtPayload => {
  return verify(token, key) as JwtPayload;
};

const generateRefreshToken = (): string => {
  return randomstring.generate(process.env.RANDOM_STRING_LENGTH);
};

export { generateAccessToken, verifyToken, generateRefreshToken };
