import { useState } from 'react';
import { Truck, MapPin, Calendar, MoreVertical, Plus, Search } from 'lucide-react';
import { CardModern as Card, CardModernContent as CardContent } from './ui/card-modern';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

export function RoadshowListModern() {
  const [searchTerm, setSearchTerm] = useState('');

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
        return <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-0">Aktiv</Badge>;
      case 'planned':
        return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0">Geplant</Badge>;
      case 'completed':
        return <Badge className="bg-gray-500/10 text-gray-600 dark:text-gray-400 border-0">Abgeschlossen</Badge>;
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
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-gray-900 dark:text-white text-3xl">Roadshows</h1>
          <p className="text-gray-500 dark:text-[#8e8e8e] mt-2">Verwalten Sie alle Ihre Roadshow-Kampagnen</p>
        </div>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-[#8B1A10] to-[#BF2011] text-white rounded-xl font-medium shadow-lg shadow-red-900/20 hover:shadow-xl hover:shadow-red-900/30 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          Neue Roadshow
        </motion.button>
      </motion.div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-[#8e8e8e]" />
            <Input
              placeholder="Roadshows durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-gray-50 dark:bg-[#2a2a2a] border-0"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRoadshows.map((roadshow, index) => (
          <motion.div
            key={roadshow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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
                      <h3 className="text-gray-900 dark:text-white font-semibold">{roadshow.name}</h3>
                      <p className="text-gray-500 dark:text-[#8e8e8e] mt-1">{roadshow.truck}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(roadshow.status)}
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400 dark:text-[#8e8e8e]" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                      <p className="text-gray-500 dark:text-[#8e8e8e] text-sm">Start</p>
                      <p className="text-gray-900 dark:text-white font-medium mt-1">{roadshow.startDate}</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                      <p className="text-gray-500 dark:text-[#8e8e8e] text-sm">Ende</p>
                      <p className="text-gray-900 dark:text-white font-medium mt-1">{roadshow.endDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-[#b8b8b8]">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">
                        {roadshow.completedStops}/{roadshow.stops} Stops
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-[#b8b8b8]">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{roadshow.totalKm} km</span>
                    </div>
                  </div>

                  {roadshow.status === 'active' && (
                    <div className="p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-500 dark:text-[#8e8e8e]">Aktueller Standort</span>
                        <span className="text-gray-900 dark:text-white font-semibold">{roadshow.currentLocation}</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-200 dark:bg-[#3a3a3a] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#8B1A10] to-[#BF2011]"
                          initial={{ width: 0 }}
                          animate={{ width: `${roadshow.progress}%` }}
                          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                        />
                      </div>
                      <p className="text-gray-500 dark:text-[#8e8e8e] text-sm mt-2">{roadshow.progress}% abgeschlossen</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-4">
                  <Button variant="outline" className="flex-1">
                    Details
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-[#8B1A10] to-[#BF2011] hover:shadow-lg">
                    Route anzeigen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
