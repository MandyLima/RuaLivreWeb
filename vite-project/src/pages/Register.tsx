import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button/button';
import { Card, CardHeader, CardTitle } from '../components/ui/Cards/card';
import { Input } from '../components/ui/Input/input';
import { Label } from '../components/ui/Label/label';
import './Register.css';

function Register() {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const MOCK_USER = "admin";
        const MOCK_EMAIL = "adminRuaLivre@gmail.com";
        const MOCK_PASS = "RuaLivre";

        if (usuario === MOCK_USER && email === MOCK_EMAIL && senha === MOCK_PASS) {
            alert("Sucesso! Entrando no sistema...");
            navigate("/login");
        } else {
            alert("Preencha todos os campos corretamente!");
        }
    };
    return (
        <section className="register-section">
            {/* Lado Esquerdo - O Formulário agora vem primeiro */}
            <div className="register-form-side">
                <div className="form-wrapper">
                    <form onSubmit={handleLogin}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="card-title">Cadastre-se</CardTitle>
                            </CardHeader>

                            <div className="input-group">
                                <Label htmlFor='usuario'>Usuário:</Label>
                                <Input id='usuario' className='input-base' type='text' placeholder='usuário'
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)} />
                            </div>

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
                                Cadastrar
                            </Button>
                        </Card>
                    </form>
                </div>
            </div>

            <div className="register-brand-side"></div>
        </section>
    );
}
export default Register;