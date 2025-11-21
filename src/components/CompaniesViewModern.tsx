import { useState } from 'react';
import { Search, Plus, Building2, Mail, Phone, MapPin } from 'lucide-react';
import { CardModern as Card, CardModernContent as CardContent, CardModernHeader as CardHeader, CardModernTitle as CardTitle } from './ui/card-modern';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

export function CompaniesViewModern() {
  const [searchTerm, setSearchTerm] = useState('');

  const companies = [
    { id: 1, name: 'ADCO GmbH', projects: 1, contact: 'Max Mustermann', email: 'max@adco.de', phone: '+49 123 456789', city: 'München', status: 'active' },
    { id: 2, name: 'BWT Wassertechnik GmbH', projects: 1, contact: 'Anna Schmidt', email: 'anna@bwt.de', phone: '+49 234 567890', city: 'Berlin', status: 'active' },
    { id: 3, name: 'Campina GmbH', projects: 1, contact: 'Peter Klein', email: 'peter@campina.de', phone: '+49 345 678901', city: 'Hamburg', status: 'active' },
    { id: 4, name: 'GuideCom AG', projects: 1, contact: 'Julia Meier', email: 'julia@guidecom.ch', phone: '+41 44 1234567', city: 'Zürich', status: 'active' },
    { id: 5, name: 'Kennametal Shared Services GmbH', projects: 1, contact: 'Thomas Weber', email: 'thomas@kennametal.com', phone: '+49 456 789012', city: 'Frankfurt', status: 'active' },
    { id: 6, name: 'Liebherr-Export AG', projects: 1, contact: 'Sarah Fischer', email: 'sarah@liebherr.com', phone: '+41 71 1234567', city: 'Bern', status: 'active' },
    { id: 7, name: 'MOST GmbH / Roadshow Experts', projects: 2, contact: 'Michael Braun', email: 'michael@most.de', phone: '+49 567 890123', city: 'Stuttgart', status: 'active' },
  ];

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-gray-900 dark:text-white text-3xl">Unternehmen</h1>
          <p className="text-gray-500 dark:text-[#8e8e8e] mt-2">Verwalten Sie alle Kundenunternehmen</p>
        </div>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-[#8B1A10] to-[#BF2011] text-white rounded-xl font-medium shadow-lg shadow-red-900/20 hover:shadow-xl hover:shadow-red-900/30 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          Neues Unternehmen
        </motion.button>
      </motion.div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Alle Unternehmen ({companies.length})</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-[#8e8e8e]" />
              <Input
                placeholder="Unternehmen suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-gray-50 dark:bg-[#2a2a2a] border-0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 dark:text-white font-semibold truncate">{company.name}</h3>
                        <Badge className="mt-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0">
                          {company.projects} Projekt{company.projects > 1 ? 'e' : ''}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3 p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                      <div className="flex items-center gap-3 text-gray-600 dark:text-[#b8b8b8]">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate text-sm">{company.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-[#b8b8b8]">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{company.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-[#b8b8b8]">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{company.city}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[#2a2a2a]">
                      <p className="text-gray-500 dark:text-[#8e8e8e] text-sm">Ansprechpartner: <span className="text-gray-900 dark:text-white font-medium">{company.contact}</span></p>
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
        </CardContent>
      </Card>
    </div>
  );
}
