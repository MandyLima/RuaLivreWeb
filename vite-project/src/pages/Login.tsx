// Login.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button/button';
import { Card, CardHeader, CardTitle } from '../components/ui/Cards/card';
import { Input } from '../components/ui/Input/input';
import { Label } from '../components/ui/Label/label';
import PasswordToggle from '../components/ui/Toggle/PasswordToggle';
import './Login.css';
import authService from '../services/authService';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setErro('');
        setCarregando(true);

        try {
            await authService.login({ email, senha });
            alert('Login realizado com sucesso!');
            navigate('/dashboard');
        } catch (error: any) {
            const mensagemErro = error.response?.data?.message || 'Erro ao fazer login.';
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
                                <Input
                                    id='email'
                                    className='input-base'
                                    type='text'
                                    placeholder='user@gmail.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <Label htmlFor='senha'>Senha:</Label>
                                <div style={{ position: 'relative' }}>
                                    <Input
                                        id='senha'
                                        className='input-base'
                                        type={mostrarSenha ? 'text' : 'password'}
                                        placeholder='AfcI123!'
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        required
                                    />
                                    <PasswordToggle
                                        mostrar={mostrarSenha}
                                        onClick={() => setMostrarSenha(!mostrarSenha)}
                                    />
                                </div>
                            </div>

                            {erro && <p style={{ color: 'red', fontSize: 13 }}>{erro}</p>}

                            <Button className="btn-register" type="submit" disabled={carregando}>
                                {carregando ? 'Entrando...' : 'Entrar'}
                            </Button>
                            <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                                <p>Não tem uma conta? </p><a href="/register">Cadastre-se</a>
                            </div>
                        </Card>
                    </form>
                </div>
            </div>
            <div className="login-brand-side"></div>
        </section>
    );
}

export default Login;