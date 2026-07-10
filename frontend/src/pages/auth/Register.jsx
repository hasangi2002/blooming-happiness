import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await registerUser({ name: data.name, email: data.email, password: data.password });
      navigate('/', { replace: true });
    } catch (error) {
      setServerError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory-dim px-6 py-16">
      <div className="card-glass w-full max-w-md">
        <p className="eyebrow text-center mb-2">Join us</p>
        <h1 className="text-h2 font-display text-center mb-8">Create Account</h1>

        {serverError && (
          <p className="mb-4 text-sm text-blush-700 bg-blush-50 rounded-[var(--radius-md)] px-4 py-3">
            {serverError}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="input-label" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              className="input-field"
              placeholder="Jane Doe"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name is too short' },
              })}
            />
            {errors.name && <p className="mt-1 text-xs text-blush-700">{errors.name.message}</p>}
          </div>

          <div>
            <label className="input-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input-field"
              placeholder="you@example.com"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="mt-1 text-xs text-blush-700">{errors.email.message}</p>}
          </div>

          <div>
            <label className="input-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input-field"
              placeholder="At least 8 characters"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                pattern: { value: /\d/, message: 'Password must contain a number' },
              })}
            />
            {errors.password && <p className="mt-1 text-xs text-blush-700">{errors.password.message}</p>}
          </div>

          <div>
            <label className="input-label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="input-field"
              placeholder="Repeat password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-blush-700">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-aubergine-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-lavender-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
