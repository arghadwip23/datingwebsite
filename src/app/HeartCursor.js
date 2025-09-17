"use client";
import React, { useEffect, useRef, useState } from "react";

const TAIL_LENGTH = 12;
const TAIL_FADE = 0.08;

function HeartSVG({ style }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="red"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path d="M12 21s-6.716-5.686-9.543-8.514C-1.047 9.896 1.4 5.5 6.5 5.5c2.54 0 4.04 1.92 5.5 3.5 1.46-1.58 2.96-3.5 5.5-3.5 5.1 0 7.547 4.396 4.043 7.986C18.716 15.314 12 21 12 21z"/>
    </svg>
  );
}

export default function HeartCursor() {
  const [positions, setPositions] = useState([]);
  const requestRef = useRef();

  useEffect(() => {
    const handleMove = (e) => {
      setPositions((prev) => [
        { x: e.clientX, y: e.clientY },
        ...prev.slice(0, TAIL_LENGTH - 1),
      ]);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Animation for trailing effect
  useEffect(() => {
    const animate = () => {
      setPositions((prev) => {
        if (prev.length < 2) return prev;
        const next = prev.map((pos, i) => {
          if (i === prev.length - 1) return pos;
          const nextPos = prev[i + 1];
          return {
            x: pos.x + (nextPos.x - pos.x) * TAIL_FADE,
            y: pos.y + (nextPos.y - pos.y) * TAIL_FADE,
          };
        });
        return next;
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            left: pos.x - 14,
            top: pos.y - 14,
            pointerEvents: "none",
            zIndex: 9999,
            opacity: 1 - i / TAIL_LENGTH,
            filter: i === 0 ? "drop-shadow(0 2px 6px #f00a)" : "none",
            transition: "opacity 0.1s",
          }}
        >
          <HeartSVG />
        </div>
      ))}
    </>
  );
}
