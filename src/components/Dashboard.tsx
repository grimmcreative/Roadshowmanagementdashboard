import { Truck, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { useStyle } from '../contexts/StyleContext';
import { DashboardModern } from './DashboardModern';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  onNavigate: (view: 'dashboard' | 'tours' | 'roadshows') => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { styleMode } = useStyle();

  if (styleMode === 'modern') {
    return <DashboardModern onNavigate={onNavigate} />;
  }

  const stats = [
    { label: 'Aktive Roadshows', value: '12', icon: Truck, change: '+2 diese Woche', color: 'bg-blue-500' },
    { label: 'Geplante Stops', value: '48', icon: MapPin, change: '8 nächste Woche', color: 'bg-green-500' },
    { label: 'Kommende Events', value: '5', icon: Calendar, change: 'in 3 Tagen', color: 'bg-purple-500' },
    { label: 'Gesamt KM', value: '2.847', icon: TrendingUp, change: '+450 km', color: 'bg-orange-500' },
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
          <h1 className="text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Übersicht über alle Roadshow-Aktivitäten</p>
        </div>
        <Button onClick={() => onNavigate('tours')} className="bg-blue-600 hover:bg-blue-700">
          Neue Tour planen
        </Button>
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
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">{stat.label}</p>
                      <p className="text-gray-900 dark:text-gray-100 mt-1">{stat.value}</p>
                      <p className="text-gray-400 dark:text-gray-500 mt-1">{stat.change}</p>
                    </div>
                    <motion.div 
                      className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
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
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
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
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
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
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
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
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Roadshow-Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Roadshows und KM pro Monat</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={lineData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="roadshows" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="km" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {kpiData.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{kpi.label}</p>
                    <p className="text-gray-900 dark:text-gray-100 mt-1">{kpi.value} {kpi.unit}</p>
                    <p className={`text-${kpi.positive ? 'green' : 'red'}-500 dark:text-${kpi.positive ? 'green' : 'red'}-400 mt-1`}>{kpi.trend}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}