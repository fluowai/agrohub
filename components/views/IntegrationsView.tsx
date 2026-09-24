
import React from 'react';
import { 
  Cloud, 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Zap,
  Globe,
  Settings2
} from 'lucide-react';

const IntegrationsView: React.FC = () => {
  const integrations = [
    { name: 'SAP S/4HANA', type: 'ERP', status: 'CONNECTED', lastSync: '2 min atrás', logo: 'SAP' },
    { name: 'John Deere Operations Center', type: 'FABRICANTE', status: 'CONNECTED', lastSync: '15 min atrás', logo: 'JD' },
    { name: 'TOTVS Protheus', type: 'ERP', status: 'DISCONNECTED', lastSync: '3 dias atrás', logo: 'TOTVS' },
    { name: 'Bling! ERP', type: 'ERP', status: 'CONNECTED', lastSync: 'Agora', logo: 'BLING' },
    { name: 'Case IH Connect', type: 'FABRICANTE', status: 'ERROR', lastSync: 'Falhou às 08:30', logo: 'CASE' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Integrações & Conectividade</h1>
          <p className="text-slate-500">Gerencie a sincronização de dados entre AgroFlow e sistemas externos.</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2">
          <RefreshCw size={18} />
          <span>Sincronizar Tudo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-black text-xs border border-slate-100">
                {item.logo}
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                item.status === 'CONNECTED' ? 'bg-emerald-100 text-emerald-700' : 
                item.status === 'ERROR' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {item.status}
              </span>
            </div>
            
            <h3 className="font-bold text-slate-800 mb-1">{item.name}</h3>
            <p className="text-xs text-slate-400 font-medium mb-4">{item.type}</p>
            
            <div className="space-y-3 py-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Última Sincronização</span>
                <span className="text-slate-800 font-semibold">{item.lastSync}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Taxa de Erro (24h)</span>
                <span className="text-emerald-600 font-semibold">0.02%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button className="flex items-center justify-center space-x-2 py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100">
                <Settings2 size={14} />
                <span>Configurar</span>
              </button>
              <button className="flex items-center justify-center space-x-2 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100">
                <RefreshCw size={14} />
                <span>Forçar Sync</span>
              </button>
            </div>
          </div>
        ))}

        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 mb-4 shadow-sm group-hover:scale-110 transition-transform">
             <Zap size={24} className="group-hover:text-emerald-500" />
          </div>
          <h3 className="font-bold text-slate-700">Nova Integração</h3>
          <p className="text-xs text-slate-500 mt-1">Conecte um novo ERP ou Fabricante via Webhook/API</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Globe size={20} className="text-blue-500" />
          Histórico de Comunicação (API Webhooks)
        </h3>
        <div className="space-y-4">
          {[
            { method: 'POST', endpoint: '/api/v1/nfe/webhook', status: 200, time: 'Agora' },
            { method: 'GET', endpoint: '/api/v1/inventory/sync', status: 200, time: '5 min atrás' },
            { method: 'POST', endpoint: '/api/v1/orders/create', status: 401, time: '12 min atrás' },
            { method: 'PATCH', endpoint: '/api/v1/technicians/gps', status: 200, time: '15 min atrás' },
          ].map((log, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded text-[10px] font-black ${
                  log.method === 'POST' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {log.method}
                </span>
                <span className="text-xs font-mono text-slate-600 truncate max-w-xs">{log.endpoint}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-[10px] text-slate-400">{log.time}</span>
                <span className={`font-mono text-xs font-bold ${log.status === 200 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsView;
