import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button/button';
import { Card, CardHeader, CardTitle } from '../components/ui/Cards/card';
import { Input } from '../components/ui/Input/input';
import { Label } from '../components/ui/Label/label';
import authService from '../services/authService';
import type { RegistrarRequest } from '../types/api.types';
import './Register.css';
import PasswordToggle from '../components/ui/Toggle/PasswordToggle';

function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [sucesso, setSucesso] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
    const navigate = useNavigate();
    const [senhaFocada, setSenhaFocada] = useState(false);
    const requisitos = {
        tamanho: senha.length >= 6,
        maiuscula: /[A-Z]/.test(senha),
        minuscula: /[a-z]/.test(senha),
        numero: /[0-9]/.test(senha),
    };
    const senhasIguais = confirmarSenha.length > 0 && senha === confirmarSenha;
    const senhasDiferentes = confirmarSenha.length > 0 && senha !== confirmarSenha;
    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setErro('');

        const todasRequisitosOk = Object.values(requisitos).every(Boolean);

        if (!todasRequisitosOk) {
            setErro('A senha não atende aos requisitos mínimos.');
            return;
        }
        if (senha !== confirmarSenha) {
            setErro('As senhas não coincidem.');
            return;
        }
        setCarregando(true);

        try {
            await authService.registrar({ nome, email, senha } as RegistrarRequest);
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
                                    required />
                            </div>

                            <div className="input-group">
                                <Label htmlFor='senha'>Senha:</Label>
                                <div style={{ position: 'relative' }}>
                                    <Input id='senha' className='input-base' type={mostrarSenha ? 'text' : 'password'} placeholder='AfcI123!'
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        onFocus={() => setSenhaFocada(true)}
                                        required
                                    />
                                    <PasswordToggle
                                        mostrar={mostrarSenha}
                                        onClick={() => setMostrarSenha(!mostrarSenha)}
                                    />
                                </div>
                                {senhaFocada && (
                                    <div className="requisitos">
                                        <p className="requisitos-titulo">A senha deve conter:</p>
                                        <p className={requisitos.tamanho ? 'req-ok' : 'req-erro'}>
                                            {requisitos.tamanho ? '✓' : '✗'} Mínimo 6 caracteres
                                        </p>
                                        <p className={requisitos.maiuscula ? 'req-ok' : 'req-erro'}>
                                            {requisitos.maiuscula ? '✓' : '✗'} Uma letra maiúscula
                                        </p>
                                        <p className={requisitos.minuscula ? 'req-ok' : 'req-erro'}>
                                            {requisitos.minuscula ? '✓' : '✗'} Uma letra minúscula
                                        </p>
                                        <p className={requisitos.numero ? 'req-ok' : 'req-erro'}>
                                            {requisitos.numero ? '✓' : '✗'} Um número
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="input-group">
                                <Label htmlFor='confirmar-senha'>Confirmar Senha:</Label>
                                <div style={{ position: 'relative' }}>
                                    <Input id='confirmar-senha' className='input-base' type={mostrarConfirmar ? 'text' : 'password'} placeholder='AfcI123!'
                                        value={confirmarSenha}
                                        onChange={(e) => setConfirmarSenha(e.target.value)}
                                        required
                                    />
                                    <PasswordToggle
                                        mostrar={mostrarConfirmar}
                                        onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                                    />
                                </div>
                                {senhasDiferentes && (
                                    <p className="senha-diferente">As senhas não coincidem</p>
                                )}
                                {senhasIguais && (
                                    <p className="senha-igual">Senhas coincidem</p>
                                )}
                            </div>


                            <Button className="btn-register" type="submit">
                                Cadastrar
                            </Button>
                            <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                                <p>Já tem uma conta?</p><a href="/login">Entre aqui</a>
                            </div>
                        </Card>
                    </form>
                </div>
            </div>

            <div className="register-brand-side"></div>
        </section>
    );
}
export default Register;