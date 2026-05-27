import { useState, type FormEvent } from 'react';
import PasswordToggle from '../components/ui/Toggle/PasswordToggle';
import authService from '../services/authService';
import './Password.css';

export default function ChangePassword() {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mostrarAtual, setMostrarAtual] = useState(false);
  const [mostrarNova, setMostrarNova] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const senhasIguais = confirmarSenha.length > 0 && novaSenha === confirmarSenha;
  const senhasDiferentes = confirmarSenha.length > 0 && novaSenha !== confirmarSenha;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (novaSenha.length < 6) {
      setErro('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setCarregando(true);
    try {
      await authService.changePassword({ senha_atual: senhaAtual, nova_senha: novaSenha });
      setSucesso('Senha alterada com sucesso!');
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');
      setTimeout(() => setSucesso(''), 4000);
    } catch (error: any) {
      setErro(error.response?.data?.detail || 'Erro ao alterar senha.');
    } finally {
      setCarregando(false);
    }
  };

  const handleCancel = () => {
    setSenhaAtual('');
    setNovaSenha('');
    setConfirmarSenha('');
    setErro('');
    setSucesso('');
  };

  return (
    <div className="settings-layout">
      <aside className="settings-sidebar">
        <div className="settings-sidebar-header">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
          </svg>
          Configurações
        </div>

        <div className="settings-nav-section">Conta</div>
        <button className="settings-nav-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          Perfil
        </button>
        <button className="settings-nav-item active">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Senha
        </button>
      </aside>

      <main className="settings-content">
        <div className="settings-content-header">
          <h2 className="settings-content-title">Senha e acesso</h2>
          <p className="settings-content-desc">Gerencie sua senha de acesso à conta.</p>
        </div>

        <section className="settings-section">
          <h3 className="settings-section-title">Trocar senha</h3>
          <form onSubmit={handleSubmit} className="settings-form">
            <div className="settings-field">
              <label className="settings-label" htmlFor="cp-atual">Senha atual</label>
              <div className="settings-input-wrap">
                <input
                  id="cp-atual"
                  className="settings-input"
                  type={mostrarAtual ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={senhaAtual}
                  onChange={e => setSenhaAtual(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <PasswordToggle mostrar={mostrarAtual} onClick={() => setMostrarAtual(v => !v)} />
              </div>
            </div>

            <div className="settings-field">
              <label className="settings-label" htmlFor="cp-nova">Nova senha</label>
              <div className="settings-input-wrap">
                <input
                  id="cp-nova"
                  className="settings-input"
                  type={mostrarNova ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  value={novaSenha}
                  onChange={e => setNovaSenha(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <PasswordToggle mostrar={mostrarNova} onClick={() => setMostrarNova(v => !v)} />
              </div>
            </div>

            <div className="settings-field">
              <label className="settings-label" htmlFor="cp-conf">Confirmar nova senha</label>
              <div className="settings-input-wrap">
                <input
                  id="cp-conf"
                  className="settings-input"
                  type={mostrarConfirmar ? 'text' : 'password'}
                  placeholder="Repita a nova senha"
                  value={confirmarSenha}
                  onChange={e => setConfirmarSenha(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <PasswordToggle mostrar={mostrarConfirmar} onClick={() => setMostrarConfirmar(v => !v)} />
              </div>
              {senhasDiferentes && <p className="settings-hint error">✗ As senhas não coincidem</p>}
              {senhasIguais && <p className="settings-hint success">✓ Senhas coincidem</p>}
            </div>

            {erro && <p className="settings-msg error">{erro}</p>}
            {sucesso && <p className="settings-msg success">{sucesso}</p>}

            <div className="settings-actions">
              <button className="btn-primary" type="submit" disabled={carregando}>
                {carregando ? 'Salvando...' : 'Salvar senha'}
              </button>
              <button className="btn-ghost" type="button" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
