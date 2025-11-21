import { useState } from 'react';
import { Search, Plus, Mail, Phone, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';

export function ContactsView() {
  const [searchTerm, setSearchTerm] = useState('');

  const contacts = [
    { id: 1, name: 'Max Mustermann', company: 'ADCO GmbH', role: 'Projektleiter', email: 'max@adco.de', phone: '+49 123 456789' },
    { id: 2, name: 'Anna Schmidt', company: 'BWT Wassertechnik GmbH', role: 'Marketing Manager', email: 'anna@bwt.de', phone: '+49 234 567890' },
    { id: 3, name: 'Peter Klein', company: 'Campina GmbH', role: 'Event Manager', email: 'peter@campina.de', phone: '+49 345 678901' },
    { id: 4, name: 'Julia Meier', company: 'GuideCom AG', role: 'Sales Director', email: 'julia@guidecom.ch', phone: '+41 44 1234567' },
    { id: 5, name: 'Thomas Weber', company: 'Kennametal Shared Services GmbH', role: 'Operations Manager', email: 'thomas@kennametal.com', phone: '+49 456 789012' },
    { id: 6, name: 'Sarah Fischer', company: 'Liebherr-Export AG', role: 'Marketing Lead', email: 'sarah@liebherr.com', phone: '+41 71 1234567' },
    { id: 7, name: 'Michael Braun', company: 'MOST GmbH', role: 'CEO', email: 'michael@most.de', phone: '+49 567 890123' },
    { id: 8, name: 'Lisa Zimmermann', company: 'BWT Wassertechnik GmbH', role: 'Assistant', email: 'lisa@bwt.de', phone: '+49 234 567891' },
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Kontakte</h1>
          <p className="text-gray-500 mt-1">Alle Ansprechpartner und Kontaktpersonen</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Neuer Kontakt
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Alle Kontakte ({contacts.length})</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Kontakte suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-blue-600 text-white">
                        {getInitials(contact.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900">{contact.name}</h3>
                      <p className="text-gray-500">{contact.role}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate text-sm">{contact.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate text-sm">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button variant="outline" className="flex-1" size="sm">
                      <Mail className="w-4 h-4 mr-1" />
                      E-Mail
                    </Button>
                    <Button variant="outline" className="flex-1" size="sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Anrufen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
