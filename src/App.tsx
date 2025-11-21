import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { TourPlanner } from './components/TourPlanner';
import { RoadshowList } from './components/RoadshowList';
import { ProjectsView } from './components/ProjectsView';
import { ProjectDetail } from './components/ProjectDetail';
import { CompaniesView } from './components/CompaniesView';
import { TruckManager } from './components/TruckManager';
import { VehiclesView } from './components/VehiclesView';
import { ContactsView } from './components/ContactsView';
import { PlanningView } from './components/PlanningView';
import { GanttView } from './components/GanttView';
import { GanttViewModern } from './components/GanttViewModern';
import { KanbanView } from './components/KanbanView';
import { KanbanViewModern } from './components/KanbanViewModern';
import { ThemeProvider } from './contexts/ThemeContext';
import { StyleProvider, useStyle } from './contexts/StyleContext';

type ViewType = 'dashboard' | 'tours' | 'roadshows' | 'projects' | 'companies' | 'trucks' | 'vehicles' | 'contacts' | 'planning' | 'project-detail' | 'gantt' | 'kanban';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { styleMode } = useStyle();

  const handleViewProject = (projectId: string) => {
    setSelectedProject(projectId);
    setCurrentView('project-detail');
  };

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    setMobileMenuOpen(false); // Close mobile menu on navigation
  };

  return (
    <div className={`flex h-screen ${styleMode === 'modern' ? 'bg-gray-100 dark:bg-[#141414]' : 'bg-gray-50 dark:bg-gray-900'}`}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar currentView={currentView} onNavigate={handleNavigate} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar currentView={currentView} onNavigate={handleNavigate} />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {currentView === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
          {currentView === 'tours' && <TourPlanner />}
          {currentView === 'roadshows' && <RoadshowList />}
          {currentView === 'projects' && <ProjectsView onViewProject={handleViewProject} />}
          {currentView === 'project-detail' && selectedProject && <ProjectDetail projectId={selectedProject} onBack={() => setCurrentView('projects')} />}
          {currentView === 'companies' && <CompaniesView />}
          {currentView === 'trucks' && <TruckManager />}
          {currentView === 'vehicles' && <VehiclesView />}
          {currentView === 'contacts' && <ContactsView />}
          {currentView === 'planning' && <PlanningView />}
          {currentView === 'gantt' && (styleMode === 'modern' ? <GanttViewModern /> : <GanttView />)}
          {currentView === 'kanban' && (styleMode === 'modern' ? <KanbanViewModern /> : <KanbanView />)}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <StyleProvider>
        <AppContent />
      </StyleProvider>
    </ThemeProvider>
  );
}