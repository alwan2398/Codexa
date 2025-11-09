"use client";

import React, { useState, useCallback, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SendIcon, LoaderIcon, Command, XIcon } from "lucide-react";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useCommandPalette } from "@/hooks/useCommandPalette";

import { COMMAND_SUGGESTIONS } from "@/constant/commandSuggestions";
import { InputContainer } from "../shared/InputContainer";
import { CommandPalette } from "../shared/CommandPalette";
import Textarea from "../shared/Textarea";
import { SuggestionButtons } from "../shared/SuggestionButtons";
import { TypingIndicator } from "../shared/TypingIndicator";
import { LoginDialog } from "../shared/LoginDialog";
import { useAuths } from "@/hooks/useAuths";

const HeaderSection: React.FC = () => (
  <div className="space-y-3 text-center">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="inline-block"
    >
      <h1 className="pb-1 text-3xl font-medium tracking-tight">
        Build something with Codexa
      </h1>
      <motion.div
        className="via-primary/50 h-px bg-gradient-to-r from-transparent to-transparent"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
    </motion.div>
    <motion.p
      className="text-muted-foreground text-sm max-w-md mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      Create apps and websites by writing a few lines of code.
    </motion.p>
  </div>
);

interface InputActionsProps {
  showCommandPalette: boolean;
  onToggleCommandPalette: () => void;
  onSendMessage: () => void;
  isTyping: boolean;
  hasValue: boolean;
  user: any; // atau gunakan tipe yang lebih spesifik jika ada
  isSignedIn: boolean; // Pastikan ini required boolean
}

const InputActions: React.FC<InputActionsProps> = ({
  showCommandPalette,
  onToggleCommandPalette,
  onSendMessage,
  isTyping,
  hasValue,
  user,
  isSignedIn,
}) => (
  <div className="border-border flex items-center justify-between gap-4 border-t p-4">
    <div className="flex items-center gap-3">
      <motion.button
        type="button"
        data-command-button
        onClick={onToggleCommandPalette}
        whileTap={{ scale: 0.94 }}
        className={cn(
          "group text-muted-foreground hover:text-foreground relative rounded-lg p-2 transition-colors cursor-pointer",
          showCommandPalette && "bg-primary/20 text-foreground cursor-pointer"
        )}
      >
        <Command className="h-4 w-4" />
        <motion.span
          className="bg-primary/10 absolute inset-0 rounded-lg opacity-0 transition-opacity group-hover:opacity-100"
          layoutId="button-highlight"
        />
      </motion.button>
    </div>

    <div className="flex items-center gap-3">
      {user && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-medium">{user.credits}</span>
          </div>
          <span>credits</span>
        </div>
      )}

      <motion.button
        type="button"
        onClick={onSendMessage}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        disabled={isTyping || !hasValue}
        className={cn(
          "rounded-lg px-4 py-2 text-sm font-medium transition-all",
          "flex items-center gap-2",
          hasValue
            ? "bg-primary text-primary-foreground shadow-primary/10 shadow-lg cursor-pointer"
            : "bg-muted/50 text-muted-foreground cursor-not-allowed"
        )}
      >
        {isTyping ? (
          <LoaderIcon className="h-4 w-4 animate-[spin_2s_linear_infinite]" />
        ) : (
          <SendIcon className="h-4 w-4" />
        )}
        <span>Send</span>
      </motion.button>
    </div>
  </div>
);

