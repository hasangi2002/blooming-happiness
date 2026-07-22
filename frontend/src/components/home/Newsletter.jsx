import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheck } from 'react-icons/fi';
import { Reveal } from '../common/Reveal';
import FallingPetals from '../common/FallingPetals';

const Newsletter = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    // Placeholder — no backend newsletter endpoint yet.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-aubergine-800 to-lavender-800 py-20 px-6">
      <FallingPetals count={10} className="absolute inset-0" />

      <Reveal className="relative z-10 mx-auto max-w-xl text-center">
        <p className="eyebrow mb-3 text-gold-300">Stay in Bloom</p>
        <h2 className="font-display text-h2 text-ivory">Join Our Newsletter</h2>
        <p className="mt-3 text-ivory/70">
          Seasonal collections, care tips, and early access to limited arrangements —
          straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <div className="flex-1 sm:max-w-xs">
            <input
              type="email"
              placeholder="you@example.com"
              className="input-field !bg-ivory/95"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-left text-xs text-blush-300">{errors.email.message}</p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center justify-center gap-2">
            <FiSend size={15} /> Subscribe
          </button>
        </form>

        <AnimatePresence>
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center justify-center gap-2 text-sm text-gold-300"
            >
              <FiCheck /> You're subscribed — welcome to the family.
            </motion.p>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  );
};

export default Newsletter;
