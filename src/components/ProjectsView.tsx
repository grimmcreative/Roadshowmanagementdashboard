import { useState } from 'react';
import { Search, Filter, Eye, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface ProjectsViewProps {
  onViewProject: (projectId: string) => void;
}

export function ProjectsView({ onViewProject }: ProjectsViewProps) {
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
    { label: 'Alle Projekte', value: '18', color: 'bg-blue-500' },
    { label: 'Aktive Projekte', value: '13', color: 'bg-green-500' },
    { label: 'Geplant', value: '3', color: 'bg-yellow-500' },
    { label: 'Anfragen', value: '916', color: 'bg-purple-500' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400">Aktiv</Badge>;
      case 'planned':
        return <Badge className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">Geplant</Badge>;
      case 'template':
        return <Badge className="bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400">Vorlage</Badge>;
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-gray-100">Projekte</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Alle Roadshow Projekte auf einen Blick</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Neues Projekt
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">{stat.label}</p>
                  <p className="text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 ${stat.color} rounded-lg`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Alle Projekte und deren Blick</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder="Projekte oder Unternehmen suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400">Projekt</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400">Unternehmen</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400">Offene Anfragen</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400">Fahrzeug</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4">
                      <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">{project.name}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{project.company}</td>
                    <td className="py-3 px-4">
                      {project.requests > 0 ? (
                        <Badge className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">{project.requests}</Badge>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">---</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{project.vehicle}</td>
                    <td className="py-3 px-4">{getStatusBadge(project.status)}</td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewProject(project.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Anzeigen
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