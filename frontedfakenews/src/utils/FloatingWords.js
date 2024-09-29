// FloatingWords.js
'use client'
import React from 'react';
import { useSpring, animated } from 'react-spring';

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

const randomRadius = () => Math.random() * 100 + 50; // Random radius between 50px and 150px
const randomPosition = () => ({ top: Math.random() * 80 + 10, left: Math.random() * 80 + 10 }); // Random position (in percentage)

const FloatingWords = () => {
  return (
    <div className="floating-words relative w-full h-screen overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #1e1e2f, #3f3473)', // Dark to dark blue-violet gradient
         }}>
      {words.map((word, index) => {
        const radius = randomRadius(); // Different radius for each word
        const speed = Math.random() * 10000 + 5000; // Random speed between 5s and 15s
        const startPos = randomPosition(); // Random start position for each word

        const props = useSpring({
          loop: true,
          from: { angle: 0 },
          to: { angle: 2 * Math.PI }, // Full rotation (0 to 360 degrees)
          config: { duration: speed },
        });

        return (
          <animated.div
            key={index}
            style={{
              position: 'absolute',
              left: `${startPos.left}%`, // Random start position on the screen
              top: `${startPos.top}%`,  // Random start position on the screen
              fontSize: `${Math.random() * 30 + 20}px`, // Random font size between 20px and 50px
              color: randomColor(),
              textShadow: `0px 0px 10px ${randomColor()}, 0px 0px 20px ${randomColor()}`, // Glowing shadow effect
              transform: props.angle.to(a => {
                // Calculate x and y positions using cos and sin for circular motion
                const x = radius * Math.cos(a);
                const y = radius * Math.sin(a);
                return `translate(${x}px, ${y}px)`;
              }),
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
