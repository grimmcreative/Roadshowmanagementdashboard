import { Plus } from 'lucide-react';
import { CardModern as Card, CardModernContent as CardContent, CardModernHeader as CardHeader, CardModernTitle as CardTitle } from './ui/card-modern';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

export function KanbanViewModern() {
  const columns = [
    {
      id: 'todo',
      title: 'Zu erledigen',
      color: 'from-gray-500 to-gray-600',
      tasks: [
        { id: 1, title: 'KENNMETAL 2026 Vorbereitung', project: 'KENNMETAL', priority: 'high', assignee: 'MK' },
        { id: 2, title: 'Truck Wartung planen', project: 'Allgemein', priority: 'medium', assignee: 'JS' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Bearbeitung',
      color: 'from-blue-500 to-blue-600',
      tasks: [
        { id: 3, title: 'FENDT 2025 Tour München', project: 'FENDT', priority: 'high', assignee: 'MK' },
        { id: 4, title: 'BWT Stand-Aufbau', project: 'BWT', priority: 'high', assignee: 'TW' },
        { id: 5, title: 'Route Optimierung Berlin', project: 'DYSON', priority: 'medium', assignee: 'AM' },
      ],
    },
    {
      id: 'review',
      title: 'Review',
      color: 'from-yellow-500 to-yellow-600',
      tasks: [
        { id: 6, title: 'LIEBHERR Event Abschluss', project: 'LIEBHERR', priority: 'medium', assignee: 'SF' },
        { id: 7, title: 'Dokumentation Q3', project: 'Allgemein', priority: 'low', assignee: 'MB' },
      ],
    },
    {
      id: 'done',
      title: 'Erledigt',
      color: 'from-green-500 to-green-600',
      tasks: [
        { id: 8, title: 'DYSON Hamburg Setup', project: 'DYSON', priority: 'high', assignee: 'MK' },
        { id: 9, title: 'Truck #A1 Inspektion', project: 'Allgemein', priority: 'high', assignee: 'JS' },
        { id: 10, title: 'BWT Materialbestellung', project: 'BWT', priority: 'medium', assignee: 'TW' },
      ],
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-600 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'bg-green-500/10 text-green-600 dark:text-green-400';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-gray-900 dark:text-white text-3xl">Kanban Board</h1>
          <p className="text-gray-500 dark:text-[#8e8e8e] mt-2">Aufgaben und Projekte im Überblick</p>
        </div>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-[#8B1A10] to-[#BF2011] text-white rounded-xl font-medium shadow-lg shadow-red-900/20 hover:shadow-xl hover:shadow-red-900/30 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          Neue Aufgabe
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column, columnIndex) => (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: columnIndex * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 bg-gradient-to-r ${column.color} rounded-full`} />
                    <CardTitle className="text-sm">{column.title}</CardTitle>
                  </div>
                  <Badge className="bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-[#b8b8b8] text-xs">
                    {column.tasks.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {column.tasks.map((task, taskIndex) => (
                    <motion.div
                      key={task.id}
                      className="p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-[#333333] transition-all shadow-sm hover:shadow-md"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + columnIndex * 0.1 + taskIndex * 0.05 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                      <h4 className="text-gray-900 dark:text-white font-semibold mb-3">{task.title}</h4>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500 dark:text-[#8e8e8e]">{task.project}</span>
                        <Badge className={`text-xs ${getPriorityColor(task.priority)} border-0`}>
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                            {task.assignee}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <motion.button
                    className="w-full p-4 border-2 border-dashed border-gray-200 dark:border-[#2a2a2a] rounded-xl text-gray-500 dark:text-[#8e8e8e] hover:border-[#BF2011] hover:text-[#BF2011] transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(191, 32, 17, 0.05)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus className="w-4 h-4" />
                    <span className="font-medium">Aufgabe hinzufügen</span>
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Gesamt Aufgaben', value: columns.reduce((acc, col) => acc + col.tasks.length, 0), delay: 0.5 },
          { label: 'In Bearbeitung', value: columns.find(c => c.id === 'in-progress')?.tasks.length || 0, delay: 0.6 },
          { label: 'Erledigt', value: columns.find(c => c.id === 'done')?.tasks.length || 0, delay: 0.7 },
          { label: 'Hohe Priorität', value: columns.reduce((acc, col) => acc + col.tasks.filter(t => t.priority === 'high').length, 0), delay: 0.8 },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stat.delay }}
            whileHover={{ y: -4 }}
          >
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500 dark:text-[#8e8e8e] text-sm mb-2">{stat.label}</p>
                <p className="text-gray-900 dark:text-white text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
