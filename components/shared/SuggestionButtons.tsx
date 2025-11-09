import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CommandSuggestion } from "@/types";

interface SuggestionButtonsProps {
  suggestions: CommandSuggestion[];
  onSelect: (index: number) => void;
}

export const SuggestionButtons: React.FC<SuggestionButtonsProps> = ({
  suggestions,
  onSelect,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={suggestion.prompt}
          onClick={() => onSelect(index)}
          className="group bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all cursor-pointer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {suggestion.icon}
          <span>{suggestion.label}</span>
          <motion.div
            className="border-border/50 absolute inset-0 rounded-lg border"
            initial={false}
            animate={{
              opacity: [0, 1],
              scale: [0.98, 1],
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          />
        </motion.button>
      ))}
    </div>
  );
};
