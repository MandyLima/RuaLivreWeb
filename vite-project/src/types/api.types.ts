export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegistrarRequest {
  nome: string;
  email: string;
  senha: string;
  nivel_acesso: "usuario";  
}

export interface LoginResponse {
  access_token: string;
}

export interface RegistrarResponse {
  nome: string;
  email: string;
}
export interface TokenResponse{
  acess_token: string;
  token_type: string;
}

// Dashboard

export interface AlagamentoPorRegiao {
  regiao: string;
  quantidade: number;
}

export interface DashboardStats {
  total_alagamentos_ativos: number;
  total_cameras_ativas: number;
  total_alertas_hoje: number;
  total_bairros_monitorados: number;
  alagamentos_por_regiao: AlagamentoPorRegiao[]; // ← separei em interface própria
}
export interface Historico {
  data: string;
  total_ocorrencias: number;
  nivel_agua_medio: number;
}

export interface DashboardHistorico {
  historico: Historico[];
}
export interface Camera {
  id: number;
  regiao_id: number;
  endereco_rtsp: string;
  localizacao: string;
  status: string;
  latitude: number;
  longitude: number;
  altitude_m: number;
  bairro: string;
  municipio: string;
}

export interface Alagamento {
  id: number;
  camera_id: number;
  regiao_id: number;
  nivel_agua: number;
  confianca: number;
  status: string;
  data_hora: string;
  latitude: number;
  longitude: number;
  bairro: string;
  municipio: string;
}