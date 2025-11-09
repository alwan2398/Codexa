import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SignIn } from "@clerk/nextjs";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[460px] bg-[#0B0B14] border border-gray-800 text-white rounded-2xl flex flex-col items-center justify-center py-6">
        <DialogHeader className="space-y-2 text-center">
          <DialogTitle className="text-lg font-semibold text-white">
            Sign In Required
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Please sign in to send messages and access all features.
          </DialogDescription>
        </DialogHeader>

        {/* Wrapper untuk form Clerk */}
        <div className="flex justify-center items-center w-full mt-4">
          <SignIn routing="hash" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
