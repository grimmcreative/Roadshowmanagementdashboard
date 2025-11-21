import { LayoutDashboard, Map, Truck, Calendar, Settings, HelpCircle, Building2, Users, Car, FolderKanban, PlaneTakeoff } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: any) => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'roadshows', icon: Truck, label: 'Roadshows' },
    { id: 'projects', icon: FolderKanban, label: 'Projekte' },
    { id: 'companies', icon: Building2, label: 'Unternehmen' },
    { id: 'contacts', icon: Users, label: 'Kontakte' },
    { id: 'trucks', icon: Truck, label: 'Truck Manager' },
    { id: 'vehicles', icon: Car, label: 'Fahrzeuge' },
    { id: 'planning', icon: Calendar, label: 'Planung' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Einstellungen' },
    { icon: HelpCircle, label: 'Hilfe' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <span className="text-gray-900 dark:text-gray-100">Roadshow Manager</span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-1">
          {bottomItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}