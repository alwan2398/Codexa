import { useState, useEffect, useRef } from "react";
import { CommandSuggestion } from "@/types";

export function useCommandPalette(
  value: string,
  commandSuggestions: CommandSuggestion[]
) {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const commandPaletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.startsWith("/") && !value.includes(" ")) {
      setShowCommandPalette(true);

      const matchingSuggestionIndex = commandSuggestions.findIndex((cmd) =>
        cmd.prompt.startsWith(value)
      );

      setActiveSuggestion(
        matchingSuggestionIndex >= 0 ? matchingSuggestionIndex : -1
      );
    } else {
      setShowCommandPalette(false);
    }
  }, [value, commandSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const commandButton = document.querySelector("[data-command-button]");

      if (
        commandPaletteRef.current &&
        !commandPaletteRef.current.contains(target) &&
        !commandButton?.contains(target)
      ) {
        setShowCommandPalette(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    showCommandPalette,
    setShowCommandPalette,
    activeSuggestion,
    setActiveSuggestion,
    commandPaletteRef,
  };
}
