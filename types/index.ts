export interface NavItem {
  name: string;
  href: string;
}

export interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

export interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  showRing?: boolean;
}

export interface CommandSuggestion {
  icon: React.ReactNode;
  label: string;
  prompt: string;
}

export interface MousePosition {
  x: number;
  y: number;
}
