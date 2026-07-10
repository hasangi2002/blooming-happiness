import { verifyAccessToken } from '../utils/token.util.js';
import { AppError } from '../utils/appError.js';
import User from '../models/User.model.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      throw new AppError('You are not logged in. Please log in to access this resource', 401);
    }

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError('The user belonging to this token no longer exists', 401);
    }
    if (!user.isActive) {
      throw new AppError('This account has been deactivated', 403);
    }

    req.user = { id: user._id.toString(), role: user.role, email: user.email };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      error.statusCode = 401;
      error.message = 'Session expired. Please log in again';
    } else if (error.name === 'JsonWebTokenError') {
      error.statusCode = 401;
      error.message = 'Invalid authentication token';
    }
    next(error);
  }
};

export const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new AppError('You do not have permission to perform this action', 403));
  }
  next();
};
