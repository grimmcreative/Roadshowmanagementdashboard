import { Car, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { CardModern as Card, CardModernContent as CardContent, CardModernHeader as CardHeader, CardModernTitle as CardTitle } from './ui/card-modern';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';

export function VehiclesViewModern() {
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
        return <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-0">Aktiv</Badge>;
      case 'available':
        return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0">Verfügbar</Badge>;
      case 'maintenance':
        return <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0">Wartung</Badge>;
      default:
        return null;
    }
  };

  const stats = [
    { label: 'Zugmaschinen', value: '3', color: 'from-blue-500 to-blue-600' },
    { label: 'Auflieger', value: '3', color: 'from-green-500 to-green-600' },
    { label: 'In Wartung', value: '1', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-gray-900 dark:text-white text-3xl">Fahrzeuge</h1>
          <p className="text-gray-500 dark:text-[#8e8e8e] mt-2">Verwaltung aller Zugmaschinen und Auflieger</p>
        </div>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-[#8B1A10] to-[#BF2011] text-white rounded-xl font-medium shadow-lg shadow-red-900/20 hover:shadow-xl hover:shadow-red-900/30 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Fahrzeug hinzufügen
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-[#8e8e8e] text-sm mb-2">{stat.label}</p>
                    <p className="text-gray-900 dark:text-white text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Car className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-semibold">{vehicle.plate}</h3>
                      <p className="text-gray-500 dark:text-[#8e8e8e] text-sm mt-1">{vehicle.type}</p>
                    </div>
                  </div>
                  {getStatusBadge(vehicle.status)}
                </div>

                <div className="space-y-3 p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-[#8e8e8e] text-sm">Marke:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{vehicle.brand}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-[#8e8e8e] text-sm">TÜV bis:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{vehicle.inspection}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-[#8e8e8e] text-sm">Versicherung:</span>
                    <span className={`font-medium ${vehicle.insurance === 'Aktiv' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                      {vehicle.insurance}
                    </span>
                  </div>
                </div>

                <motion.button
                  className="w-full mt-4 px-4 py-2.5 bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-[#b8b8b8] rounded-xl hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Details anzeigen
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
