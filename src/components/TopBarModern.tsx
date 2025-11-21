import { Bell, Search, ChevronDown, Moon, Sun, Palette } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useTheme } from '../contexts/ThemeContext';
import { useStyle } from '../contexts/StyleContext';
import { Logo } from './Logo';
import { motion } from 'motion/react';

export function TopBarModern() {
  const { theme, toggleTheme } = useTheme();
  const { toggleStyleMode } = useStyle();

  return (
    <header className="h-16 bg-white dark:bg-[#1e1e1e] border-b border-gray-100 dark:border-[#2a2a2a] flex items-center justify-between px-6">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-[#8e8e8e]" />
          <input
            type="text"
            placeholder="Suche nach Roadshows, Projekten, Kunden..."
            className="w-full pl-12 pr-4 py-2.5 bg-gray-50 dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#BF2011] placeholder:text-gray-400 dark:placeholder:text-[#8e8e8e] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: theme === 'light' ? '#f3f4f6' : '#2a2a2a' }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleStyleMode}
          className="p-2.5 text-gray-600 dark:text-[#b8b8b8] rounded-xl transition-colors"
          title="Style wechseln"
        >
          <Palette className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: theme === 'light' ? '#f3f4f6' : '#2a2a2a' }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2.5 text-gray-600 dark:text-[#b8b8b8] rounded-xl transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: theme === 'light' ? '#f3f4f6' : '#2a2a2a' }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2.5 text-gray-600 dark:text-[#b8b8b8] rounded-xl transition-colors"
        >
          <Bell className="w-5 h-5" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1"
          >
            <Badge className="w-5 h-5 flex items-center justify-center p-0 bg-gradient-to-r from-[#8B1A10] to-[#BF2011] border-0">
              3
            </Badge>
          </motion.div>
        </motion.button>

        <div className="flex items-center gap-3 pl-3 ml-3 border-l border-gray-200 dark:border-[#2a2a2a]">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <Logo className="w-9 h-9" />
            <div className="flex flex-col">
              <span className="text-gray-900 dark:text-white font-medium">Max Kunde</span>
              <span className="text-xs text-gray-500 dark:text-[#8e8e8e]">Premium Kunde</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 dark:text-[#8e8e8e]" />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
