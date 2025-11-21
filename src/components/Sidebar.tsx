import { LayoutDashboard, Map, Truck, Calendar, Settings, HelpCircle, Building2, Users, Car, FolderKanban, PlaneTakeoff } from 'lucide-react';
import { Logo } from './Logo';
import { useStyle } from '../contexts/StyleContext';
import { SidebarModern } from './SidebarModern';
import { motion } from 'motion/react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: any) => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const { styleMode } = useStyle();

  if (styleMode === 'modern') {
    return <SidebarModern currentView={currentView} onNavigate={onNavigate} />;
  }

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
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Logo className="w-8 h-8" />
          <span className="text-gray-900 dark:text-gray-100">Roadshow Manager</span>
        </motion.div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-1">
          {bottomItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={index}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}