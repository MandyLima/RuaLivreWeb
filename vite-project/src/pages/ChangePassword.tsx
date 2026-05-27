import { useState, type FormEvent } from 'react';
import PasswordToggle from '../components/ui/Toggle/PasswordToggle';
import authService from '../services/authService';
import './Password.css'; 

export default function ChangePasswordForm() {
  const [senhaAtual, setSenhaAtual]       = useState('');
  const [novaSenha, setNovaSenha]         = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro]                   = useState('');
  const [sucesso, setSucesso]             = useState('');
  const [carregando, setCarregando]       = useState(false);
  const [mostrarAtual, setMostrarAtual]   = useState(false);
  const [mostrarNova, setMostrarNova]     = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const senhasIguais    = confirmarSenha.length > 0 && novaSenha === confirmarSenha;
  const senhasDiferentes = confirmarSenha.length > 0 && novaSenha !== confirmarSenha;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro(''); setSucesso('');
    if (novaSenha.length < 6) { setErro('A nova senha deve ter no mínimo 6 caracteres.'); return; }
    if (novaSenha !== confirmarSenha) { setErro('As senhas não coincidem.'); return; }
    setCarregando(true);
    try {
      await authService.changePassword({ senha_atual: senhaAtual, nova_senha: novaSenha });
      setSucesso('Senha alterada com sucesso!');
      setSenhaAtual(''); setNovaSenha(''); setConfirmarSenha('');
      setTimeout(() => setSucesso(''), 4000);
    } catch (error: any) {
      setErro(error.response?.data?.detail || 'Erro ao alterar senha.');
    } finally {
      setCarregando(false);
    }
  };

  const handleCancel = () => {
    setSenhaAtual(''); setNovaSenha(''); setConfirmarSenha('');
    setErro(''); setSucesso('');
  };

  return (
    <section className="settings-section">
      <h3 className="settings-section-title">Trocar senha</h3>
      <form onSubmit={handleSubmit} className="settings-form">

        <div className="settings-field">
          <label className="settings-label" htmlFor="cp-atual">Senha atual</label>
          <div className="settings-input-wrap">
            <input id="cp-atual" className="settings-input"
              type={mostrarAtual ? 'text' : 'password'} placeholder="••••••••"
              value={senhaAtual} onChange={e => setSenhaAtual(e.target.value)}
              autoComplete="current-password" required />
            <PasswordToggle mostrar={mostrarAtual} onClick={() => setMostrarAtual(v => !v)} />
          </div>
        </div>

        <div className="settings-field">
          <label className="settings-label" htmlFor="cp-nova">Nova senha</label>
          <div className="settings-input-wrap">
            <input id="cp-nova" className="settings-input"
              type={mostrarNova ? 'text' : 'password'} placeholder="Mínimo 6 caracteres"
              value={novaSenha} onChange={e => setNovaSenha(e.target.value)}
              autoComplete="new-password" required />
            <PasswordToggle mostrar={mostrarNova} onClick={() => setMostrarNova(v => !v)} />
          </div>
        </div>

        <div className="settings-field">
          <label className="settings-label" htmlFor="cp-conf">Confirmar nova senha</label>
          <div className="settings-input-wrap">
            <input id="cp-conf" className="settings-input"
              type={mostrarConfirmar ? 'text' : 'password'} placeholder="Repita a nova senha"
              value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)}
              autoComplete="new-password" required />
            <PasswordToggle mostrar={mostrarConfirmar} onClick={() => setMostrarConfirmar(v => !v)} />
          </div>
          {senhasDiferentes && <p className="settings-hint error">✗ As senhas não coincidem</p>}
          {senhasIguais     && <p className="settings-hint success">✓ Senhas coincidem</p>}
        </div>

        {erro   && <p className="settings-msg error">{erro}</p>}
        {sucesso && <p className="settings-msg success">{sucesso}</p>}

        <div className="settings-actions">
          <button className="btn-primary" type="submit" disabled={carregando}>
            {carregando ? 'Salvando...' : 'Salvar senha'}
          </button>
          <button className="btn-ghost" type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </section>
  );
}