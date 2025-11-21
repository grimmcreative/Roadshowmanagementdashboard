import { Truck, Calendar, MapPin, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function TruckManager() {
  const trucks = [
    { id: 1, name: 'PROMO SANH PN-22', type: 'Promo Truck', status: 'active', project: 'FENDT 2025', location: 'München', nextService: '15.12.2025', km: 45000 },
    { id: 2, name: 'SPACE 7 GE-003', type: 'Space Truck', status: 'active', project: 'DYSON 2025', location: 'Hamburg', nextService: '20.12.2025', km: 32000 },
    { id: 3, name: 'FUTURA Black 1-45', type: 'Futura Truck', status: 'active', project: 'BWT 2025', location: 'Frankfurt', nextService: '10.01.2026', km: 51000 },
    { id: 4, name: 'PROMO SANH PN-21', type: 'Promo Truck', status: 'active', project: 'CST 2025', location: 'Stuttgart', nextService: '05.01.2026', km: 38000 },
    { id: 5, name: 'FUTURA SANH 009', type: 'Futura Truck', status: 'available', project: '---', location: 'Depot Berlin', nextService: '25.11.2025', km: 28000 },
    { id: 6, name: 'PROMO SANH PN-3', type: 'Promo Truck', status: 'maintenance', project: '---', location: 'Werkstatt München', nextService: '22.11.2025', km: 62000 },
    { id: 7, name: 'SPACE 5 GE-003', type: 'Space Truck', status: 'active', project: 'KEYWICE 2023-2025', location: 'Köln', nextService: '30.12.2025', km: 44000 },
    { id: 8, name: 'SPACE 3 GE-001', type: 'Space Truck', status: 'active', project: 'LIEBHERR 2025', location: 'Düsseldorf', nextService: '18.12.2025', km: 36000 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-50 text-green-700">Im Einsatz</Badge>;
      case 'available':
        return <Badge className="bg-blue-50 text-blue-700">Verfügbar</Badge>;
      case 'maintenance':
        return <Badge className="bg-orange-50 text-orange-700">Wartung</Badge>;
      default:
        return null;
    }
  };

  const stats = [
    { label: 'Gesamt Trucks', value: '8', icon: Truck, color: 'bg-blue-500' },
    { label: 'Im Einsatz', value: '6', icon: MapPin, color: 'bg-green-500' },
    { label: 'Verfügbar', value: '1', icon: Calendar, color: 'bg-purple-500' },
    { label: 'In Wartung', value: '1', icon: Wrench, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Truck Manager</h1>
          <p className="text-gray-500 mt-1">Übersicht und Verwaltung aller Roadshow-Trucks</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Wartung planen
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">{stat.label}</p>
                    <p className="text-gray-900 mt-1">{stat.value}</p>
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

      <Card>
        <CardHeader>
          <CardTitle>Alle Trucks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {trucks.map((truck) => (
              <Card key={truck.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Truck className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900">{truck.name}</h3>
                        <p className="text-gray-500">{truck.type}</p>
                      </div>
                    </div>
                    {getStatusBadge(truck.status)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Aktuelles Projekt:</span>
                      <span className="text-gray-900">{truck.project}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Standort:</span>
                      <span className="text-gray-900">{truck.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Kilometerstand:</span>
                      <span className="text-gray-900">{truck.km.toLocaleString()} km</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Nächster Service:</span>
                      <span className="text-gray-900">{truck.nextService}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button variant="outline" className="flex-1">
                      Details
                    </Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Tracking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
