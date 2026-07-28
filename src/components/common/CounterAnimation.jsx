import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

/**
 * CounterAnimation Component - Reusable number animation component
 * Smoothly animates a counter from 0 to a target value with accessibility support
 *
 * @component
 * @param {Object} props
 * @param {number} props.target - The target number to animate to
 * @param {number} [props.duration=2500] - Animation duration in milliseconds
 * @param {string} [props.suffix=""] - Text to append after the number (e.g., "%", "K+")
 * @param {string} [props.prefix=""] - Text to prepend before the number (e.g., "$")
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {number} [props.delay=0] - Delay before animation starts in milliseconds
 * @param {boolean} [props.respectReducedMotion=true] - Respect prefers-reduced-motion
 * @param {string} [props.ariaLabel=""] - ARIA label for accessibility
 *
 * @example
 * <CounterAnimation
 *   target={500}
 *   duration={2000}
 *   suffix="K+"
 *   className="text-2xl font-bold"
 * />
 */
export default function CounterAnimation({
  target,
  duration = 2500,
  suffix = "",
  prefix = "",
  className = "",
  delay = 0,
  respectReducedMotion = true,
  ariaLabel = "",
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Intersection Observer for viewport-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  // Animation logic
  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    let animationTimeout;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuad = 1 - Math.pow(1 - progress, 2); // Easing function

      setCount(Math.floor(easeOutQuad * target));

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    // Respect reduced motion preference
    if (respectReducedMotion && prefersReducedMotion) {
      setCount(target);
    } else {
      animationTimeout = setTimeout(() => {
        animationFrameRef.current = requestAnimationFrame(animate);
      }, delay);
    }

    return () => {
      clearTimeout(animationTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [target, duration, delay, isVisible, respectReducedMotion, prefersReducedMotion]);

  const displayValue = `${prefix}${count.toLocaleString()}${suffix}`;

  return (
    <motion.span
      ref={elementRef}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: respectReducedMotion && prefersReducedMotion ? 0 : 0.6,
        delay: respectReducedMotion && prefersReducedMotion ? 0 : delay / 1000,
      }}
      viewport={{ once: true }}
      className={className}
      aria-label={ariaLabel || displayValue}
      role="status"
    >
      {displayValue}
    </motion.span>
  );
}
