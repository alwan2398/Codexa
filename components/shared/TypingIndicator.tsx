import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const TypingDots: React.FC = () => {
  return (
    <div className="ml-1 flex items-center">
      {[1, 2, 3].map((dot) => (
        <motion.div
          key={dot}
          className="bg-primary mx-0.5 h-1.5 w-1.5 rounded-full"
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: [0.3, 0.9, 0.3],
            scale: [0.85, 1.1, 0.85],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: dot * 0.15,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: "0 0 4px rgba(255, 255, 255, 0.3)",
          }}
        />
      ))}
    </div>
  );
};

interface TypingIndicatorProps {
  show: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ show }) => {
  if (!show) return null;

  return (
    <motion.div
      className="border-border bg-background/80 fixed bottom-8 mx-auto -translate-x-1/2 transform rounded-full border px-4 py-2 shadow-lg backdrop-blur-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 flex h-7 w-8 items-center justify-center rounded-full text-center">
          <Sparkles className="text-primary h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <span>Thinking</span>
          <TypingDots />
        </div>
      </div>
    </motion.div>
  );
};
