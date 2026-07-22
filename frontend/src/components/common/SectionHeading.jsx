import { Reveal } from './Reveal';

const SectionHeading = ({ eyebrow, title, subtitle, align = 'center', dark = false }) => (
  <Reveal
    className={`mb-14 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}
  >
    {eyebrow && (
      <p className={`eyebrow mb-3 ${dark ? '!text-gold-300' : ''}`}>{eyebrow}</p>
    )}
    <h2 className={`text-h2 font-display ${dark ? 'text-ivory' : 'text-aubergine-900'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-4 ${dark ? 'text-ivory/70' : 'text-aubergine-500'}`}>{subtitle}</p>
    )}
    <div className={`divider-ornate ${align !== 'center' ? '!mx-0' : ''}`} />
  </Reveal>
);

export default SectionHeading;
