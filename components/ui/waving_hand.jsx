"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

const WavingHand = () => {
  const [isWaving, setIsWaving] = useState(false);
  const [fontSize, setFontSize] = useState("1.5rem"); // Default value

  // Ensure window is accessed only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFontSize(window.innerWidth > 769 ? "1.5rem" : "1.5rem");
    }
  }, []);

  const handleWave = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1000); // Reset animation after 1 second
  };

  return (
    <motion.div
      onClick={handleWave}
      animate={isWaving ? { rotate: [0, -20, 20, -20, 0] } : {}}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{
        display: "inline-block",
        fontSize: fontSize,
        cursor: "pointer",
      }}
    >
      👋
    </motion.div>
  );
};

export default WavingHand;
