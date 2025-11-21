import { useState } from 'react';
import { Search, Filter, Eye, Plus } from 'lucide-react';
import { CardModern as Card, CardModernContent as CardContent, CardModernHeader as CardHeader, CardModernTitle as CardTitle } from './ui/card-modern';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

interface ProjectsViewModernProps {
  onViewProject: (projectId: string) => void;
}

export function ProjectsViewModern({ onViewProject }: ProjectsViewModernProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    { id: '1', company: 'ADCO GmbH', name: 'FENDT 2025', requests: 128, vehicle: 'PROMO SANH PN-22', status: 'active' },
    { id: '2', company: 'locked internet services GmbH', name: 'DYSON 2025', requests: 0, vehicle: 'SPACE 7 GE-003', status: 'active' },
    { id: '3', company: 'Bolleril GmbH & Co. KG', name: 'BRUMFETT 2023 - 2025', requests: 172, vehicle: '---', status: 'active' },
    { id: '4', company: 'BWT Wassertechnik GmbH', name: 'BWT 2025', requests: 167, vehicle: 'FUTURA Black 1-45', status: 'active' },
    { id: '5', company: 'Campina GmbH', name: 'CST 2025', requests: 0, vehicle: 'PROMO SANH PN-21', status: 'active' },
    { id: '6', company: 'Brunner Möbelwerken GmbH', name: 'STYRIA/LEBS 2019 - 2025', requests: 166, vehicle: 'PROMO SANH PN-21', status: 'active' },
    { id: '7', company: 'DESSERT International AG', name: 'DESSERT 2023 - 2025', requests: 0, vehicle: '---', status: 'active' },
    { id: '8', company: 'GuideCom AG', name: 'GuideCom 2025', requests: 15, vehicle: 'FUTURA SANH 009', status: 'active' },
    { id: '9', company: 'GVP Nutzfahrzeuge AG', name: 'GAF 2024 - 2025', requests: 36, vehicle: 'PROMO SANH PN-3', status: 'planned' },
    { id: '10', company: 'Kennametal Shared Services GmbH', name: 'KENNMETAL 2026', requests: 0, vehicle: '---', status: 'planned' },
    { id: '11', company: 'KEYWICE DEUTSCHLAND GmbH', name: 'KEYWICE 2023 - 2025', requests: 56, vehicle: 'SPACE 5 GE-003', status: 'active' },
    { id: '12', company: 'Liebherr-Export AG', name: 'LIEBHERR 2025', requests: 44, vehicle: 'SPACE 3 GE-001', status: 'active' },
    { id: '13', company: 'Mechanische Fakultät Mannheim der Uni. Heidelberg', name: 'BOSCH / XTRVV 2022 - 2025', requests: 68, vehicle: 'FUTURA Black 1-53', status: 'active' },
    { id: '14', company: 'MHH Heinrichs GmbH', name: 'MHH 2024 - 2025', requests: 0, vehicle: 'FUTURA SANH 010', status: 'planned' },
    { id: '15', company: 'MOST GmbH / Roadshow Experts', name: 'zZz_MUSTER ROADSHOW 2024+', requests: 0, vehicle: 'CUBE FT-001', status: 'template' },
    { id: '16', company: 'Treustock & Riemch Marketing GmbH', name: 'SPANVAISSE 2023 - 2025', requests: 80, vehicle: 'GIANT SANH 007', status: 'active' },
    { id: '17', company: 'Winehaus', name: 'WINTRECUBE 2023 - 2025', requests: 105, vehicle: 'SPACE 1 GE-001', status: 'active' },
    { id: '18', company: 'Zeuckbaut GmbH & Co. KG', name: 'ZWICK-ROELL 2025', requests: 15, vehicle: 'SPACE 7 GE-004', status: 'active' },
  ];

  const stats = [
    { label: 'Alle Projekte', value: '18', color: 'from-blue-500 to-blue-600' },
    { label: 'Aktive Projekte', value: '13', color: 'from-green-500 to-green-600' },
    { label: 'Geplant', value: '3', color: 'from-yellow-500 to-yellow-600' },
    { label: 'Anfragen', value: '916', color: 'from-purple-500 to-purple-600' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-0">Aktiv</Badge>;
      case 'planned':
        return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0">Geplant</Badge>;
      case 'template':
        return <Badge className="bg-gray-500/10 text-gray-600 dark:text-gray-400 border-0">Vorlage</Badge>;
      default:
        return null;
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-gray-900 dark:text-white text-3xl">Projekte</h1>
          <p className="text-gray-500 dark:text-[#8e8e8e] mt-2">Alle Roadshow Projekte auf einen Blick</p>
        </div>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-[#8B1A10] to-[#BF2011] text-white rounded-xl font-medium shadow-lg shadow-red-900/20 hover:shadow-xl hover:shadow-red-900/30 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          Neues Projekt
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Alle Projekte und deren Blick</CardTitle>
              <motion.button
                className="px-4 py-2 bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-[#b8b8b8] rounded-xl hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="w-4 h-4" />
                Filter
              </motion.button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-[#8e8e8e]" />
                <Input
                  placeholder="Projekte oder Unternehmen suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-gray-50 dark:bg-[#2a2a2a] border-0"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-[#2a2a2a]">
                    <th className="text-left py-4 px-4 text-gray-500 dark:text-[#8e8e8e] font-medium">Projekt</th>
                    <th className="text-left py-4 px-4 text-gray-500 dark:text-[#8e8e8e] font-medium">Unternehmen</th>
                    <th className="text-left py-4 px-4 text-gray-500 dark:text-[#8e8e8e] font-medium">Offene Anfragen</th>
                    <th className="text-left py-4 px-4 text-gray-500 dark:text-[#8e8e8e] font-medium">Fahrzeug</th>
                    <th className="text-left py-4 px-4 text-gray-500 dark:text-[#8e8e8e] font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-gray-500 dark:text-[#8e8e8e] font-medium">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project, index) => (
                    <motion.tr
                      key={project.id}
                      className="border-b border-gray-50 dark:border-[#2a2a2a] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.02 }}
                    >
                      <td className="py-4 px-4">
                        <span className="text-[#BF2011] dark:text-[#ff6b5f] font-semibold cursor-pointer hover:underline">{project.name}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-900 dark:text-white">{project.company}</td>
                      <td className="py-4 px-4">
                        {project.requests > 0 ? (
                          <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0 font-semibold">{project.requests}</Badge>
                        ) : (
                          <span className="text-gray-400 dark:text-[#8e8e8e]">---</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-900 dark:text-white">{project.vehicle}</td>
                      <td className="py-4 px-4">{getStatusBadge(project.status)}</td>
                      <td className="py-4 px-4">
                        <motion.button
                          onClick={() => onViewProject(project.id)}
                          className="px-4 py-2 bg-gradient-to-r from-[#8B1A10] to-[#BF2011] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye className="w-4 h-4" />
                          Anzeigen
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
