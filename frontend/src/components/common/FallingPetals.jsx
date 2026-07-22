import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PETAL_COLORS = ['#F0BBD0', '#E0C185', '#C0AEE3', '#FDFBF8'];
const PETAL_COUNT = 20;

const generatePetals = () =>
  Array.from({ length: PETAL_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 10 + Math.random() * 14,
    opacity: 0.5 + Math.random() * 0.5,
    color: PETAL_COLORS[i % PETAL_COLORS.length],
    duration: 6 + Math.random() * 5,
    delay: Math.random() * 3,
    sway: 20 + Math.random() * 50,
  }));

const FallingPetals = () => {
  const containerRef = useRef(null);
  const petalRefs = useRef([]);
  const petals = useRef(generatePetals()).current;

  useEffect(() => {
    const ctx = gsap.context(() => {
      petalRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = petals[i];

        gsap.fromTo(
          el,
          { y: '-10vh', rotation: 0 },
          {
            y: '110vh',
            rotation: Math.random() > 0.5 ? 360 : -360,
            duration: p.duration,
            delay: p.delay,
            repeat: -1,
            ease: 'none',
          }
        );

        gsap.to(el, {
          x: `+=${p.sway}`,
          duration: p.duration / 3,
          delay: p.delay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [petals]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <svg
          key={p.id}
          ref={(el) => (petalRefs.current[i] = el)}
          viewBox="0 0 24 24"
          width={p.size}
          height={p.size}
          style={{ position: 'absolute', top: 0, left: `${p.left}%`, opacity: p.opacity }}
        >
          <path
            d="M12 2C7 2 2 7 2 12c5 0 10-5 10-10zM12 2c5 0 10 5 10 10-5 0-10-5-10-10zM12 22c-5 0-10-5-10-10 5 0 10 5 10 10zM12 22c5 0 10-5 10-10 0 5-5 10-10 10z"
            fill={p.color}
          />
        </svg>
      ))}
    </div>
  );
};

export default FallingPetals;
