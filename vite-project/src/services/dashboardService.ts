import api from './api';
import type { DashboardStats, DashboardHistorico } from '../types/api.types';

class DashboardService {
  async getStats(): Promise<DashboardStats> {
    const response = await api.get('/dashboard/stats');
    return response.data;
  }
  async getHistorico(dias: number = 30): Promise<DashboardHistorico> {
  const response = await api.get(`/dashboard/historico?dias=${dias}`);
  return response.data;
  }
}

export default new DashboardService();