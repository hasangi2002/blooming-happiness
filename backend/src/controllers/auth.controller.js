import * as authService from '../services/auth.service.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  cookieOptions,
} from '../utils/token.util.js';
import { env } from '../config/env.js';

const sendAuthResponse = (res, user, statusCode) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  res.cookie('accessToken', accessToken, cookieOptions(env.jwtExpiresIn));
  res.cookie('refreshToken', refreshToken, cookieOptions(env.jwtRefreshExpiresIn));

  res.status(statusCode).json({
    success: true,
    user: user.toSafeObject(),
  });
};

export const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    sendAuthResponse(res, user, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await authService.authenticateUser(req.body);
    sendAuthResponse(res, user, 200);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user.id);
    res.status(200).json({ success: true, user: user.toSafeObject() });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: 'No refresh token provided' });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await authService.getUserById(decoded.id);
    sendAuthResponse(res, user, 200);
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
  }
};

export default { register, login, logout, getMe, refresh };
