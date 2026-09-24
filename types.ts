
export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  FISCAL = 'FISCAL',
  FIELD_SERVICE = 'FIELD_SERVICE',
  AI_INSIGHTS = 'AI_INSIGHTS',
  INTEGRATIONS = 'INTEGRATIONS',
  SETTINGS = 'SETTINGS'
}

export interface ServiceOrder {
  id: string;
  customer: string;
  equipment: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  technician: string;
  location: string;
  date: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface NFe {
  id: string;
  number: string;
  customer: string;
  value: number;
  status: 'AUTHORIZED' | 'PENDING' | 'CANCELLED' | 'REJECTED';
  date: string;
  xmlUrl?: string;
}

export interface AIInsight {
  id: string;
  type: 'MAINTENANCE' | 'SALES' | 'INVENTORY';
  title: string;
  description: string;
  confidence: number;
  actionRequired: boolean;
}

export interface ERPIntegration {
  name: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'ERROR';
  lastSync: string;
  type: 'ERP' | 'MANUFACTURER';
}
