import { useState } from 'react';
import { Search, Plus, Building2, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

export function CompaniesView() {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Unternehmen</h1>
          <p className="text-gray-500 mt-1">Verwalten Sie alle Kundenunternehmen</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Neues Unternehmen
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Alle Unternehmen ({companies.length})</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Unternehmen suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompanies.map((company) => (
              <Card key={company.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 truncate">{company.name}</h3>
                      <Badge className="mt-1 bg-blue-50 text-blue-700">
                        {company.projects} Projekt{company.projects > 1 ? 'e' : ''}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate text-sm">{company.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{company.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{company.city}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-500 text-sm">Ansprechpartner: {company.contact}</p>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    Details anzeigen
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
