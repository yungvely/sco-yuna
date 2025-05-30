"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  sectionRef: React.RefObject<HTMLElement | null>;
  variant?: "white" | "blossom";
};

export const FlowerCanvas = ({ sectionRef, variant = "white" }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);
  const [visible, setVisible] = useState(true);
  const petalsRef = useRef<any[]>([]);
  const petalImgRef = useRef<HTMLImageElement | null>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !sectionRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const containerWidth = sectionRef.current?.clientWidth || 425;
      const containerHeight = sectionRef.current?.clientHeight || 600;

      canvas.width = containerWidth * dpr;
      canvas.height = containerHeight * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const petalImage = new Image();
    petalImage.crossOrigin = "anonymous";
    petalImage.src = variant === "blossom" ? "/blossom.png" : "/petal.png";
    petalImgRef.current = petalImage;

    const TOTAL = 100;

    class Petal {
      x = Math.random() * window.innerWidth;
      y = Math.random() * window.innerHeight * 2 - window.innerHeight;
      w = 25 + Math.random() * 15;
      h = 20 + Math.random() * 10;
      opacity = this.w / 80;
      flip = Math.random();
      xSpeed = 0.6 + Math.random() * 1.0;
      ySpeed = 0.4 + Math.random() * 0.6;
      flipSpeed = Math.random() * 0.02;

      draw() {
        if (!ctx || !petalImgRef.current) return;

        const scrollOffset = scrollRef.current * 0.2;

        if (this.y > window.innerHeight || this.x > window.innerWidth) {
          this.x = -petalImgRef.current.width;
          this.y = Math.random() * window.innerHeight * 2 - window.innerHeight;
          this.xSpeed = 0.6 + Math.random() * 1.0;
          this.ySpeed = 0.4 + Math.random() * 0.6;
          this.flip = Math.random();
        }

        ctx.globalAlpha = this.opacity;
        ctx.drawImage(
          petalImgRef.current,
          this.x,
          this.y + scrollOffset,
          this.w * (0.6 + Math.abs(Math.cos(this.flip)) / 3),
          this.h * (0.8 + Math.abs(Math.sin(this.flip)) / 5)
        );
      }

      animate() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.flip += this.flipSpeed;
        this.draw();
      }
    }

    const draw = () => {
      if (!ctx || !visible) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (variant === "blossom") {
        petalsRef.current.forEach((p) => p.animate());
      } else {
        const scrollOffset = scrollRef.current * 0.2;

        petalsRef.current.forEach((p) => {
          p.y += p.r;
          p.x += Math.sin((p.angle * Math.PI) / 180) * 0.6;
          p.angle += 0.5;

          if (p.y > window.innerHeight) {
            p.y = -50;
            p.x = Math.random() * window.innerWidth;
          }

          ctx.save();
          ctx.translate(p.x, p.y + scrollOffset);
          ctx.rotate((p.angle * Math.PI) / 180);
          ctx.drawImage(petalImage, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        });
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    const setup = () => {
      if (variant === "blossom") {
        petalsRef.current = Array.from({ length: TOTAL }, () => new Petal());
      } else {
        petalsRef.current = Array.from({ length: 25 }, () => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: 0.8 + Math.random() * 1.5,
          size: 22 + Math.random() * 12,
          angle: Math.random() * 360,
        }));
      }
      draw();
    };

    if (petalImage.complete) {
      setup();
    } else {
      petalImage.onload = setup;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (canvas.style) {
          canvas.style.opacity = `${entry.intersectionRatio}`;
        }
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
      }
    );
    observer.observe(sectionRef.current);

    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      scrollRef.current = -rect.top;
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionRef, variant]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        zIndex: 1,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    />
  );
};
