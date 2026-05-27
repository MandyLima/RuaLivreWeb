import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import authService from '../services/authService';
import ChangePasswordForm from './ChangePassword';
import './Password.css'; 

type SettingsTab = 'perfil' | 'senha';

interface SettingsPageProps {
  onClose?: () => void;
}

export default function SettingsPage({ onClose }: SettingsPageProps) {
  const [tab, setTab] = useState<SettingsTab>('perfil');

  const rawName      = authService.getUserName() ?? '';
  const rawEmail = rawName; 
  const displayEmail = rawEmail;
  const displayName  = rawName.includes('@') ? rawName.split('@')[0] : rawName;

  const [name, setName]                     = useState(displayName);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(0);
  const [photoUrl, setPhotoUrl]             = useState<string | null>(null);
  const fileInputRef                        = useRef<HTMLInputElement>(null);

  const AVATARS = ['#A8C5DA', '#B5C9F4', '#1E3A5F'];

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUrl(URL.createObjectURL(file));
    setSelectedAvatar(null);
  };

  const renderAvatar = (size: number) => {
    if (photoUrl) {
      return (
        <img src={photoUrl} alt="Avatar"
          style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', border: '3px solid #e2e8f0' }} />
      );
    }
    const bg = selectedAvatar !== null ? AVATARS[selectedAvatar] : '#CBD5E1';
    const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || '?';
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%', background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.35, fontWeight: 700, color: '#1E3A5F',
        border: '3px solid #e2e8f0', letterSpacing: '0.02em', flexShrink: 0,
      }}>
        {initials}
      </div>
    );
  };

  return (
    <div className="settings-layout">

      <aside className="settings-sidebar">
        <div className="settings-sidebar-header">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
          </svg>
          Área do Usuário 
        </div>

        <div className="settings-nav-section">Conta</div>

        <button className={`settings-nav-item ${tab === 'perfil' ? 'active' : ''}`}
          onClick={() => setTab('perfil')}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          Perfil
        </button>

        <button className={`settings-nav-item ${tab === 'senha' ? 'active' : ''}`}
          onClick={() => setTab('senha')}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Senha
        </button>
      </aside>

      <main className="settings-content">

        {onClose && (
          <button onClick={onClose}
            style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}
            aria-label="Fechar">✕</button>
        )}

        {tab === 'perfil' && (
          <>
            <div className="settings-content-header">
              <h2 className="settings-content-title">Perfil</h2>
              <p className="settings-content-desc">Gerencie seu nome e avatar.</p>
            </div>

            <section className="settings-section">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                {renderAvatar(72)}
                <div>
                  <p style={{ fontWeight: 600, margin: 0 }}>{name || displayName}</p>
                  <p style={{ color: '#6B7280', fontSize: 13, margin: 0 }}>{displayEmail}</p>
                </div>
              </div>

              <div className="settings-field">
                <label className="settings-label">Nome</label>
                <div className="settings-input-wrap">
                  <input className="settings-input" value={name}
                    onChange={e => setName(e.target.value)} placeholder="Seu nome" />
                </div>
              </div>

              <div className="settings-field">
                <label className="settings-label">Avatar</label>
                <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                  {AVATARS.map((color, i) => (
                    <button key={i} onClick={() => { setSelectedAvatar(i); setPhotoUrl(null); }}
                      style={{
                        width: 36, height: 36, borderRadius: '50%', background: color, border: 'none',
                        cursor: 'pointer', outline: selectedAvatar === i && !photoUrl ? '3px solid #6366f1' : 'none',
                        outlineOffset: 2,
                      }} />
                  ))}
                </div>
              </div>

              <div className="settings-field">
                <button className="btn-ghost"
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                  onClick={() => fileInputRef.current?.click()}>
                  <Camera size={15} /> Usar foto como avatar
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" capture="user"
                  style={{ display: 'none' }} onChange={handlePhotoCapture} />
              </div>

              <div className="settings-actions">
                <button className="btn-primary">Salvar alterações</button>
              </div>
            </section>
          </>
        )}

        {tab === 'senha' && (
          <>
            <div className="settings-content-header">
              <h2 className="settings-content-title">Senha e acesso</h2>
              <p className="settings-content-desc">Gerencie sua senha e opções de recuperação de conta.</p>
            </div>
            <ChangePasswordForm />
          </>
        )}

      </main>
    </div>
  );
}