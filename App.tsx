
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Wrench, 
  BrainCircuit, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Menu,
  X,
  RefreshCw,
  Store
} from 'lucide-react';
import { ViewType } from './types';
import DashboardView from './components/views/DashboardView';
import FiscalView from './components/views/FiscalView';
import FieldServiceView from './components/views/FieldServiceView';
import AIInsightsView from './components/views/AIInsightsView';
import IntegrationsView from './components/views/IntegrationsView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tenant, setTenant] = useState("AgroForte S.A. - Matriz");

  const NavItem = ({ icon: Icon, label, type }: { icon: any, label: string, type: ViewType }) => (
    <button
      onClick={() => setActiveView(type)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        activeView === type 
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
          : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-700'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  const renderContent = () => {
    switch (activeView) {
      case ViewType.DASHBOARD: return <DashboardView />;
      case ViewType.FISCAL: return <FiscalView />;
      case ViewType.FIELD_SERVICE: return <FieldServiceView />;
      case ViewType.AI_INSIGHTS: return <AIInsightsView />;
      case ViewType.INTEGRATIONS: return <IntegrationsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-20 overflow-hidden`}
      >
        <div className="p-6 flex items-center space-x-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Store size={24} />
          </div>
          <span className="text-xl font-bold text-slate-800">AgroFlow</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={LayoutDashboard} label="Dashboard" type={ViewType.DASHBOARD} />
          <NavItem icon={FileText} label="Módulo Fiscal" type={ViewType.FISCAL} />
          <NavItem icon={Wrench} label="Serviços de Campo" type={ViewType.FIELD_SERVICE} />
          <NavItem icon={BrainCircuit} label="IA & Insights" type={ViewType.AI_INSIGHTS} />
          <NavItem icon={RefreshCw} label="Integrações" type={ViewType.INTEGRATIONS} />
          <NavItem icon={Settings} label="Configurações" type={ViewType.SETTINGS} />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded-xl mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">
              AD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-slate-800 truncate">Admin Usuário</p>
              <p className="text-xs text-slate-500 truncate">admin@agroforte.com</p>
            </div>
          </div>
          <button className="w-full flex items-center space-x-3 px-4 py-2 text-slate-500 hover:text-rose-600 transition-colors">
            <LogOut size={18} />
            <span className="text-sm font-medium">Sair do Sistema</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:flex items-center px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
              <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {tenant}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Pesquisar OS, Peças, NFe..."
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none w-64"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[#F8FAFC]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
