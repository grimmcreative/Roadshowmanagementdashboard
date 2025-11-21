import { Truck, MapPin, Calendar, TrendingUp, ArrowUpRight, TrendingDown } from 'lucide-react';
import { CardModern as Card, CardModernContent as CardContent, CardModernHeader as CardHeader, CardModernTitle as CardTitle } from './ui/card-modern';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface DashboardModernProps {
  onNavigate: (view: 'dashboard' | 'tours' | 'roadshows') => void;
}

export function DashboardModern({ onNavigate }: DashboardModernProps) {
  const stats = [
    { label: 'Aktive Roadshows', value: '12', icon: Truck, change: '+2 diese Woche', color: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-50', bgDark: 'bg-blue-900/20' },
    { label: 'Geplante Stops', value: '48', icon: MapPin, change: '8 nächste Woche', color: 'from-green-500 to-green-600', bgLight: 'bg-green-50', bgDark: 'bg-green-900/20' },
    { label: 'Kommende Events', value: '5', icon: Calendar, change: 'in 3 Tagen', color: 'from-purple-500 to-purple-600', bgLight: 'bg-purple-50', bgDark: 'bg-purple-900/20' },
    { label: 'Gesamt KM', value: '2.847', icon: TrendingUp, change: '+450 km', color: 'from-orange-500 to-orange-600', bgLight: 'bg-orange-50', bgDark: 'bg-orange-900/20' },
  ];

  const pieData = [
    { name: 'Aktiv', value: 12, color: '#3b82f6' },
    { name: 'Geplant', value: 5, color: '#10b981' },
    { name: 'Abgeschlossen', value: 8, color: '#6366f1' },
  ];

  const lineData = [
    { month: 'Jan', roadshows: 8, km: 1200 },
    { month: 'Feb', roadshows: 10, km: 1500 },
    { month: 'Mär', roadshows: 12, km: 1800 },
    { month: 'Apr', roadshows: 15, km: 2100 },
    { month: 'Mai', roadshows: 13, km: 1900 },
    { month: 'Jun', roadshows: 17, km: 2400 },
  ];

  const kpiData = [
    { label: 'Durchschn. Tour-Dauer', value: '14', unit: 'Tage', trend: '+5%', positive: true },
    { label: 'Erfolgsquote', value: '94', unit: '%', trend: '+2%', positive: true },
    { label: 'Ø KM pro Tour', value: '850', unit: 'km', trend: '-3%', positive: false },
    { label: 'Auslastung', value: '87', unit: '%', trend: '+8%', positive: true },
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
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-gray-900 dark:text-white text-3xl">Dashboard</h1>
          <p className="text-gray-500 dark:text-[#8e8e8e] mt-2">Übersicht über alle Roadshow-Aktivitäten</p>
        </div>
        <motion.button
          onClick={() => onNavigate('tours')}
          className="px-6 py-3 bg-gradient-to-r from-[#8B1A10] to-[#BF2011] text-white rounded-xl font-medium shadow-lg shadow-red-900/20 hover:shadow-xl hover:shadow-red-900/30 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Neue Tour planen
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-gray-500 dark:text-[#8e8e8e] text-sm mb-1">{stat.label}</p>
                      <p className="text-gray-900 dark:text-white text-2xl font-bold mb-1">{stat.value}</p>
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                        <ArrowUpRight className="w-4 h-4" />
                        <span>{stat.change}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500 dark:text-[#8e8e8e] text-sm mb-2">{kpi.label}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-gray-900 dark:text-white text-3xl font-bold">{kpi.value}</span>
                    <span className="text-gray-500 dark:text-[#8e8e8e] text-lg ml-1">{kpi.unit}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${kpi.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {kpi.positive ? <ArrowUpRight className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="font-medium">{kpi.trend}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Roadshow-Status Verteilung</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Roadshows & KM Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={lineData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="roadshows" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="km" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Aktive Roadshows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeRoadshows.map((roadshow, index) => (
                  <motion.div 
                    key={roadshow.id} 
                    className="p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl hover:bg-gray-100 dark:hover:bg-[#333333] transition-all cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold">{roadshow.name}</h3>
                        <p className="text-gray-500 dark:text-[#8e8e8e] text-sm mt-1">{roadshow.truck}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg text-sm font-medium">
                        Aktiv
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-[#8e8e8e]">Fortschritt</span>
                        <span className="text-gray-900 dark:text-white font-medium">{roadshow.stops} Stops</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-[#3a3a3a] rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-[#8B1A10] to-[#BF2011]"
                          initial={{ width: 0 }}
                          animate={{ width: `${roadshow.progress}%` }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        />
                      </div>
                      <p className="text-gray-500 dark:text-[#8e8e8e] text-sm mt-2">📍 Aktuell: {roadshow.currentLocation}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Kommende Stops</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingStops.map((stop, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl hover:bg-gray-100 dark:hover:bg-[#333333] transition-all cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
                        <span className="text-lg font-bold">{stop.date.split('.')[0]}</span>
                        <span className="text-xs opacity-80">{stop.date.split('.')[1]}</span>
                      </div>
                      <div>
                        <h4 className="text-gray-900 dark:text-white font-semibold">{stop.city}</h4>
                        <p className="text-gray-500 dark:text-[#8e8e8e] text-sm">{stop.event}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 dark:text-white font-semibold">{stop.distance}</p>
                      <p className="text-gray-500 dark:text-[#8e8e8e] text-sm">Distanz</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
