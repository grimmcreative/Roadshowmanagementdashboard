import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

export function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date(2026, 1)); // Februar 2026

  // Mock project data
  const project = {
    id: projectId,
    name: 'KENNMETAL 2026',
    company: 'Kennametal Shared Services GmbH',
    status: 'Übersicht / Projekte / Details',
  };

  const events = [
    { id: 1, date: '02.02', day: 'So', type: 'Anreise', location: 'Latimer Str. Stonehouse GL10 3SX, Vereinigtes Königreich', km: 0, status: 'travel' },
    { id: 2, date: '03.01', day: 'Mo', type: 'ganze Tag', location: 'Latimer Str. Stonehouse GL10 3SX, Vereinigtes Königreich', km: 0, status: 'event' },
    { id: 3, date: '09.02', day: 'So', type: 'Anreise', location: 'Bieefield, Vereinigtes Königreich', km: 260, status: 'travel' },
    { id: 4, date: '10.02', day: 'Mo', type: 'ganze Tag', location: 'Bieefield, Vereinigtes Königreich', km: 380, status: 'event' },
    { id: 5, date: '16.02', day: 'So', type: 'Anreise', location: 'Dublin, Irland', km: 0, status: 'travel' },
    { id: 6, date: '17.02', day: 'Mo', type: 'halber Tag', location: 'Dublin, Irland', km: 0, status: 'event' },
    { id: 7, date: '18.02', day: 'Di', type: 'halber Tag', location: 'Dublin, Irland', km: 0, status: 'event' },
    { id: 8, date: '19.02', day: 'Mi', type: 'halber Tag', location: 'Dublin, Irland', km: 0, status: 'event' },
  ];

  const mapLocations = [
    { lat: 51.7, lng: -2.3, label: 'Stonehouse' },
    { lat: 52.0, lng: -0.7, label: 'Bieefield' },
    { lat: 53.3, lng: -6.2, label: 'Dublin' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'travel':
        return 'bg-green-500';
      case 'event':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDay };
  };

  const { daysInMonth, firstDay } = getDaysInMonth(selectedMonth);
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>
          <div>
            <div className="text-gray-500 text-sm">{project.status}</div>
            <h1 className="text-gray-900">{project.name}</h1>
            <p className="text-gray-500">{project.company}</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Neue Aktivität
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar View */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Tour Kalender</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMonth(new Date(selectedMonth.setMonth(selectedMonth.getMonth() - 1)))}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-gray-900 min-w-32 text-center">
                  {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMonth(new Date(selectedMonth.setMonth(selectedMonth.getMonth() + 1)))}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-1">
                {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
                  <div key={day} className="text-center text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: (firstDay === 0 ? 6 : firstDay - 1) }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Calendar days */}
                {calendarDays.map((day) => {
                  const hasEvent = events.some(e => parseInt(e.date.split('.')[0]) === day);
                  const dayEvents = events.filter(e => parseInt(e.date.split('.')[0]) === day);
                  
                  return (
                    <div
                      key={day}
                      className={`aspect-square border border-gray-200 rounded p-1 text-sm ${
                        hasEvent ? 'bg-blue-50 border-blue-300' : 'bg-white'
                      }`}
                    >
                      <div className="text-gray-900">{day}</div>
                      {dayEvents.map((evt, idx) => (
                        <div key={idx} className={`w-2 h-2 rounded-full ${getStatusColor(evt.status)} mt-1`} />
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex gap-4 pt-2 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-gray-600">Anreise</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-gray-600">Event</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map View */}
        <Card>
          <CardHeader>
            <CardTitle>Karte & Satellit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 via-green-50 to-blue-100 rounded-lg overflow-hidden">
              {/* Mock Map with UK/Ireland */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#94a3b8" strokeWidth="0.3" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />
                  
                  {/* Route lines */}
                  <line x1="30%" y1="50%" x2="50%" y2="35%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="50%" y1="35%" x2="25%" y2="25%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>

              {/* Location markers */}
              <div className="absolute top-1/2 left-[30%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative group">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      Stonehouse
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative group">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      Bieefield
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative group">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      Dublin
                    </div>
                  </div>
                </div>
              </div>

              {/* Map text */}
              <div className="absolute top-[45%] left-[45%] text-gray-400 opacity-30 text-xs">Vereinigtes Königreich</div>
              <div className="absolute top-[20%] left-[15%] text-gray-400 opacity-30 text-xs">Irland</div>
            </div>

            <div className="mt-4 text-gray-500">
              <p>3 Standorte • ~640 km gesamt</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Alle Aktivitäten</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-4 text-gray-500 border-b border-gray-200 pb-2">
              <div className="col-span-1">Tag</div>
              <div className="col-span-1">Uhrzeit</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Kilometer</div>
              <div className="col-span-1">Aktivität</div>
              <div className="col-span-5">Adresse</div>
              <div className="col-span-1">Dokumente</div>
            </div>

            {events.map((event) => (
              <div key={event.id} className="grid grid-cols-12 gap-4 py-3 border-b border-gray-100 hover:bg-gray-50 rounded">
                <div className="col-span-1">
                  <div className="flex flex-col">
                    <span className="text-gray-500">{event.day}</span>
                    <span className="text-gray-900">{event.date}</span>
                  </div>
                </div>
                <div className="col-span-1 text-gray-500">---</div>
                <div className="col-span-2">
                  {event.status === 'travel' ? (
                    <Badge className="bg-green-50 text-green-700">Anreise</Badge>
                  ) : (
                    <Badge className="bg-blue-50 text-blue-700">Event</Badge>
                  )}
                </div>
                <div className="col-span-1 text-gray-900">{event.km} km</div>
                <div className="col-span-1 text-gray-900">{event.type}</div>
                <div className="col-span-5 text-gray-900">{event.location}</div>
                <div className="col-span-1">
                  <Badge className="bg-gray-100 text-gray-700">0</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
