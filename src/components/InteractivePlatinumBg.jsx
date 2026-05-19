import { useRef, useEffect } from 'react';

const InteractivePlatinumBg = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, targetX: null, targetY: null });
  const ripplesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const particleCount = 75;
    const connectionDistance = 120;
    const mouseRadius = 180;

    // Handle resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Initialize particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 10;
        const rand = Math.random();
        this.color = rand > 0.6 
          ? 'rgba(236, 72, 153, 0.7)'   // Neon Pink
          : rand > 0.3 
            ? 'rgba(168, 85, 247, 0.7)' // Neon Purple
            : 'rgba(255, 255, 255, 0.7)'; // Bright White
      }

      update(mouseX, mouseY) {
        // Natural movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Ripple interaction
        ripplesRef.current.forEach(ripple => {
          const dx = this.x - ripple.x;
          const dy = this.y - ripple.y;
          const distance = Math.hypot(dx, dy);
          if (distance < ripple.currentRadius && distance > ripple.currentRadius - 30) {
            const force = (ripple.currentRadius - distance) / 30;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 10;
            this.y += Math.sin(angle) * force * 10;
          }
        });

        // Mouse magnetic pull/push
        if (mouseX !== null && mouseY !== null) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.hypot(dx, dy);
          if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            // Dynamic premium slide-back effect
            this.x -= Math.cos(angle) * force * 1.5;
            this.y -= Math.sin(angle) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color.includes('236') 
          ? 'rgba(236, 72, 153, 0.8)' 
          : this.color.includes('168') 
            ? 'rgba(168, 85, 247, 0.8)' 
            : 'rgba(255, 255, 255, 0.5)';
        ctx.shadowBlur = this.size * 3.5;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse events
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = null;
      mouseRef.current.targetY = null;
    };

    const handleClick = (e) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        maxRadius: 200,
        currentRadius: 0,
        speed: 4,
        opacity: 0.5
      });
      if (ripplesRef.current.length > 5) ripplesRef.current.shift();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse follow (inertia)
      const mouse = mouseRef.current;
      if (mouse.targetX !== null && mouse.x !== null) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      } else {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      }

      // Draw premium dark metallic canvas background gradient
      const bgGrad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 10,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      bgGrad.addColorStop(0, '#0f1011');
      bgGrad.addColorStop(1, '#070808');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw interactive mouse spotlight (ambient luxury glow)
      if (mouse.x !== null && mouse.y !== null) {
        const spotGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouseRadius * 1.8
        );
        spotGrad.addColorStop(0, 'rgba(168, 85, 247, 0.12)'); // Glowing purple core
        spotGrad.addColorStop(0.4, 'rgba(236, 72, 153, 0.05)'); // Soft pink aura
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseRadius * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw ripples
      ripplesRef.current.forEach((ripple, index) => {
        ripple.currentRadius += ripple.speed;
        ripple.opacity = 1 - (ripple.currentRadius / ripple.maxRadius);

        if (ripple.opacity > 0) {
          const ripGrad = ctx.createRadialGradient(
            ripple.x, ripple.y, Math.max(0, ripple.currentRadius - 20),
            ripple.x, ripple.y, ripple.currentRadius + 5
          );
          ripGrad.addColorStop(0, `rgba(168, 85, 247, 0)`);
          ripGrad.addColorStop(0.5, `rgba(236, 72, 153, ${ripple.opacity * 0.45})`); // Neon Pink
          ripGrad.addColorStop(1, `rgba(168, 85, 247, ${ripple.opacity * 0.3})`);  // Neon Purple
          
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.currentRadius, 0, Math.PI * 2);
          ctx.strokeStyle = ripGrad;
          ctx.lineWidth = 3;
          ctx.stroke();
        } else {
          ripplesRef.current.splice(index, 1);
        }
      });

      // Update & Draw Particles
      particles.forEach(p => {
        p.update(mouse.x, mouse.y);
        p.draw();
      });

      // Draw elegant constellation neural link connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.hypot(dx, dy);

          if (distance < connectionDistance) {
            const alpha = (1 - (distance / connectionDistance)) * 0.25;
            const grad = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            // Neon pink & purple dynamic connection system
            grad.addColorStop(0, `rgba(168, 85, 247, ${alpha * 1.2})`); // Neon Purple
            grad.addColorStop(0.5, `rgba(236, 72, 153, ${alpha * 1.5})`); // Neon Pink
            grad.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.8})`); // Glowing white end
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.95;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
};

export default InteractivePlatinumBg;
