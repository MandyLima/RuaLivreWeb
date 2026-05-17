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
  token: string;
}

export interface RegistrarResponse {
  nome: string;
  email: string;
}
export interface TokenResponse{
  acess_token: string;
  token_type: string;
}