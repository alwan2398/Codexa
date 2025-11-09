import React from "react";
import { motion } from "framer-motion";

interface InputContainerProps {
  children: React.ReactNode;
  mousePosition: { x: number; y: number };
  inputFocused: boolean;
}

export const InputContainer: React.FC<InputContainerProps> = ({
  children,
  mousePosition,
  inputFocused,
}) => {
  return (
    <div className="flex w-screen overflow-x-hidden max-w-7xl mx-auto">
      <div className="text-foreground relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-transparent p-6">
        {/* Background Effects */}
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <div className="bg-primary/10 absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full mix-blend-normal blur-[128px] filter" />
          <div className="bg-secondary/10 absolute right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full mix-blend-normal blur-[128px] filter delay-700" />
          <div className="bg-primary/10 absolute top-1/4 right-1/3 h-64 w-64 animate-pulse rounded-full mix-blend-normal blur-[96px] filter delay-1000" />
        </div>

        {children}

        {/* Mouse Follow Effect */}
        {inputFocused && (
          <motion.div
            className="from-primary via-primary/80 to-secondary pointer-events-none fixed z-0 h-[50rem] w-[50rem] rounded-full bg-gradient-to-r opacity-[0.02] blur-[96px]"
            animate={{
              x: mousePosition.x - 400,
              y: mousePosition.y - 400,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 150,
              mass: 0.5,
            }}
          />
        )}
      </div>
    </div>
  );
};
