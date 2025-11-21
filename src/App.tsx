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
import { ThemeProvider } from './contexts/ThemeContext';

type ViewType = 'dashboard' | 'tours' | 'roadshows' | 'projects' | 'companies' | 'trucks' | 'vehicles' | 'contacts' | 'planning' | 'project-detail';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleViewProject = (projectId: string) => {
    setSelectedProject(projectId);
    setCurrentView('project-detail');
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar currentView={currentView} onNavigate={setCurrentView} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          
          <main className="flex-1 overflow-y-auto p-6">
            {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} />}
            {currentView === 'tours' && <TourPlanner />}
            {currentView === 'roadshows' && <RoadshowList />}
            {currentView === 'projects' && <ProjectsView onViewProject={handleViewProject} />}
            {currentView === 'project-detail' && selectedProject && <ProjectDetail projectId={selectedProject} onBack={() => setCurrentView('projects')} />}
            {currentView === 'companies' && <CompaniesView />}
            {currentView === 'trucks' && <TruckManager />}
            {currentView === 'vehicles' && <VehiclesView />}
            {currentView === 'contacts' && <ContactsView />}
            {currentView === 'planning' && <PlanningView />}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}