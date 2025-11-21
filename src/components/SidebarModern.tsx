import { LayoutDashboard, Truck, Calendar, Settings, HelpCircle, Building2, Users, Car, FolderKanban } from 'lucide-react';
import { Logo } from './Logo';
import { motion } from 'motion/react';

interface SidebarModernProps {
  currentView: string;
  onNavigate: (view: any) => void;
}

export function SidebarModern({ currentView, onNavigate }: SidebarModernProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'roadshows', icon: Truck, label: 'Roadshows' },
    { id: 'projects', icon: FolderKanban, label: 'Projekte' },
    { id: 'companies', icon: Building2, label: 'Unternehmen' },
    { id: 'contacts', icon: Users, label: 'Kontakte' },
    { id: 'trucks', icon: Truck, label: 'Truck Manager' },
    { id: 'vehicles', icon: Car, label: 'Fahrzeuge' },
    { id: 'planning', icon: Calendar, label: 'Planung' },
    { id: 'gantt', icon: Calendar, label: 'Gantt Planung' },
    { id: 'kanban', icon: LayoutDashboard, label: 'Kanban Board' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Einstellungen' },
    { icon: HelpCircle, label: 'Hilfe' },
  ];

  return (
    <aside className="w-72 h-screen bg-white dark:bg-[#1e1e1e] border-r border-gray-100 dark:border-[#2a2a2a] flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100 dark:border-[#2a2a2a]">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Logo className="w-10 h-10" />
          <div>
            <span className="text-gray-900 dark:text-white block font-semibold">Roadshow Manager</span>
            <span className="text-gray-500 dark:text-[#8e8e8e] text-xs">Professional Edition</span>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#8B1A10] to-[#BF2011] text-white shadow-lg shadow-red-900/20'
                    : 'text-gray-700 dark:text-[#b8b8b8] hover:bg-gray-100 dark:hover:bg-[#2a2a2a] hover:text-gray-900 dark:hover:text-white'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-lg' : ''}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Items */}
      <div className="p-4 border-t border-gray-100 dark:border-[#2a2a2a]">
        <div className="space-y-2">
          {bottomItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={index}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 dark:text-[#b8b8b8] hover:bg-gray-100 dark:hover:bg-[#2a2a2a] hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Status Indicator */}
      <motion.div 
        className="p-4 bg-gradient-to-r from-green-500/5 to-green-600/5 border-t border-gray-100 dark:border-[#2a2a2a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          </div>
          <div>
            <p className="text-gray-900 dark:text-white text-sm font-medium">System Online</p>
            <p className="text-gray-500 dark:text-[#8e8e8e] text-xs">All services operational</p>
          </div>
        </div>
      </motion.div>
    </aside>
  );
}