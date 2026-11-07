'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Particle data model representing an individual node in the neural network canvas.
 */
interface Particle {
  x: number;         // Current horizontal position in canvas pixels
  y: number;         // Current vertical position in canvas pixels
  vx: number;        // Horizontal velocity vector (speed & direction)
  vy: number;        // Vertical velocity vector (speed & direction)
  radius: number;    // Radius of the rendered node dot
  color: string;     // Hex/RGB color assigned to the node
  baseAlpha: number; // Base opacity (0.0 to 1.0)
}

/**
 * NeuralBackground Component
 * 
 * Renders a full-screen, hardware-accelerated HTML5 Canvas 2D particle simulation.
 * Visualizes a dynamic "Neural Synapse Network" representing AI & distributed computing.
 * 
 * Mathematical & Physics Principles Used:
 * 1. Particle Kinematics:
 *    Each frame, position is updated via Euler integration:
 *    x(t + dt) = x(t) + vx
 *    y(t + dt) = y(t) + vy
 * 
 * 2. Elastic Boundary Collisions:
 *    When a particle hits any screen boundary (x < 0 or x > width), velocity is reversed:
 *    vx = -vx (and vy = -vy for vertical borders).
 * 
 * 3. Mouse Repulsion Vector Field:
 *    When cursor enters the influence radius R, a repulsive force vector is applied:
 *    distance = sqrt(dx^2 + dy^2)
 *    force = (1 - distance / R) * scalar
 *    x -= (dx / distance) * force
 *    y -= (dy / distance) * force
 * 
 * 4. Dynamic Synaptic Connections (Distance-Weighted Opacity):
 *    Pairs of particles closer than maxDistance (140px) draw connecting lines:
 *    alpha = (1 - distance / maxDistance) * 0.22
 *    This produces smooth fading lines as particles float apart.
 */
export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Set canvas dimensions to viewport
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates tracker (-1000 = off-screen initially)
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140, // Interactive repulsion radius around cursor
    };

    /**
     * Window Resize Handler:
     * Recalculates canvas dimensions and re-seeds particles so density stays uniform.
     */
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Color palette: Neon cyan, electric purple, high-contrast blue, emerald
    const colors = ['#06b6d4', '#8b5cf6', '#3b82f6', '#10b981'];
    let particles: Particle[] = [];

    /**
     * Seed particle swarm proportionally to screen resolution
     * Capped at 75 particles for maximum performance (60 FPS on any GPU)
     */
    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 16000), 75);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          baseAlpha: Math.random() * 0.5 + 0.3,
        });
      }
    };

    initParticles();

    // Max distance in pixels across which two nodes connect
    const maxDistance = 140;

    /**
     * MAIN ANIMATION RENDER LOOP:
     * Clears screen, updates positions, computes inter-node connections, and draws.
     */
    const render = () => {
      // 1. Clear previous frame
      ctx.clearRect(0, 0, width, height);

      // 2. Iterate particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Kinematic update
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Boundary reflection
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse repulsion physics
        const dxMouse = mouse.x - p1.x;
        const dyMouse = mouse.y - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const force = (1 - distMouse / mouse.radius) * 1.5;
          p1.x -= (dxMouse / distMouse) * force;
          p1.y -= (dyMouse / distMouse) * force;
        }

        // 3. Connect particles with lines based on Euclidean distance
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Fade line opacity inversely to distance
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // 4. Draw particle dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.baseAlpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // Schedule next 60 FPS animation frame
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup listeners and cancel animation frame on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  );
};
