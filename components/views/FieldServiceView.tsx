
import React from 'react';
import { 
  MapPin, 
  Smartphone, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Wrench,
  Camera,
  History
} from 'lucide-react';

const FieldServiceView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Serviços de Campo</h1>
          <p className="text-slate-500">Gestão de equipes externas e ordens de serviço mobile.</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 shadow-lg shadow-emerald-100">
          <Smartphone size={20} />
          <span>Monitorar Técnicos</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Real-time map simulation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden h-[400px] relative shadow-sm group">
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
               <img src="https://picsum.photos/1200/800?grayscale" alt="Map Placeholder" className="w-full h-full object-cover opacity-50" />
               <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none"></div>
               {/* Simulated Markers */}
               <div className="absolute top-1/4 left-1/3 p-2 bg-white rounded-full shadow-lg border border-emerald-500 animate-bounce">
                 <MapPin size={24} className="text-emerald-600" />
               </div>
               <div className="absolute bottom-1/3 right-1/4 p-2 bg-white rounded-full shadow-lg border border-blue-500">
                 <MapPin size={24} className="text-blue-600" />
               </div>
            </div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-4 rounded-xl border border-slate-200/50 shadow-xl max-w-xs">
              <h4 className="text-sm font-bold text-slate-800 mb-2">Equipes Ativas (3)</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Rodrigo (Trator J125)</span>
                  <span className="text-emerald-600 font-bold">Em movimento</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Marcos (Faz. Alegre)</span>
                  <span className="text-blue-600 font-bold">Atendimento</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <History size={18} className="text-emerald-600" />
              Sincronização de Dados Mobile
            </h3>
            <div className="space-y-4">
              {[
                { tech: 'Rodrigo Silva', action: 'Assinou OS #2451', time: '12 min atrás', status: 'SUCCESS' },
                { tech: 'Ana Paula', action: 'Upload de 4 fotos (OS #2450)', time: '45 min atrás', status: 'SUCCESS' },
                { tech: 'Carlos Eduardo', action: 'Tentativa de sincronização offline', time: '1h atrás', status: 'PENDING' },
              ].map((log, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{log.action}</p>
                      <p className="text-xs text-slate-500">Por {log.tech} • {log.time}</p>
                    </div>
                  </div>
                  {log.status === 'SUCCESS' ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  ) : (
                    <Clock size={18} className="text-amber-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Priority OS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Ordens de Serviço Prioritárias</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[
              { id: 'OS-8821', customer: 'Fazenda Matão', equipment: 'Colheitadeira S700', priority: 'CRITICAL', status: 'OPEN' },
              { id: 'OS-8822', customer: 'Sítio Novo', equipment: 'Pulverizador M4030', priority: 'HIGH', status: 'IN_PROGRESS' },
              { id: 'OS-8823', customer: 'Agro Verde', equipment: 'Trator 8R 370', priority: 'MEDIUM', status: 'OPEN' },
              { id: 'OS-8824', customer: 'Geraldo Peças', equipment: 'Implemento Disco', priority: 'LOW', status: 'COMPLETED' },
            ].map(os => (
              <div key={os.id} className="p-4 rounded-xl border border-slate-100 hover:border-emerald-200 transition-all hover:bg-emerald-50/30">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono font-bold text-slate-400">{os.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    os.priority === 'CRITICAL' ? 'bg-rose-100 text-rose-600' :
                    os.priority === 'HIGH' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {os.priority}
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm">{os.customer}</h4>
                <p className="text-xs text-slate-500 mb-3">{os.equipment}</p>
                <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-1 text-xs text-slate-400">
                     <Clock size={12} />
                     <span>Aberto há 4h</span>
                   </div>
                   <button className="text-xs font-bold text-emerald-600 hover:underline">Ver Detalhes</button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100">
            <button className="w-full py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-100">
              Ver Todas as 156 OS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldServiceView;
