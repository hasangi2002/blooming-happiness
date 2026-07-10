import User from '../models/User.model.js';
import { AppError } from '../utils/appError.js';

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new AppError('An account with this email already exists', 409);
  }

  // Role is always forced to 'customer' here — never trust role from client input.
  // Admin accounts are promoted manually (see Testing section below).
  const user = await User.create({ name, email, password, role: 'customer' });
  return user;
};

export const authenticateUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }
  if (!user.isActive) {
    throw new AppError('This account has been deactivated', 403);
  }

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });
  return user;
};

export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new AppError('User not found', 404);
  return user;
};
