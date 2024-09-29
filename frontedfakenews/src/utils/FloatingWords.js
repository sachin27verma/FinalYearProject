// FloatingWords.js
'use client'
import React from 'react';
import { useSpring, animated } from 'react-spring';

// List of words related to fake news
const words = [
  "Misinformation",
  "Disinformation",
  "Fake News",
  "Hoax",
  "Scam",
  "Conspiracy",
  "Rumor",
  "Falsehood",
  "Clickbait",
  "Sensationalism",
];

const randomColor = () => {
  const colors = ["#ff4757", "#1e90ff", "#2ed573", "#fffa65", "#3742fa", "#ff6348"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const FloatingWords = () => {
  return (
    <div className="floating-words">
      {words.map((word, index) => {
        const props = useSpring({
          from: { transform: `translateY(${Math.random() * 100}px)` },
          to: { transform: `translateY(-${Math.random() * 100}px)` },
          config: { tension: 200, friction: 12, mass: 1 },
          loop: { reverse: true },
          reset: true,
        });

        return (
          <animated.div
            key={index}
            style={{
              ...props,
              position: "absolute",
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 100}vh`,
              fontSize: `${Math.random() * 20 + 10}px`, // Random font size between 10px and 30px
              color: randomColor(),
            }}
          >
            {word}
          </animated.div>
        );
      })}
    </div>
  );
};

export default FloatingWords;
