import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CommandSuggestion } from "@/types";

interface CommandPaletteProps {
  show: boolean;
  suggestions: CommandSuggestion[];
  activeSuggestion: number;
  onSelect: (index: number) => void;
  paletteRef: React.RefObject<HTMLDivElement | null>; // Diubah menjadi null allowed
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  show,
  suggestions,
  activeSuggestion,
  onSelect,
  paletteRef,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={paletteRef} // Ini seharusnya tidak error karena motion.div dapat menerima RefObject dengan null
          className="border-border bg-background/90 absolute right-4 bottom-full left-4 z-50 mb-2 overflow-hidden rounded-lg border shadow-lg backdrop-blur-xl"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.15 }}
        >
          <div className="bg-background py-1">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.prompt}
                className={cn(
                  "flex cursor-pointer items-center gap-2 px-3 py-2 text-xs transition-colors",
                  activeSuggestion === index
                    ? "bg-primary/20 text-foreground"
                    : "text-muted-foreground hover:bg-primary/10"
                )}
                onClick={() => onSelect(index)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
              >
                <div className="text-primary flex h-5 w-5 items-center justify-center">
                  {suggestion.icon}
                </div>
                <div className="font-medium">{suggestion.label}</div>
                <div className="text-muted-foreground ml-1 text-xs">
                  {suggestion.prompt}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
