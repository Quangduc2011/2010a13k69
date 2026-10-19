import confetti from 'canvas-confetti';

/**
 * Triggers a floral petal-burst and confetti celebration when an envelope is opened.
 */
export function fireEnvelopeCelebration() {
  if (typeof window === 'undefined') return;

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const floralColors = [
    '#F472B6', // pink-400
    '#FBCFE8', // sakura blush
    '#FDA4AF', // rose-300
    '#E9D5FF', // lavender
    '#FDE047', // soft gold
    '#FB7185', // rose-500
    '#C084FC', // purple-400
  ];

  try {
    // Custom petal shape
    const petalShape = confetti.shapeFromPath({
      path: 'M12 0C16 8 24 14 24 22C24 27.5 18.6 32 12 32C5.4 32 0 27.5 0 22C0 14 8 8 12 0Z',
    });

    // Custom heart shape
    const heartShape = confetti.shapeFromPath({
      path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    });

    // 1. Initial explosive petal burst from the envelope wax seal center
    confetti({
      particleCount: 45,
      spread: 75,
      startVelocity: 35,
      origin: { x: 0.5, y: 0.48 },
      colors: floralColors,
      shapes: [petalShape, heartShape, 'circle'],
      scalar: 1.2,
      gravity: 0.8,
      ticks: 200,
      disableForReducedMotion: true,
    });

    // 2. Secondary wider fountain burst after 150ms as the letter rises
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0.25, y: 0.55 },
        colors: floralColors,
        shapes: [petalShape, 'circle'],
        scalar: 1.1,
        gravity: 0.7,
        ticks: 240,
        disableForReducedMotion: true,
      });

      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 0.75, y: 0.55 },
        colors: floralColors,
        shapes: [petalShape, heartShape],
        scalar: 1.1,
        gravity: 0.7,
        ticks: 240,
        disableForReducedMotion: true,
      });
    }, 180);

    // 3. Delicate gold and rose sparkle shimmer after 350ms
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 100,
        startVelocity: 25,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#FEF08A', '#FBCFE8', '#F472B6'],
        shapes: ['circle'],
        scalar: 0.8,
        gravity: 0.6,
        ticks: 220,
        disableForReducedMotion: true,
      });
    }, 360);
  } catch {
    // Graceful fallback to default confetti if custom path is unsupported
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { x: 0.5, y: 0.48 },
      colors: floralColors,
    });
  }
}
