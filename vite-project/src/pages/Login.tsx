import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button/button';
import { Card, CardHeader, CardTitle } from '../components/ui/Cards/card';
import { Input } from '../components/ui/Input/input';
import { Label } from '../components/ui/Label/label';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const MOCK_EMAIL = "adminRuaLivre@gmail.com";
        const MOCK_PASS = "RuaLivre";

        if (email === MOCK_EMAIL && senha === MOCK_PASS) {
            alert("Sucesso! Entrando no sistema...");
            navigate("/");
        } else {
            alert("Email ou senha incorretos!");
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
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="input-group">
                                <Label htmlFor='senha'>Senha:</Label>
                                <Input id='senha' className='input-base' type='password' placeholder='AfcI123!'
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)} />
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
export default Login;