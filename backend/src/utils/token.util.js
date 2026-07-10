import jwt from 'jsonwebtoken';
import { env, isProd } from '../config/env.js';

export const generateAccessToken = (userId) =>
  jwt.sign({ id: userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

export const generateRefreshToken = (userId) =>
  jwt.sign({ id: userId }, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshExpiresIn });

export const verifyAccessToken = (token) => jwt.verify(token, env.jwtSecret);
export const verifyRefreshToken = (token) => jwt.verify(token, env.jwtRefreshSecret);

const msFromDuration = (duration) => {
  const match = /^(\d+)([smhd])$/.exec(duration);
  if (!match) return 15 * 60 * 1000;
  const multipliers = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
  return Number(match[1]) * multipliers[match[2]];
};

export const cookieOptions = (duration) => ({
  httpOnly: true,
  secure: isProd,
  sameSite: 'strict',
  maxAge: msFromDuration(duration),
});
