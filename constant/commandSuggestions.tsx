import React from "react";
import { CommandSuggestion } from "@/types";
import { ImageIcon, LayoutDashboard, Globe, Code2 } from "lucide-react";

export const COMMAND_SUGGESTIONS: CommandSuggestion[] = [
  {
    icon: <ImageIcon className="h-4 w-4" />,
    label: "Clone UI",
    prompt:
      "Buatkan clone UI dari website Apple.com menggunakan gaya modern dengan Tailwind CSS dan komponen yang responsif.",
  },
  {
    icon: <LayoutDashboard className="h-4 w-4" />,
    label: "Generate Dashboard",
    prompt:
      "Buatkan desain dashboard admin dengan tampilan clean, sidebar navigasi, grafik statistik, dan tabel data pengguna.",
  },
  {
    icon: <Globe className="h-4 w-4" />,
    label: "Landing Page",
    prompt:
      "Buatkan landing page startup AI dengan hero section, fitur utama, testimoni, dan tombol CTA modern menggunakan Tailwind.",
  },
  {
    icon: <Code2 className="h-4 w-4" />,
    label: "Component Builder",
    prompt:
      "Buatkan komponen form login dengan desain profesional, field email dan password, tombol login, serta validasi dasar.",
  },
];
