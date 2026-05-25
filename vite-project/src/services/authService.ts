// src/services/authService.ts
import api from './api';
import type { LoginRequest, LoginResponse, RegistrarRequest, RegistrarResponse } from '../types/api.types';

class AuthService {
async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      console.log('Token salvo:', response.data.access_token); 
    } else {
      console.log('token não encontrado na resposta!'); // ← adicione
    }
    
    return response.data;
  }

  async registrar(data: RegistrarRequest): Promise<RegistrarResponse> {
    console.log('Dados enviados:', data); 
    const response = await api.post<RegistrarResponse>('/auth/register', data);
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName'); // Limpa nome do usuário também
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserName(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || payload.nome || payload.email || 'Usuário';
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return 'Usuário';
    }
  }

  getUserInitials(): string {
    const name = this.getUserName();
    if (!name) return 'U';
    
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
}
export default new AuthService();