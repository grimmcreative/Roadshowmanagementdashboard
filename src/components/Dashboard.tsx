import { Truck, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface DashboardProps {
  onNavigate: (view: 'dashboard' | 'tours' | 'roadshows') => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    { label: 'Aktive Roadshows', value: '12', icon: Truck, change: '+2 diese Woche', color: 'bg-blue-500' },
    { label: 'Geplante Stops', value: '48', icon: MapPin, change: '8 nächste Woche', color: 'bg-green-500' },
    { label: 'Kommende Events', value: '5', icon: Calendar, change: 'in 3 Tagen', color: 'bg-purple-500' },
    { label: 'Gesamt KM', value: '2.847', icon: TrendingUp, change: '+450 km', color: 'bg-orange-500' },
  ];

  const activeRoadshows = [
    { id: 1, name: 'Produkt Launch Tour', truck: 'Truck #A1', progress: 65, stops: '15/23', currentLocation: 'München' },
    { id: 2, name: 'Summer Festival Tour', truck: 'Truck #B2', progress: 40, stops: '8/20', currentLocation: 'Hamburg' },
    { id: 3, name: 'Tech Expo Roadshow', truck: 'Truck #C3', progress: 85, stops: '17/20', currentLocation: 'Frankfurt' },
  ];

  const upcomingStops = [
    { date: '22.11.2025', city: 'Berlin', event: 'Tech Summit', distance: '245 km' },
    { date: '23.11.2025', city: 'Dresden', event: 'Innovation Days', distance: '189 km' },
    { date: '25.11.2025', city: 'Leipzig', event: 'Business Expo', distance: '156 km' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Übersicht über alle Roadshow-Aktivitäten</p>
        </div>
        <Button onClick={() => onNavigate('tours')} className="bg-blue-600 hover:bg-blue-700">
          Neue Tour planen
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="text-gray-900 dark:text-gray-100 mt-1">{stat.value}</p>
                    <p className="text-gray-400 dark:text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aktive Roadshows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeRoadshows.map((roadshow) => (
                <div key={roadshow.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-gray-900 dark:text-gray-100">{roadshow.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-1">{roadshow.truck}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-sm">
                      Aktiv
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Fortschritt</span>
                      <span className="text-gray-900 dark:text-gray-100">{roadshow.stops} Stops</span>
                    </div>
                    <Progress value={roadshow.progress} />
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Aktuell: {roadshow.currentLocation}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kommende Stops</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingStops.map((stop, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <span className="text-blue-600 dark:text-blue-400">{stop.date.split('.')[0]}</span>
                      <span className="text-blue-400 dark:text-blue-500 text-xs">{stop.date.split('.')[1]}</span>
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-gray-100">{stop.city}</h4>
                      <p className="text-gray-500 dark:text-gray-400">{stop.event}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 dark:text-gray-100">{stop.distance}</p>
                    <p className="text-gray-500 dark:text-gray-400">Distanz</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}