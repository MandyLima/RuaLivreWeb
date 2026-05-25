import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button/button';
import { Card, CardHeader, CardTitle } from '../components/ui/Cards/card';
import { Input } from '../components/ui/Input/input';
import { Label } from '../components/ui/Label/label';
import './Login.css';
import authService from '../services/authService';


function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await authService.login({ email, senha });
      alert('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error: any) {
      const mensagemErro = error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.';
      setErro(mensagemErro);
    } finally {
      setCarregando(false);
    }
  };


    return (
        <section className="login-section">
            <div className="login-form-side">
                <div className="form-wrapper">
                    <form onSubmit={handleLogin}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="card-title">Entrar</CardTitle>
                            </CardHeader>

                            <div className="input-group">
                                <Label htmlFor='email'>Email:</Label>
                                <Input id='email' className='input-base' type='text' placeholder='user@gmail.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required
                                    />
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
                                Entrar
                            </Button>
                            <a href="/register">Não tem uma conta? Cadastre-se</a>
                        </Card>
                    </form>
                </div>
            </div>

            <div className="login-brand-side"></div>
        </section>
    );
}
export default Login