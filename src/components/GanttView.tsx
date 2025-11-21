import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'motion/react';

export function GanttView() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10)); // November 2025

  const projects = [
    { id: 1, name: 'FENDT 2025', start: 5, duration: 12, color: 'bg-blue-500', progress: 65 },
    { id: 2, name: 'DYSON 2025', start: 3, duration: 15, color: 'bg-green-500', progress: 40 },
    { id: 3, name: 'BWT 2025', start: 10, duration: 8, color: 'bg-purple-500', progress: 85 },
    { id: 4, name: 'LIEBHERR 2025', start: 15, duration: 10, color: 'bg-orange-500', progress: 55 },
    { id: 5, name: 'KENNMETAL 2026', start: 20, duration: 7, color: 'bg-pink-500', progress: 20 },
  ];

  const daysInMonth = 30;
  const weeks = Math.ceil(daysInMonth / 7);

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-gray-900 dark:text-gray-100">Gantt Planung</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Zeitliche Übersicht aller Projekte</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="px-4 text-gray-900 dark:text-gray-100">November 2025</span>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Projekt Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {/* Header with days */}
              <div className="flex min-w-max">
                <div className="w-48 flex-shrink-0 pr-4">
                  <div className="h-12 flex items-center">
                    <span className="text-gray-500 dark:text-gray-400">Projekt</span>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-30 gap-1">
                  {Array.from({ length: daysInMonth }).map((_, i) => (
                    <div key={i} className="text-center text-xs text-gray-500 dark:text-gray-400 pb-2">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Project rows */}
              <div className="space-y-3">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="flex min-w-max"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div className="w-48 flex-shrink-0 pr-4">
                      <div className="h-12 flex items-center">
                        <div>
                          <p className="text-gray-900 dark:text-gray-100">{project.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{project.progress}% abgeschlossen</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-30 gap-1 items-center">
                      {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                        const isInRange = dayIndex >= project.start && dayIndex < project.start + project.duration;
                        const progressDays = Math.floor((project.duration * project.progress) / 100);
                        const isCompleted = dayIndex >= project.start && dayIndex < project.start + progressDays;

                        return (
                          <div key={dayIndex} className="h-12 flex items-center">
                            {isInRange && (
                              <motion.div
                                className={`h-8 w-full rounded ${isCompleted ? project.color : `${project.color} opacity-30`} relative group cursor-pointer`}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                <div className="absolute inset-0 bg-white dark:bg-gray-900 opacity-0 group-hover:opacity-10 rounded transition-opacity" />
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Abgeschlossen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 opacity-30 rounded" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Geplant</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Project Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${project.color} rounded-lg`} />
                  <div>
                    <h3 className="text-gray-900 dark:text-gray-100">{project.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{project.duration} Tage</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Fortschritt</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-full ${project.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
