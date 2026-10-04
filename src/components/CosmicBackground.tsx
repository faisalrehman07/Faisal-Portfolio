import React, { useEffect, useRef } from 'react';

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Star data structure
    interface Star {
      x: number;
      y: number;
      size: number;
      alpha: number;
      targetAlpha: number;
      speed: number;
      color: string;
      glow: boolean;
    }

    // Shooting star / meteor
    interface Meteor {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      active: boolean;
    }

    const starColors = [
      'rgba(255, 255, 255,',
      'rgba(186, 230, 253,', // Ice blue
      'rgba(224, 231, 255,', // Soft violet
      'rgba(167, 243, 208,', // Stellar emerald
      'rgba(254, 240, 138,', // Golden dwarf
    ];

    const starCount = Math.min(Math.floor((width * height) / 4500), 220);
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        targetAlpha: Math.random() * 0.8 + 0.2,
        speed: (Math.random() * 0.015 + 0.005),
        color: starColors[Math.floor(Math.random() * starColors.length)],
        glow: Math.random() > 0.8,
      });
    }

    const meteors: Meteor[] = [];
    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width * 1.2 - width * 0.1,
        y: Math.random() * (height * 0.4),
        length: Math.random() * 80 + 40,
        speed: Math.random() * 10 + 12,
        angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
        alpha: 1,
        active: true,
      });
    };

    let meteorTimer = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render cosmic background base gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.9
      );
      bgGrad.addColorStop(0, '#0a0f24');
      bgGrad.addColorStop(0.5, '#040714');
      bgGrad.addColorStop(1, '#020308');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Deep Space Nebulae Aura Patches
      // 1. Cyber-Violet Nebula top right
      const neb1 = ctx.createRadialGradient(
        width * 0.85,
        height * 0.15,
        0,
        width * 0.85,
        height * 0.15,
        width * 0.45
      );
      neb1.addColorStop(0, 'rgba(99, 102, 241, 0.12)');
      neb1.addColorStop(0.5, 'rgba(139, 92, 246, 0.05)');
      neb1.addColorStop(1, 'transparent');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      // 2. Cyan Cosmic Rift center-left
      const neb2 = ctx.createRadialGradient(
        width * 0.15,
        height * 0.6,
        0,
        width * 0.15,
        height * 0.6,
        width * 0.4
      );
      neb2.addColorStop(0, 'rgba(6, 182, 212, 0.10)');
      neb2.addColorStop(0.6, 'rgba(14, 165, 233, 0.03)');
      neb2.addColorStop(1, 'transparent');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, width, height);

      // 3. Deep Emerald Stellar Nebula bottom right
      const neb3 = ctx.createRadialGradient(
        width * 0.7,
        height * 0.85,
        0,
        width * 0.7,
        height * 0.85,
        width * 0.35
      );
      neb3.addColorStop(0, 'rgba(16, 185, 129, 0.07)');
      neb3.addColorStop(1, 'transparent');
      ctx.fillStyle = neb3;
      ctx.fillRect(0, 0, width, height);

      // Render & Animate Stars
      for (const s of stars) {
        if (Math.abs(s.alpha - s.targetAlpha) < 0.01) {
          s.targetAlpha = Math.random() * 0.8 + 0.2;
        } else {
          s.alpha += (s.targetAlpha - s.alpha) * s.speed;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color} ${s.alpha})`;
        ctx.fill();

        if (s.glow && s.alpha > 0.6) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `${s.color} ${s.alpha * 0.25})`;
          ctx.fill();
        }
      }

      // Meteors logic
      meteorTimer++;
      if (meteorTimer > 280) {
        if (Math.random() > 0.4) {
          spawnMeteor();
        }
        meteorTimer = 0;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        if (!m.active) {
          meteors.splice(i, 1);
          continue;
        }

        const headX = m.x;
        const headY = m.y;
        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const meteorGrad = ctx.createLinearGradient(headX, headY, tailX, tailY);
        meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        meteorGrad.addColorStop(0.3, `rgba(56, 189, 248, ${m.alpha * 0.7})`);
        meteorGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');

        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.012;

        if (m.alpha <= 0 || m.x > width + 100 || m.y > height + 100) {
          m.active = false;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Subtle subtle digital grid overlay for that light touch of coder aesthetic */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.4) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
    </div>
  );
};
