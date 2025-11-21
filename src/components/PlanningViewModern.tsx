import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { CardModern as Card, CardModernContent as CardContent, CardModernHeader as CardHeader, CardModernTitle as CardTitle } from './ui/card-modern';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

export function PlanningViewModern() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

  const events = [
    { id: 1, date: 2, project: 'FENDT 2025', truck: 'PROMO SANH PN-22', type: 'event', color: 'from-blue-500 to-blue-600' },
    { id: 2, date: 5, project: 'BWT 2025', truck: 'FUTURA Black 1-45', type: 'event', color: 'from-green-500 to-green-600' },
    { id: 3, date: 10, project: 'DYSON 2025', truck: 'SPACE 7 GE-003', type: 'event', color: 'from-purple-500 to-purple-600' },
    { id: 4, date: 15, project: 'Wartung', truck: 'PROMO SANH PN-3', type: 'maintenance', color: 'from-orange-500 to-orange-600' },
    { id: 5, date: 18, project: 'LIEBHERR 2025', truck: 'SPACE 3 GE-001', type: 'event', color: 'from-pink-500 to-pink-600' },
    { id: 6, date: 22, project: 'CST 2025', truck: 'PROMO SANH PN-21', type: 'event', color: 'from-indigo-500 to-indigo-600' },
    { id: 7, date: 25, project: 'KENNMETAL 2026', truck: 'TBD', type: 'planned', color: 'from-yellow-500 to-yellow-600' },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDay };
  };

  const { daysInMonth, firstDay } = getDaysInMonth(selectedMonth);
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getEventsForDay = (day: number) => {
    return events.filter(event => event.date === day);
  };

  const nextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1));
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-gray-900 dark:text-white text-3xl">Planung</h1>
          <p className="text-gray-500 dark:text-[#8e8e8e] mt-2">Terminplanung und Kalenderübersicht</p>
        </div>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-[#8B1A10] to-[#BF2011] text-white rounded-xl font-medium shadow-lg shadow-red-900/20 hover:shadow-xl hover:shadow-red-900/30 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          Neuer Termin
        </motion.button>
      </motion.div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Planungskalender
            </CardTitle>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={prevMonth}
                className="p-2.5 bg-gray-100 dark:bg-[#2a2a2a] rounded-xl text-gray-700 dark:text-[#b8b8b8] hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <span className="text-gray-900 dark:text-white min-w-40 text-center font-semibold">
                {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
              </span>
              <motion.button
                onClick={nextMonth}
                className="p-2.5 bg-gray-100 dark:bg-[#2a2a2a] rounded-xl text-gray-700 dark:text-[#b8b8b8] hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
              <div key={day} className="text-center text-gray-500 dark:text-[#8e8e8e] py-2 font-semibold">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: (firstDay === 0 ? 6 : firstDay - 1) }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square rounded-xl bg-gray-50 dark:bg-[#2a2a2a]" />
            ))}

            {/* Calendar days */}
            {calendarDays.map((day) => {
              const dayEvents = getEventsForDay(day);
              const today = new Date();
              const isToday = 
                day === today.getDate() &&
                selectedMonth.getMonth() === today.getMonth() &&
                selectedMonth.getFullYear() === today.getFullYear();

              return (
                <motion.div
                  key={day}
                  className={`aspect-square rounded-xl p-3 cursor-pointer transition-all ${
                    isToday 
                      ? 'bg-gradient-to-br from-[#8B1A10] to-[#BF2011] text-white' 
                      : 'bg-white dark:bg-[#1e1e1e] hover:bg-gray-50 dark:hover:bg-[#2a2a2a]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`font-semibold mb-1 ${isToday ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`bg-gradient-to-r ${event.color} text-white text-xs px-1.5 py-0.5 rounded truncate`}
                        title={event.project}
                      >
                        {event.project}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className={`text-xs ${isToday ? 'text-white' : 'text-gray-500 dark:text-[#8e8e8e]'}`}>
                        +{dayEvents.length - 2}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Anstehende Termine</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl hover:bg-gray-100 dark:hover:bg-[#333333] transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-16 bg-gradient-to-b ${event.color} rounded-full`} />
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-semibold">{event.project}</h4>
                    <p className="text-gray-500 dark:text-[#8e8e8e] text-sm mt-1">{event.truck}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {event.date}. {monthNames[selectedMonth.getMonth()]}
                  </p>
                  {event.type === 'event' && (
                    <Badge className="mt-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0">Event</Badge>
                  )}
                  {event.type === 'maintenance' && (
                    <Badge className="mt-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0">Wartung</Badge>
                  )}
                  {event.type === 'planned' && (
                    <Badge className="mt-2 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-0">Geplant</Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