export default function InputUser() {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [inputFocused, setInputFocused] = useState(false);
  const [recentCommand, setRecentCommand] = useState<string | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // Auth hook
  const { user, isLoaded: authLoaded, isSignedIn } = useAuths();

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });

  const mousePosition = useMousePosition();

  const {
    showCommandPalette,
    setShowCommandPalette,
    activeSuggestion,
    setActiveSuggestion,
    commandPaletteRef,
  } = useCommandPalette(value, COMMAND_SUGGESTIONS);

  const handleSendMessage = useCallback(() => {
    // Check if user is authenticated
    if (!isSignedIn) {
      setShowLoginDialog(true);
      return;
    }

    // Check if user has enough credits
    if (user && user.credits <= 0) {
      alert("You don't have enough credits. Please upgrade your plan.");
      return;
    }

    if (value.trim()) {
      startTransition(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setValue("");
          adjustHeight(true);

          // Here you would typically call your API to process the message
          // and deduct credits from the user
        }, 3000);
      });
    }
  }, [value, adjustHeight, isSignedIn, user]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (showCommandPalette) {
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            setActiveSuggestion((prev) =>
              prev < COMMAND_SUGGESTIONS.length - 1 ? prev + 1 : 0
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            setActiveSuggestion((prev) =>
              prev > 0 ? prev - 1 : COMMAND_SUGGESTIONS.length - 1
            );
            break;
          case "Tab":
          case "Enter":
            e.preventDefault();
            if (activeSuggestion >= 0) {
              selectCommandSuggestion(activeSuggestion);
            }
            break;
          case "Escape":
            e.preventDefault();
            setShowCommandPalette(false);
            break;
        }
      } else if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (value.trim()) {
          handleSendMessage();
        }
      }
    },
    [showCommandPalette, activeSuggestion, value, handleSendMessage]
  );

  const removeAttachment = useCallback((index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const selectCommandSuggestion = useCallback((index: number) => {
    const selectedCommand = COMMAND_SUGGESTIONS[index];
    setValue(selectedCommand.prompt + " ");
    setShowCommandPalette(false);

    setRecentCommand(selectedCommand.label);
    setTimeout(() => setRecentCommand(null), 2000);
  }, []);

  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      adjustHeight();
    },
    [adjustHeight]
  );

  return (
    <>
      <InputContainer mousePosition={mousePosition} inputFocused={inputFocused}>
        <div className="relative mx-auto w-full max-w-2xl">
          <motion.div
            className="relative z-10 space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <HeaderSection />

            <motion.div
              className="border-border bg-card/80 relative rounded-2xl border shadow-2xl backdrop-blur-2xl"
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <CommandPalette
                show={showCommandPalette}
                suggestions={COMMAND_SUGGESTIONS}
                activeSuggestion={activeSuggestion}
                onSelect={selectCommandSuggestion}
                paletteRef={commandPaletteRef}
              />

              <div className="p-4">
                <Textarea
                  ref={textareaRef}
                  value={value}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder={
                    inputFocused || value ? "" : "Build something..."
                  }
                  containerClassName="w-full"
                  className={cn(
                    "w-full",
                    "resize-none",
                    "bg-transparent",
                    "border-none",
                    "text-foreground text-sm",
                    "focus:outline-none",
                    "placeholder:text-muted-foreground",
                    "min-h-[60px]"
                  )}
                  style={{ overflow: "hidden" }}
                  showRing={false}
                />
              </div>

              <AnimatePresence>
                {attachments.length > 0 && (
                  <AttachmentsList
                    attachments={attachments}
                    onRemove={removeAttachment}
                  />
                )}
              </AnimatePresence>

              <InputActions
                showCommandPalette={showCommandPalette}
                onToggleCommandPalette={() =>
                  setShowCommandPalette((prev) => !prev)
                }
                onSendMessage={handleSendMessage}
                isTyping={isTyping}
                hasValue={!!value.trim()}
                user={user}
                isSignedIn={isSignedIn}
              />
            </motion.div>

            <SuggestionButtons
              suggestions={COMMAND_SUGGESTIONS}
              onSelect={selectCommandSuggestion}
            />
          </motion.div>
        </div>

        <TypingIndicator show={isTyping} />
      </InputContainer>

      <LoginDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
      />
    </>
  );
}

interface AttachmentsListProps {
  attachments: string[];
  onRemove: (index: number) => void;
}

const AttachmentsList: React.FC<AttachmentsListProps> = ({
  attachments,
  onRemove,
}) => (
  <motion.div
    className="flex flex-wrap gap-2 px-4 pb-3"
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
  >
    {attachments.map((file, index) => (
      <AttachmentItem
        key={index}
        file={file}
        onRemove={() => onRemove(index)}
      />
    ))}
  </motion.div>
);

const AttachmentItem: React.FC<{
  file: string;
  onRemove: () => void;
}> = ({ file, onRemove }) => (
  <motion.div
    className="bg-primary/5 text-muted-foreground flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
  >
    <span>{file}</span>
    <button
      onClick={onRemove}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      <XIcon className="h-3 w-3" />
    </button>
  </motion.div>
);
