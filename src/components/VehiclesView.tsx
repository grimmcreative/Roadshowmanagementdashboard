import { Car, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useStyle } from '../contexts/StyleContext';
import { VehiclesViewModern } from './VehiclesViewModern';

export function VehiclesView() {
  const { styleMode } = useStyle();

  if (styleMode === 'modern') {
    return <VehiclesViewModern />;
  }

  const vehicles = [
    { id: 1, plate: 'PROMO SANH PN-22', type: 'Zugmaschine', brand: 'MAN TGX', status: 'active', inspection: '15.04.2026', insurance: 'Aktiv' },
    { id: 2, plate: 'SPACE 7 GE-003', type: 'Auflieger', brand: 'Krone', status: 'active', inspection: '22.03.2026', insurance: 'Aktiv' },
    { id: 3, plate: 'FUTURA Black 1-45', type: 'Zugmaschine', brand: 'Mercedes Actros', status: 'active', inspection: '10.05.2026', insurance: 'Aktiv' },
    { id: 4, plate: 'PROMO SANH PN-21', type: 'Auflieger', brand: 'Schmitz', status: 'active', inspection: '05.02.2026', insurance: 'Aktiv' },
    { id: 5, plate: 'FUTURA SANH 009', type: 'Zugmaschine', brand: 'Volvo FH', status: 'available', inspection: '18.06.2026', insurance: 'Aktiv' },
    { id: 6, plate: 'PROMO SANH PN-3', type: 'Auflieger', brand: 'Krone', status: 'maintenance', inspection: '01.01.2026', insurance: 'Läuft aus' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0">Aktiv</Badge>;
      case 'available':
        return <Badge className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-0">Verfügbar</Badge>;
      case 'maintenance':
        return <Badge className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-0">Wartung</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-gray-100">Fahrzeuge</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Verwaltung aller Zugmaschinen und Auflieger</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Fahrzeug hinzufügen
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Zugmaschinen</p>
                <p className="text-gray-900 dark:text-gray-100 mt-1">3</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 dark:bg-blue-600 rounded-lg" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Auflieger</p>
                <p className="text-gray-900 dark:text-gray-100 mt-1">3</p>
              </div>
              <div className="w-10 h-10 bg-green-500 dark:bg-green-600 rounded-lg" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400">In Wartung</p>
                <p className="text-gray-900 dark:text-gray-100 mt-1">1</p>
              </div>
              <div className="w-10 h-10 bg-orange-500 dark:bg-orange-600 rounded-lg" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fahrzeugübersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400">Kennzeichen</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400">Typ</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400">Marke</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400">HU/AU</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400">Versicherung</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span className="text-gray-900 dark:text-gray-100">{vehicle.plate}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{vehicle.type}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{vehicle.brand}</td>
                    <td className="py-3 px-4">{getStatusBadge(vehicle.status)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span className="text-gray-900 dark:text-gray-100">{vehicle.inspection}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {vehicle.insurance === 'Aktiv' ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-green-700 dark:text-green-400">{vehicle.insurance}</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            <span className="text-orange-700 dark:text-orange-400">{vehicle.insurance}</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}