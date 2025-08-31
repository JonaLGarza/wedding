import { HTMLAttributes, useState } from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../atoms/Button/Button";
import { Menu, X } from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

interface NavigationProps extends HTMLAttributes<HTMLDivElement> {
  items: NavigationItem[];
  onNavigate: (id: string) => void;
}

export const Navigation = ({
  items,
  onNavigate,
  className,
  ...props
}: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className={cn("sticky top-0 z-40 bg-[var(--card)]/95 backdrop-blur-sm border-b border-[var(--border)]", className)} {...props}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-script text-[var(--accent)]">Jonathan & Genesis</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className="text-[#444] hover:text-[var(--accent)] transition-colors font-medium text-base"
              >
                {item.label}
              </button>
            ))}
            
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[var(--border)]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className="block w-full text-left px-3 py-2 text-[#444] hover:text-[var(--accent)] hover:bg-[var(--muted)]/20 rounded-md transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
