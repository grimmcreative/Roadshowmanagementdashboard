import { useState } from 'react';
import { MapPin, Plus, X, Navigation, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MapView } from './MapView';
import { Badge } from './ui/badge';

interface Stop {
  id: string;
  city: string;
  address: string;
  event: string;
  date: string;
}

export function TourPlanner() {
  const [stops, setStops] = useState<Stop[]>([
    { id: '1', city: 'München', address: 'Marienplatz 1', event: 'Start', date: '2025-11-25' },
  ]);

  const [newStop, setNewStop] = useState({
    city: '',
    address: '',
    event: '',
    date: '',
  });

  const addStop = () => {
    if (newStop.city && newStop.address) {
      setStops([
        ...stops,
        {
          id: Date.now().toString(),
          ...newStop,
        },
      ]);
      setNewStop({ city: '', address: '', event: '', date: '' });
    }
  };

  const removeStop = (id: string) => {
    setStops(stops.filter((stop) => stop.id !== id));
  };

  const calculateTotalDistance = () => {
    // Mock calculation - in real app would use maps API
    return stops.length > 1 ? (stops.length - 1) * 150 + Math.floor(Math.random() * 100) : 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Tour Planer</h1>
          <p className="text-gray-500 mt-1">Planen Sie Ihre Roadshow-Route mit allen Stops</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Tour speichern
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tour Informationen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Tour Name</Label>
                <Input placeholder="z.B. Sommer Festival Tour" className="mt-1" />
              </div>
              <div>
                <Label>Truck auswählen</Label>
                <select className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Truck #A1</option>
                  <option>Truck #B2</option>
                  <option>Truck #C3</option>
                </select>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500">Gesamt Stops:</span>
                  <span className="text-gray-900">{stops.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Geschätzte KM:</span>
                  <span className="text-gray-900">{calculateTotalDistance()} km</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Neuer Stop hinzufügen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label>Stadt</Label>
                <Input
                  placeholder="z.B. Berlin"
                  value={newStop.city}
                  onChange={(e) => setNewStop({ ...newStop, city: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Adresse</Label>
                <Input
                  placeholder="z.B. Alexanderplatz 1"
                  value={newStop.address}
                  onChange={(e) => setNewStop({ ...newStop, address: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Event Name</Label>
                <Input
                  placeholder="z.B. Tech Expo"
                  value={newStop.event}
                  onChange={(e) => setNewStop({ ...newStop, event: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Datum</Label>
                <Input
                  type="date"
                  value={newStop.date}
                  onChange={(e) => setNewStop({ ...newStop, date: e.target.value })}
                  className="mt-1"
                />
              </div>
              <Button onClick={addStop} className="w-full bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Stop hinzufügen
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Route Übersicht</CardTitle>
            </CardHeader>
            <CardContent>
              <MapView stops={stops} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stop Liste ({stops.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stops.map((stop, index) => (
                  <div
                    key={stop.id}
                    className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-gray-900">{stop.city}</h4>
                          <p className="text-gray-500 mt-1">{stop.address}</p>
                        </div>
                        {index === 0 && (
                          <Badge className="bg-green-50 text-green-700">Start</Badge>
                        )}
                        {index === stops.length - 1 && index !== 0 && (
                          <Badge className="bg-red-50 text-red-700">Ziel</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        {stop.event && (
                          <span className="text-gray-500 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {stop.event}
                          </span>
                        )}
                        {stop.date && (
                          <span className="text-gray-500 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(stop.date).toLocaleDateString('de-DE')}
                          </span>
                        )}
                      </div>
                    </div>
                    {stops.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStop(stop.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {stops.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Noch keine Stops hinzugefügt
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
