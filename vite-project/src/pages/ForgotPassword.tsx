import { useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordToggle from '../components/ui/Toggle/PasswordToggle';
import authService from '../services/authService';
import './Login.css';
import './Password.css';
import './ForgotPassword.css';

type Etapa = 'email' | 'codigo';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState<Etapa>('email');

  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);

  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarNova, setMostrarNova] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const senhasIguais = confirmarSenha.length > 0 && novaSenha === confirmarSenha;
  const senhasDiferentes = confirmarSenha.length > 0 && novaSenha !== confirmarSenha;

  const handleEnviarCodigo = async (e: FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setCarregando(true);

    try {
      await authService.forgotPassword(email);
      setSucesso('Se este email estiver cadastrado, você receberá o código em instantes.');
      setTimeout(() => {
        setSucesso('');
        setEtapa('codigo');
      }, 1500);
    } catch (err: any) {
      if (err.response?.status === 429) {
        setErro('Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.');
      } else {
        setErro(err.response?.data?.detail || 'Erro ao enviar. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  const handleCodigoChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const novo = [...codigo];
    novo[index] = value;
    setCodigo(novo);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleCodigoKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleCodigoPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const novo = ['', '', '', '', '', ''];
    pasted.split('').forEach((char, i) => { novo[i] = char; });
    setCodigo(novo);
    const nextEmpty = novo.findIndex(v => !v);
    inputsRef.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };

  const handleRedefinir = async (e: FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    const codigoStr = codigo.join('');
    if (codigoStr.length < 6) {
      setErro('Informe o código completo de 6 dígitos.');
      return;
    }
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
      await authService.resetPassword({ email, codigo: codigoStr, nova_senha: novaSenha });
      setSucesso('Senha redefinida com sucesso! Redirecionando para o login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      const detail = error.response?.data?.detail;
      if (detail === 'Código inválido ou expirado') {
        setErro('Código inválido ou expirado. Solicite um novo.');
      } else if (detail === 'A nova senha não pode ser igual à senha atual') {
        setErro('A nova senha não pode ser igual à senha atual.');
      } else {
        setErro(detail || 'Erro ao redefinir senha. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  const voltarParaEmail = () => {
    setEtapa('email');
    setErro('');
    setSucesso('');
    setCodigo(['', '', '', '', '', '']);
    setNovaSenha('');
    setConfirmarSenha('');
  };

  return (
    <section className="login-section">
      <div className="login-form-side">
        <div className="form-wrapper">
          <div className="fp-card">
            <h1 className="card-title">Recuperar senha</h1>

            {etapa === 'email' && (
              <>
                <p className="fp-desc">
                  Informe o email cadastrado para receber um código de 6 dígitos.
                </p>
                <form onSubmit={handleEnviarCodigo} className="settings-form">
                  <div className="settings-field">
                    <label className="settings-label" htmlFor="fp-email">Email</label>
                    <div className="settings-input-wrap">
                      <input
                        id="fp-email"
                        className="settings-input"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  {erro && <p className="settings-msg error">{erro}</p>}
                  {sucesso && <p className="settings-msg success">{sucesso}</p>}

                  <div className="settings-actions">
                    <button className="btn-primary" type="submit" disabled={carregando}>
                      {carregando ? 'Enviando...' : 'Enviar código'}
                    </button>
                  </div>
                </form>
              </>
            )}

            {etapa === 'codigo' && (
              <>
                <p className="fp-desc">
                  Insira o código de 6 dígitos enviado para <strong>{email}</strong> e defina sua nova senha.
                </p>
                <form onSubmit={handleRedefinir} className="settings-form">
                  <div className="settings-field">
                    <label className="settings-label">Código de verificação</label>
                    <div className="otp-wrap">
                      {codigo.map((digit, i) => (
                        <input
                          key={i}
                          ref={el => { inputsRef.current[i] = el; }}
                          className="otp-input"
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={e => handleCodigoChange(i, e.target.value)}
                          onKeyDown={e => handleCodigoKeyDown(i, e)}
                          onPaste={i === 0 ? handleCodigoPaste : undefined}
                          autoFocus={i === 0}
                          aria-label={`Dígito ${i + 1} do código`}
                        />
                      ))}
                    </div>
                    <p className="settings-hint neutral">
                      Não recebeu?{' '}
                      <button type="button" className="link-btn" onClick={voltarParaEmail}>
                        Reenviar código
                      </button>
                    </p>
                  </div>

                  <div className="settings-field">
                    <label className="settings-label" htmlFor="fp-nova">Nova senha</label>
                    <div className="settings-input-wrap">
                      <input
                        id="fp-nova"
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
                    <label className="settings-label" htmlFor="fp-conf">Confirmar nova senha</label>
                    <div className="settings-input-wrap">
                      <input
                        id="fp-conf"
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
                      {carregando ? 'Redefinindo...' : 'Redefinir senha'}
                    </button>
                    <button className="btn-ghost" type="button" onClick={voltarParaEmail}>
                      Voltar
                    </button>
                  </div>
                </form>
              </>
            )}

            <div className="fp-footer">
              <Link to="/login">← Voltar ao login</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="login-brand-side"></div>
    </section>
  );
}
