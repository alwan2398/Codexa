"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { navItems } from "@/constant";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  // Use Clerk's useUser hook to check authentication status
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    scrolled: {
      backdropFilter: "blur(20px)",
      backgroundColor:
        theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  // User button component for desktop
  const DesktopUserSection = () => {
    if (!isLoaded) {
      // Show loading state or nothing while checking auth status
      return null;
    }

    return isSignedIn ? (
      <motion.div
        className="flex items-center space-x-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              rootBox: "h-8 w-8",
              avatarBox: "w-8 h-8",
            },
          }}
        />
      </motion.div>
    ) : (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
        <SignInButton mode="modal" forceRedirectUrl={"/workspaces"}>
          <Button className="rounded-lg bg-gradient-to-r from-violet-500 to-violet-700 py-2.5 font-medium text-white transition-all duration-200 hover:shadow-lg cursor-pointer">
            Get Started
          </Button>
        </SignInButton>
      </motion.div>
    );
  };

  // User button component for mobile
  const MobileUserSection = () => {
    if (!isLoaded) {
      return null;
    }

    return isSignedIn ? (
      <motion.div
        className="flex items-center justify-center space-x-4 py-3"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              rootBox: "h-8 w-8",
              avatarBox: "w-8 h-8",
            },
          }}
        />
        <span className="text-foreground font-medium">
          {user?.firstName || user?.username || "My Account"}
        </span>
      </motion.div>
    ) : (
      <SignInButton mode="modal" forceRedirectUrl={"/workspaces"}>
        <Button
          className="block w-full rounded-lg bg-gradient-to-r from-violet-500 to-violet-700 py-2.5 text-center font-medium text-white transition-all duration-200 hover:shadow-lg cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Get Started
        </Button>
      </SignInButton>
    );
  };

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      variants={headerVariants}
      initial="initial"
      animate={isScrolled ? "scrolled" : "animate"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        backgroundColor: isScrolled
          ? theme === "dark"
            ? "rgba(0, 0, 0, 0.8)"
            : "rgba(255, 255, 255, 0.8)"
          : "transparent",
        boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              prefetch={false}
              href="/"
              className="flex items-center space-x-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-700">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-violet-500 to-violet-700 bg-clip-text text-xl font-bold text-transparent">
                Codexa
              </span>
            </Link>
          </motion.div>

          <nav className="hidden items-center space-x-8 lg:flex">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <Link
                  prefetch={false}
                  href={item.href}
                  className="text-foreground flex items-center space-x-1 font-medium transition-colors duration-200 hover:text-violet-500 hover:font-bold"
                >
                  <span>{item.name}</span>
                </Link>
              </div>
            ))}
          </nav>

          <div className="hidden items-center space-x-4 lg:flex">
            <DesktopUserSection />
          </div>

          <motion.button
            className="hover:bg-muted rounded-lg p-2 transition-colors duration-200 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="overflow-hidden lg:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="border-border bg-background/95 mt-4 space-y-2 rounded-xl border py-4 shadow-xl backdrop-blur-lg">
                {navItems.map((item) => (
                  <Link
                    prefetch={false}
                    key={item.name}
                    href={item.href}
                    className="text-foreground hover:bg-muted block px-4 py-3 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="space-y-2 px-4 py-2">
                  <MobileUserSection />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
