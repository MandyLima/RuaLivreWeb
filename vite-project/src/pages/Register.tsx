import { useState, type FormEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button/button';
import { Card, CardHeader, CardTitle } from '../components/ui/Cards/card';
import { Input } from '../components/ui/Input/input';
import { Label } from '../components/ui/Label/label';
import authService from '../services/authService';
import type { RegistrarRequest } from '../types/api.types';
import './Register.css';

function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');           
    const [carregando, setCarregando] = useState(false);
    const [sucesso, setSucesso] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setErro('');

    // Validar tamanho mínimo da senha
    if (senha.length > 15 || senha.length < 6) {
      setErro('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setCarregando(true);

    try {
      const payload: RegistrarRequest = {
        nome: nome,
        email: email,
        senha: senha,
        nivel_acesso: "usuario"
      };
      
      await authService.registrar(payload);
      setSucesso(true);
      alert('Cadastro realizado com sucesso! Faça login agora.');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error: any) {
      const mensagemErro = error.response?.data?.message || 'Erro ao cadastrar usuário';
      setErro(mensagemErro);
    } finally {
      setCarregando(false);
    }
  };

    return (
        <section className="register-section">
            {/* Lado Esquerdo - O Formulário agora vem primeiro */}
            <div className="register-form-side">
                <div className="form-wrapper">
                    <form onSubmit={handleRegister}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="card-title">Cadastre-se</CardTitle>
                            </CardHeader>

                            <div className="input-group">
                                <Label htmlFor='usuario'>Usuário:</Label>
                                <Input id='usuario' className='input-base' type='text' placeholder='usuário'
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                    />
                            </div>

                            <div className="input-group">
                                <Label htmlFor='email'>Email:</Label>
                                <Input id='email' className='input-base' type='text' placeholder='user@gmail.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required/>
                            </div>

                            <div className="input-group">
                                <Label htmlFor='senha'>Senha:</Label>
                                <Input id='senha' className='input-base' type='password' placeholder='AfcI123!'
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)} 
                                    required
                                    />
                            </div>

                            <Button className="btn-register" type="submit">
                                Cadastrar
                            </Button>
                            <a href="/login">Já tem uma conta? Entre aqui</a>
                        </Card>
                    </form>
                </div>
            </div>

            <div className="register-brand-side"></div>
        </section>
    );
}
export default Register;