import api from './api';
import type { DashboardStats } from '../types/api.types';

class DashboardService {
  async getStats(): Promise<DashboardStats> {
    const response = await api.get('/dashboard/stats');
    return response.data;
  }
}

export default new DashboardService();