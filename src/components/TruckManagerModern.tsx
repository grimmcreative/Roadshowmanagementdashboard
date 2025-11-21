import { Truck, Calendar, MapPin, Wrench } from 'lucide-react';
import { CardModern as Card, CardModernContent as CardContent, CardModernHeader as CardHeader, CardModernTitle as CardTitle } from './ui/card-modern';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

export function TruckManagerModern() {
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
        return <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-0">Im Einsatz</Badge>;
      case 'available':
        return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0">Verfügbar</Badge>;
      case 'maintenance':
        return <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0">Wartung</Badge>;
      default:
        return null;
    }
  };

  const stats = [
    { label: 'Gesamt Trucks', value: '8', icon: Truck, color: 'from-blue-500 to-blue-600' },
    { label: 'Im Einsatz', value: '6', icon: MapPin, color: 'from-green-500 to-green-600' },
    { label: 'Verfügbar', value: '1', icon: Calendar, color: 'from-purple-500 to-purple-600' },
    { label: 'In Wartung', value: '1', icon: Wrench, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-gray-900 dark:text-white text-3xl">Truck Manager</h1>
          <p className="text-gray-500 dark:text-[#8e8e8e] mt-2">Übersicht und Verwaltung aller Roadshow-Trucks</p>
        </div>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-[#8B1A10] to-[#BF2011] text-white rounded-xl font-medium shadow-lg shadow-red-900/20 hover:shadow-xl hover:shadow-red-900/30 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Wartung planen
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
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
                    <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {trucks.map((truck, index) => (
          <motion.div
            key={truck.id}
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
                      <Truck className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-semibold">{truck.name}</h3>
                      <p className="text-gray-500 dark:text-[#8e8e8e] text-sm mt-1">{truck.type}</p>
                    </div>
                  </div>
                  {getStatusBadge(truck.status)}
                </div>

                <div className="space-y-3 p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-[#8e8e8e] text-sm">Projekt:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{truck.project}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-[#8e8e8e] text-sm">Standort:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{truck.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-[#8e8e8e] text-sm">KM-Stand:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{truck.km.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-[#8e8e8e] text-sm">Nächster Service:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{truck.nextService}</span>
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
