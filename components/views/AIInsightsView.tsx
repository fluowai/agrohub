
import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  TrendingUp, 
  Wrench, 
  Package, 
  AlertCircle,
  Lightbulb,
  Zap
} from 'lucide-react';
import { getAIInsights } from '../../services/aiService';
import { AIInsight } from '../../types';

const AIInsightsView: React.FC = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const data = await getAIInsights("Frota: 150 tratores, Safra atual: Soja, Clima: Alta umidade, Peças estoque: Crítico em correias.");
      setInsights(data);
      setLoading(false);
    };
    fetchInsights();
  }, []);

  const getTypeIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'MAINTENANCE': return <Wrench className="text-amber-500" size={24} />;
      case 'SALES': return <TrendingUp className="text-emerald-500" size={24} />;
      case 'INVENTORY': return <Package className="text-blue-500" size={24} />;
      default: return <Lightbulb className="text-slate-500" size={24} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BrainCircuit className="text-emerald-600" />
            IA & Inteligência de Negócio
          </h1>
          <p className="text-slate-500">Insights preditivos gerados pelo Gemini AI para sua concessionária.</p>
        </div>
        <button 
          onClick={() => {}} 
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
        >
          <Sparkles size={18} className="text-amber-500" />
          <span>Recalcular Modelos</span>
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-20 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 animate-pulse font-medium text-lg">Processando Big Data Agrícola...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.length > 0 ? insights.map((insight, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-emerald-200 transition-all hover:shadow-lg group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-emerald-50 transition-colors">
                    {getTypeIcon(insight.type)}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{insight.type}</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                      {Math.round(insight.confidence * 100)}% Confiança
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">{insight.title}</h3>
                <p className="text-sm text-slate-600 flex-1 leading-relaxed">{insight.description}</p>
                
                {insight.actionRequired && (
                  <button className="mt-6 w-full py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all">
                    <Zap size={16} />
                    Executar Recomendação
                  </button>
                )}
              </div>
            )) : (
               <div className="col-span-full p-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-300">
                 Nenhum insight disponível no momento.
               </div>
            )}
          </div>

          <div className="bg-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle size={24} className="text-amber-400" />
                Manutenção Preditiva Ativada
              </h3>
              <p className="text-emerald-100 mb-6 leading-relaxed">
                Nossos modelos identificaram que 12 Colheitadeiras S700 na região de Sorriso/MT têm 85% de chance de falha no sistema hidráulico nas próximas 40 horas de uso devido à safra intensiva.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-2 bg-white text-emerald-900 rounded-full font-bold text-sm hover:bg-emerald-50 transition-colors">
                  Notificar Clientes
                </button>
                <button className="px-6 py-2 bg-emerald-800 text-white rounded-full font-bold text-sm hover:bg-emerald-700 transition-colors">
                  Reservar Peças no Estoque
                </button>
              </div>
            </div>
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -mr-20 -mt-20 blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400 rounded-full -ml-10 -mb-10 blur-2xl opacity-20"></div>
            <BrainCircuit size={200} className="absolute right-0 bottom-0 text-emerald-800/20 translate-y-1/4" />
          </div>
        </>
      )}
    </div>
  );
};

export default AIInsightsView;
