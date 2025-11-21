import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { CardModern as Card, CardModernContent as CardContent, CardModernHeader as CardHeader, CardModernTitle as CardTitle } from './ui/card-modern';
import { Button } from './ui/button';
import { motion } from 'motion/react';

export function GanttViewModern() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10)); // November 2025

  const projects = [
    { id: 1, name: 'FENDT 2025', start: 5, duration: 12, color: 'from-blue-500 to-blue-600', progress: 65 },
    { id: 2, name: 'DYSON 2025', start: 3, duration: 15, color: 'from-green-500 to-green-600', progress: 40 },
    { id: 3, name: 'BWT 2025', start: 10, duration: 8, color: 'from-purple-500 to-purple-600', progress: 85 },
    { id: 4, name: 'LIEBHERR 2025', start: 15, duration: 10, color: 'from-orange-500 to-orange-600', progress: 55 },
    { id: 5, name: 'KENNMETAL 2026', start: 20, duration: 7, color: 'from-[#8B1A10] to-[#BF2011]', progress: 20 },
  ];

  const daysInMonth = 30;

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-gray-900 dark:text-white text-3xl">Gantt Planung</h1>
          <p className="text-gray-500 dark:text-[#8e8e8e] mt-2">Zeitliche Übersicht aller Projekte</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            className="p-2.5 bg-gray-100 dark:bg-[#2a2a2a] rounded-xl text-gray-700 dark:text-[#b8b8b8] hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <span className="px-4 text-gray-900 dark:text-white font-medium">November 2025</span>
          <motion.button
            className="p-2.5 bg-gray-100 dark:bg-[#2a2a2a] rounded-xl text-gray-700 dark:text-[#b8b8b8] hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
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
              <div className="flex min-w-max mb-4">
                <div className="w-56 flex-shrink-0 pr-4">
                  <div className="h-12 flex items-center">
                    <span className="text-gray-500 dark:text-[#8e8e8e] font-medium">Projekt</span>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-30 gap-1">
                  {Array.from({ length: daysInMonth }).map((_, i) => (
                    <div key={i} className="text-center text-xs text-gray-500 dark:text-[#8e8e8e] pb-2 font-medium">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Project rows */}
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="flex min-w-max"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div className="w-56 flex-shrink-0 pr-4">
                      <div className="h-14 flex items-center">
                        <div>
                          <p className="text-gray-900 dark:text-white font-semibold">{project.name}</p>
                          <p className="text-xs text-gray-500 dark:text-[#8e8e8e] mt-1">{project.progress}% abgeschlossen</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-30 gap-1 items-center">
                      {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                        const isInRange = dayIndex >= project.start && dayIndex < project.start + project.duration;
                        const progressDays = Math.floor((project.duration * project.progress) / 100);
                        const isCompleted = dayIndex >= project.start && dayIndex < project.start + progressDays;

                        return (
                          <div key={dayIndex} className="h-14 flex items-center">
                            {isInRange && (
                              <motion.div
                                className={`h-10 w-full rounded-xl bg-gradient-to-r ${project.color} ${!isCompleted && 'opacity-30'} relative group cursor-pointer shadow-sm`}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                              >
                                <div className="absolute inset-0 bg-white dark:bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity" />
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
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-[#2a2a2a] flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded" />
                <span className="text-sm text-gray-600 dark:text-[#b8b8b8]">Abgeschlossen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 opacity-30 rounded" />
                <span className="text-sm text-gray-600 dark:text-[#b8b8b8]">Geplant</span>
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
            whileHover={{ y: -4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${project.color} rounded-xl`} />
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold">{project.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-[#8e8e8e]">{project.duration} Tage</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-[#8e8e8e]">Fortschritt</span>
                    <span className="text-gray-900 dark:text-white font-semibold">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-[#3a3a3a] rounded-full h-2.5">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${project.color} rounded-full`}
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
