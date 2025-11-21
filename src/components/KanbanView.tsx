import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

export function KanbanView() {
  const columns = [
    {
      id: 'todo',
      title: 'Zu erledigen',
      color: 'bg-gray-500',
      tasks: [
        { id: 1, title: 'KENNMETAL 2026 Vorbereitung', project: 'KENNMETAL', priority: 'high', assignee: 'MK' },
        { id: 2, title: 'Truck Wartung planen', project: 'Allgemein', priority: 'medium', assignee: 'JS' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Bearbeitung',
      color: 'bg-blue-500',
      tasks: [
        { id: 3, title: 'FENDT 2025 Tour München', project: 'FENDT', priority: 'high', assignee: 'MK' },
        { id: 4, title: 'BWT Stand-Aufbau', project: 'BWT', priority: 'high', assignee: 'TW' },
        { id: 5, title: 'Route Optimierung Berlin', project: 'DYSON', priority: 'medium', assignee: 'AM' },
      ],
    },
    {
      id: 'review',
      title: 'Review',
      color: 'bg-yellow-500',
      tasks: [
        { id: 6, title: 'LIEBHERR Event Abschluss', project: 'LIEBHERR', priority: 'medium', assignee: 'SF' },
        { id: 7, title: 'Dokumentation Q3', project: 'Allgemein', priority: 'low', assignee: 'MB' },
      ],
    },
    {
      id: 'done',
      title: 'Erledigt',
      color: 'bg-green-500',
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
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
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
          <h1 className="text-gray-900 dark:text-gray-100">Kanban Board</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Aufgaben und Projekte im Überblick</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Neue Aufgabe
        </Button>
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
                    <div className={`w-3 h-3 ${column.color} rounded-full`} />
                    <CardTitle className="text-sm">{column.title}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {column.tasks.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {column.tasks.map((task, taskIndex) => (
                    <motion.div
                      key={task.id}
                      className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + columnIndex * 0.1 + taskIndex * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                      <h4 className="text-gray-900 dark:text-gray-100 mb-2">{task.title}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{task.project}</span>
                        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                            {task.assignee}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <motion.button
                    className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Aufgabe hinzufügen</span>
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500 dark:text-gray-400">Gesamt Aufgaben</p>
              <p className="text-gray-900 dark:text-gray-100 mt-1">
                {columns.reduce((acc, col) => acc + col.tasks.length, 0)}
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500 dark:text-gray-400">In Bearbeitung</p>
              <p className="text-gray-900 dark:text-gray-100 mt-1">
                {columns.find(c => c.id === 'in-progress')?.tasks.length || 0}
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500 dark:text-gray-400">Erledigt</p>
              <p className="text-gray-900 dark:text-gray-100 mt-1">
                {columns.find(c => c.id === 'done')?.tasks.length || 0}
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500 dark:text-gray-400">Hohe Priorität</p>
              <p className="text-gray-900 dark:text-gray-100 mt-1">
                {columns.reduce((acc, col) => acc + col.tasks.filter(t => t.priority === 'high').length, 0)}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
