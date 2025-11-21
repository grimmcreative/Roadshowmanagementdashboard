import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function PlanningView() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

  const events = [
    { id: 1, date: 2, project: 'FENDT 2025', truck: 'PROMO SANH PN-22', type: 'event', color: 'bg-blue-500' },
    { id: 2, date: 5, project: 'BWT 2025', truck: 'FUTURA Black 1-45', type: 'event', color: 'bg-green-500' },
    { id: 3, date: 10, project: 'DYSON 2025', truck: 'SPACE 7 GE-003', type: 'event', color: 'bg-purple-500' },
    { id: 4, date: 15, project: 'Wartung', truck: 'PROMO SANH PN-3', type: 'maintenance', color: 'bg-orange-500' },
    { id: 5, date: 18, project: 'LIEBHERR 2025', truck: 'SPACE 3 GE-001', type: 'event', color: 'bg-pink-500' },
    { id: 6, date: 22, project: 'CST 2025', truck: 'PROMO SANH PN-21', type: 'event', color: 'bg-indigo-500' },
    { id: 7, date: 25, project: 'KENNMETAL 2026', truck: 'TBD', type: 'planned', color: 'bg-yellow-500' },
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Planung</h1>
          <p className="text-gray-500 mt-1">Terminplanung und Kalenderübersicht</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Neuer Termin
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Planungskalender
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={prevMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-gray-900 min-w-40 text-center">
                {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
              </span>
              <Button variant="ghost" size="sm" onClick={nextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'].map((day) => (
              <div key={day} className="text-center text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: (firstDay === 0 ? 6 : firstDay - 1) }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square border border-gray-100 rounded-lg bg-gray-50" />
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
                <div
                  key={day}
                  className={`aspect-square border rounded-lg p-2 hover:border-blue-300 transition-colors ${
                    isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className={`text-sm mb-1 ${isToday ? 'text-blue-700' : 'text-gray-900'}`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`${event.color} text-white text-xs px-1 py-0.5 rounded truncate`}
                        title={event.project}
                      >
                        {event.project}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500">+{dayEvents.length - 2}</div>
                    )}
                  </div>
                </div>
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
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-12 ${event.color} rounded`} />
                  <div>
                    <h4 className="text-gray-900">{event.project}</h4>
                    <p className="text-gray-500">{event.truck}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900">
                    {event.date}. {monthNames[selectedMonth.getMonth()]}
                  </p>
                  {event.type === 'event' && (
                    <Badge className="mt-1 bg-blue-50 text-blue-700">Event</Badge>
                  )}
                  {event.type === 'maintenance' && (
                    <Badge className="mt-1 bg-orange-50 text-orange-700">Wartung</Badge>
                  )}
                  {event.type === 'planned' && (
                    <Badge className="mt-1 bg-yellow-50 text-yellow-700">Geplant</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}