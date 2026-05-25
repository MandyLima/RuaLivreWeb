// src/services/mapaService.ts
import api from './api';
import type { Camera, Alagamento } from '../types/api.types';

class MapaService {
  async getCameras(): Promise<Camera[]> {
    const response = await api.get('/cameras');
    return response.data;
  }

  async getAlagamentosAtivos(): Promise<Alagamento[]> {
    const response = await api.get('/flood/alagamentos');
    return response.data;
  }
}

export default new MapaService();