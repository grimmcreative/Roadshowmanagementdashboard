import { Bell, Search, ChevronDown, Moon, Sun, Palette, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useTheme } from '../contexts/ThemeContext';
import { useStyle } from '../contexts/StyleContext';
import { Logo } from './Logo';
import { motion } from 'motion/react';
import { TopBarModern } from './TopBarModern';

interface TopBarProps {
  onMenuClick?: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const { styleMode, toggleStyleMode } = useStyle();

  if (styleMode === 'modern') {
    return <TopBarModern onMenuClick={onMenuClick} />;
  }

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Roadshows, Touren oder Kunden suchen..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>
        {/* Mobile Search Icon */}
        <button className="sm:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <Search className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleStyleMode}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title={`${styleMode === 'classic' ? 'Modern' : 'Classic'} Style`}
        >
          <Palette className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500">
            3
          </Badge>
        </motion.button>

        {/* Desktop User Profile */}
        <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
          <Logo className="w-8 h-8" />
          <div className="hidden lg:flex flex-col">
            <span className="text-gray-900 dark:text-gray-100">Max Kunde</span>
            <span className="text-gray-500 dark:text-gray-400">Premium Kunde</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </div>

        {/* Mobile User Avatar */}
        <div className="md:hidden pl-2 border-l border-gray-200 dark:border-gray-700">
          <Logo className="w-8 h-8" />
        </div>
      </div>
    </header>
  );
}