
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Wrench, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Package
} from 'lucide-react';

const data = [
  { name: 'Jan', vendas: 4000, manut: 2400 },
  { name: 'Fev', vendas: 3000, manut: 1398 },
  { name: 'Mar', vendas: 2000, manut: 9800 },
  { name: 'Abr', vendas: 2780, manut: 3908 },
  { name: 'Mai', vendas: 1890, manut: 4800 },
  { name: 'Jun', vendas: 2390, manut: 3800 },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-hover hover:shadow-md">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-xl text-emerald-600">
        <Icon size={24} />
      </div>
      <div className={`flex items-center space-x-1 text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
        <span>{change}</span>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      </div>
    </div>
    <p className="text-slate-500 text-sm mb-1">{title}</p>
    <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
  </div>
);

const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Visão Geral</h1>
          <p className="text-slate-500">Acompanhe o desempenho da sua concessionária em tempo real.</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">Exportar PDF</button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-lg shadow-emerald-200">Gerar Relatório</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Vendas Totais" value="R$ 1.240.500" change="+12.5%" icon={DollarSign} trend="up" />
        <StatCard title="Novos Clientes" value="48" change="+8.2%" icon={Users} trend="up" />
        <StatCard title="Ordens de Serviço" value="156" change="-2.4%" icon={Wrench} trend="down" />
        <StatCard title="Peças em Estoque" value="14.200" change="+3.1%" icon={Package} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-800">Faturamento vs Manutenção</h3>
            <select className="text-sm bg-slate-50 border-none rounded-lg p-1.5 focus:ring-0">
              <option>Últimos 6 meses</option>
              <option>Último ano</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="vendas" stroke="#10b981" fillOpacity={1} fill="url(#colorSales)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-6">Vendas por Categoria</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="manut" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Últimas Ordens de Serviço (Mobile)</h3>
          <button className="text-sm text-emerald-600 font-medium hover:underline">Ver todas</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase">
            <tr>
              <th className="px-6 py-4">Equipamento</th>
              <th className="px-6 py-4">Técnico</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Sincronização</th>
              <th className="px-6 py-4">Valor Est.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {[
              { id: 1, eq: 'Trator John Deere 6125J', tech: 'Rodrigo Silva', status: 'Em Campo', sync: 'Online', val: 'R$ 4.200' },
              { id: 2, eq: 'Colheitadeira S700', tech: 'Marcos Souza', status: 'Finalizado', sync: 'Offline', val: 'R$ 12.800' },
              { id: 3, eq: 'Pulverizador M4040', tech: 'Ana Clara', status: 'Peças Pendentes', sync: 'Online', val: 'R$ 2.450' },
            ].map(item => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">{item.eq}</td>
                <td className="px-6 py-4 text-slate-600">{item.tech}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Finalizado' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.sync === 'Online' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                    <span className="text-slate-500">{item.sync}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-slate-700">{item.val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardView;
