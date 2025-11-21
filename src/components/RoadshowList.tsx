import { useState } from 'react';
import { Truck, MapPin, Calendar, MoreVertical, Plus, Search } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useStyle } from '../contexts/StyleContext';
import { RoadshowListModern } from './RoadshowListModern';

export function RoadshowList() {
  const { styleMode } = useStyle();
  const [searchTerm, setSearchTerm] = useState('');

  if (styleMode === 'modern') {
    return <RoadshowListModern />;
  }

  const roadshows = [
    {
      id: 1,
      name: 'Produkt Launch Tour',
      truck: 'Truck #A1',
      status: 'active',
      progress: 65,
      startDate: '15.11.2025',
      endDate: '30.11.2025',
      stops: 23,
      completedStops: 15,
      totalKm: 1450,
      currentLocation: 'München',
    },
    {
      id: 2,
      name: 'Summer Festival Tour',
      truck: 'Truck #B2',
      status: 'active',
      progress: 40,
      startDate: '18.11.2025',
      endDate: '05.12.2025',
      stops: 20,
      completedStops: 8,
      totalKm: 1120,
      currentLocation: 'Hamburg',
    },
    {
      id: 3,
      name: 'Tech Expo Roadshow',
      truck: 'Truck #C3',
      status: 'active',
      progress: 85,
      startDate: '10.11.2025',
      endDate: '25.11.2025',
      stops: 20,
      completedStops: 17,
      totalKm: 980,
      currentLocation: 'Frankfurt',
    },
    {
      id: 4,
      name: 'Winter Campaign',
      truck: 'Truck #A1',
      status: 'planned',
      progress: 0,
      startDate: '01.12.2025',
      endDate: '20.12.2025',
      stops: 15,
      completedStops: 0,
      totalKm: 750,
      currentLocation: '-',
    },
    {
      id: 5,
      name: 'Food Festival Tour',
      truck: 'Truck #B2',
      status: 'completed',
      progress: 100,
      startDate: '01.10.2025',
      endDate: '15.10.2025',
      stops: 12,
      completedStops: 12,
      totalKm: 650,
      currentLocation: '-',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0">Aktiv</Badge>;
      case 'planned':
        return <Badge className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-0">Geplant</Badge>;
      case 'completed':
        return <Badge className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-0">Abgeschlossen</Badge>;
      default:
        return null;
    }
  };

  const filteredRoadshows = roadshows.filter(
    (roadshow) =>
      roadshow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      roadshow.truck.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-gray-100">Roadshows</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Verwalten Sie alle Ihre Roadshow-Kampagnen</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Neue Roadshow
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <Input
              placeholder="Roadshows durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRoadshows.map((roadshow) => (
          <Card key={roadshow.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-gray-100">{roadshow.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{roadshow.truck}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(roadshow.status)}
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Start</p>
                    <p className="text-gray-900 dark:text-gray-100 mt-1">{roadshow.startDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Ende</p>
                    <p className="text-gray-900 dark:text-gray-100 mt-1">{roadshow.endDate}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {roadshow.completedStops}/{roadshow.stops} Stops
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{roadshow.totalKm} km</span>
                  </div>
                </div>

                {roadshow.status === 'active' && (
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-500 dark:text-gray-400">Aktueller Standort</span>
                      <span className="text-gray-900 dark:text-gray-100">{roadshow.currentLocation}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 dark:bg-blue-500 transition-all"
                        style={{ width: `${roadshow.progress}%` }}
                      />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{roadshow.progress}% abgeschlossen</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" className="flex-1">
                  Details
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Route anzeigen
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}