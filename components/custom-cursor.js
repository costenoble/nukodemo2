"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: -200, y: -200 });
  const ringPosRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    function onMove(e) {
      posRef.current = { x: e.clientX, y: e.clientY };
    }

    function onOver(e) {
      if (e.target.closest("a, button")) ring.setAttribute("data-hover", "1");
    }

    function onOut(e) {
      if (e.target.closest("a, button")) ring.removeAttribute("data-hover");
    }

    function loop() {
      const { x: tx, y: ty } = posRef.current;
      ringPosRef.current.x += (tx - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (ty - ringPosRef.current.y) * 0.12;
      dot.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${ringPosRef.current.x}px,${ringPosRef.current.y}px) translate(-50%,-50%)`;
      rafRef.current = requestAnimationFrame(loop);
    }

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
