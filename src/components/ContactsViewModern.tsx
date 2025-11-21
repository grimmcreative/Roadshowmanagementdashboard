import { useState } from 'react';
import { Search, Plus, Mail, Phone, Building2 } from 'lucide-react';
import { CardModern as Card, CardModernContent as CardContent, CardModernHeader as CardHeader, CardModernTitle as CardTitle } from './ui/card-modern';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { motion } from 'motion/react';

export function ContactsViewModern() {
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
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-gray-900 dark:text-white text-3xl">Kontakte</h1>
          <p className="text-gray-500 dark:text-[#8e8e8e] mt-2">Alle Ansprechpartner und Kontaktpersonen</p>
        </div>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-[#8B1A10] to-[#BF2011] text-white rounded-xl font-medium shadow-lg shadow-red-900/20 hover:shadow-xl hover:shadow-red-900/30 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          Neuer Kontakt
        </motion.button>
      </motion.div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Alle Kontakte ({contacts.length})</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-[#8e8e8e]" />
              <Input
                placeholder="Kontakte suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-gray-50 dark:bg-[#2a2a2a] border-0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-14 h-14">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-lg font-semibold">
                          {getInitials(contact.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 dark:text-white font-semibold">{contact.name}</h3>
                        <p className="text-gray-500 dark:text-[#8e8e8e] mt-1">{contact.role}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3 p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                      <div className="flex items-center gap-3 text-gray-600 dark:text-[#b8b8b8]">
                        <Building2 className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate text-sm">{contact.company}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-[#b8b8b8]">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate text-sm">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-[#b8b8b8]">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{contact.phone}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <motion.button
                        className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-[#b8b8b8] rounded-xl hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors font-medium flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Mail className="w-4 h-4" />
                        E-Mail
                      </motion.button>
                      <motion.button
                        className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-[#b8b8b8] rounded-xl hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors font-medium flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Phone className="w-4 h-4" />
                        Anrufen
                      </motion.button>
                    </div>
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
