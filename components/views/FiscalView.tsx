
import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Send, 
  XCircle, 
  ShieldCheck, 
  AlertTriangle,
  FileCheck,
  Search,
  Filter
} from 'lucide-react';
import { NFe } from '../../types';

const mockNFes: NFe[] = [
  { id: '1', number: '000.124.551', customer: 'Fazenda Santa Helena', value: 85200.00, status: 'AUTHORIZED', date: '2024-05-20' },
  { id: '2', number: '000.124.552', customer: 'Agropecuária Rio Verde', value: 12450.00, status: 'AUTHORIZED', date: '2024-05-20' },
  { id: '3', number: '000.124.553', customer: 'Cooperativa Agrícola PR', value: 3400.50, status: 'PENDING', date: '2024-05-21' },
  { id: '4', number: '000.124.554', customer: 'João da Silva ME', value: 500.00, status: 'REJECTED', date: '2024-05-21' },
  { id: '5', number: '000.124.555', customer: 'Grupo Amaggi', value: 245000.00, status: 'CANCELLED', date: '2024-05-19' },
];

const FiscalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'NFE' | 'NFSE' | 'NFCE'>('NFE');

  const getStatusBadge = (status: NFe['status']) => {
    switch (status) {
      case 'AUTHORIZED': return <span className="flex items-center space-x-1.5 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-semibold"><FileCheck size={14}/><span>Autorizada</span></span>;
      case 'PENDING': return <span className="flex items-center space-x-1.5 bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-semibold"><ShieldCheck size={14}/><span>Processando</span></span>;
      case 'REJECTED': return <span className="flex items-center space-x-1.5 bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full text-xs font-semibold"><AlertTriangle size={14}/><span>Rejeitada</span></span>;
      case 'CANCELLED': return <span className="flex items-center space-x-1.5 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs font-semibold"><XCircle size={14}/><span>Cancelada</span></span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Módulo Fiscal</h1>
          <p className="text-slate-500">Gestão de Documentos Fiscais Eletrônicos (SEFAZ).</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
            <span className="text-sm font-medium text-slate-600">SEFAZ Online</span>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all">
            <Send size={18} />
            <span className="text-sm font-semibold">Transmitir Lote</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm mb-1">Certificado Digital</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="font-semibold text-slate-800">Tipo A1 (Cloud)</p>
                <p className="text-xs text-slate-400">Expira em 240 dias</p>
              </div>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:underline">Renovar</button>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm mb-1">Faturamento Mês</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <FileText size={20} />
              </div>
              <div>
                <p className="font-semibold text-slate-800">R$ 458.200,45</p>
                <p className="text-xs text-slate-400">128 notas emitidas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm mb-1">Pendências Fiscais</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p className="font-semibold text-slate-800">3 Alertas</p>
                <p className="text-xs text-slate-400">Rejeições 235, 602</p>
              </div>
            </div>
            <button className="px-3 py-1 bg-rose-600 text-white rounded text-xs font-bold">Ver Erros</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-100 p-4 flex items-center justify-between bg-white sticky top-0">
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveTab('NFE')}
              className={`pb-4 px-2 text-sm font-semibold transition-all border-b-2 ${activeTab === 'NFE' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'}`}
            >
              NF-e (Vendas/Remessa)
            </button>
            <button 
              onClick={() => setActiveTab('NFSE')}
              className={`pb-4 px-2 text-sm font-semibold transition-all border-b-2 ${activeTab === 'NFSE' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'}`}
            >
              NFS-e (Serviços)
            </button>
            <button 
              onClick={() => setActiveTab('NFCE')}
              className={`pb-4 px-2 text-sm font-semibold transition-all border-b-2 ${activeTab === 'NFCE' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'}`}
            >
              NFC-e (Consumidor)
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="text" placeholder="Número, Cliente..." className="pl-9 pr-4 py-1.5 bg-slate-50 border-transparent rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500" />
            </div>
            <button className="p-2 bg-slate-50 rounded-lg text-slate-500"><Filter size={14}/></button>
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase">
            <tr>
              <th className="px-6 py-4">Número / Série</th>
              <th className="px-6 py-4">Destinatário</th>
              <th className="px-6 py-4">Data Emissão</th>
              <th className="px-6 py-4">Valor Total</th>
              <th className="px-6 py-4">Status SEFAZ</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {mockNFes.map((nfe) => (
              <tr key={nfe.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-mono font-medium text-slate-800">{nfe.number}</td>
                <td className="px-6 py-4 text-slate-600 font-medium">{nfe.customer}</td>
                <td className="px-6 py-4 text-slate-500">{new Date(nfe.date).toLocaleDateString('pt-BR')}</td>
                <td className="px-6 py-4 font-semibold text-slate-700">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(nfe.value)}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(nfe.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end space-x-2">
                    <button className="p-1.5 text-slate-400 hover:text-emerald-600 transition-colors" title="Download XML"><Download size={16} /></button>
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors" title="Imprimir DANFE"><FileText size={16} /></button>
                    {nfe.status === 'AUTHORIZED' && (
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors" title="Cancelar Nota"><XCircle size={16} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-4 bg-slate-50 flex items-center justify-between text-xs font-medium text-slate-500 border-t border-slate-100">
          <span>Exibindo 5 de 1,245 registros</span>
          <div className="flex space-x-1">
            <button className="px-2 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Anterior</button>
            <button className="px-2 py-1 bg-emerald-600 text-white rounded shadow-sm">1</button>
            <button className="px-2 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">2</button>
            <button className="px-2 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">3</button>
            <button className="px-2 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiscalView;
