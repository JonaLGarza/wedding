import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";

export const ThemeToggle = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "inline-flex items-center justify-center rounded-full w-12 h-12 transition-all duration-200",
        "bg-transparent border-2 border-[var(--accent)] hover:bg-[var(--muted)]",
        "text-[var(--accent)] hover:text-[var(--accent-foreground)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2",
        "focus:ring-offset-[var(--background)]",
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
