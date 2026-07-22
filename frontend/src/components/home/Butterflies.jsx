import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

const PATHS = [
  'M -5,30 C 20,10 40,50 60,20 S 90,40 105,15',
  'M -5,70 C 25,90 45,55 65,80 S 95,60 105,85',
  'M -5,50 C 15,20 55,80 75,40 S 100,60 105,30',
];

const WingPair = ({ color }) => (
  <>
    <path d="M0,0 C-8,-10 -14,-4 -10,4 C-6,10 2,8 0,0Z" fill={color} opacity="0.9" />
    <path d="M0,0 C8,-10 14,-4 10,4 C6,10 -2,8 0,0Z" fill={color} opacity="0.9" />
  </>
);

const Butterfly = ({ path, duration, delay, color, scale }) => {
  const ref = useRef(null);
  const wingsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        motionPath: {
          path,
          align: undefined,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        duration,
        delay,
        repeat: -1,
        ease: 'sine.inOut',
      });

      gsap.to(wingsRef.current, {
        scaleX: 0.35,
        duration: 0.18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
    return () => ctx.revert();
  }, [path, duration, delay]);

  return (
    <svg
      ref={ref}
      viewBox="-16 -16 32 32"
      width={22 * scale}
      height={22 * scale}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <g ref={wingsRef} style={{ transformOrigin: 'center' }}>
        <WingPair color={color} />
      </g>
    </svg>
  );
};

const Butterflies = () => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    style={{ position: 'absolute' }}
  >
    <foreignObject x="0" y="0" width="100%" height="100%">
      <div style={{ position: 'relative', width: '100%', height: '100%' }} xmlns="http://www.w3.org/1999/xhtml">
        <Butterfly path={PATHS[0]} duration={14} delay={0} color="#E0C185" scale={1.3} />
        <Butterfly path={PATHS[1]} duration={18} delay={2} color="#F0BBD0" scale={1} />
        <Butterfly path={PATHS[2]} duration={16} delay={4} color="#FDFBF8" scale={1.1} />
      </div>
    </foreignObject>
  </svg>
);

export default Butterflies;
