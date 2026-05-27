import { useState, useRef } from 'react';
import { ChevronRight, Pencil, Lock, LogOut, ArrowLeft, Camera, X } from 'lucide-react';
import authService from './../services/authService';
import styles from './ProfilePage.module.css';

interface ProfilePageProps {
  isMobile?: boolean;
  onClose?: () => void;
}

type ProfileView = 'main' | 'editar' | 'senha';

export default function ProfilePage({ isMobile = false, onClose }: ProfilePageProps) {
  const [view, setView] = useState<ProfileView>('main');

  const rawName  = authService.getUserName() ?? '';
  const rawEmail = rawName; 
  const displayName  = rawName.includes('@') ? rawName.split('@')[0] : rawName;
  const displayEmail = rawEmail;

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

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const renderAvatar = (size: number, inHeader = false) => {
    if (photoUrl) {
      return (
        <img
          src={photoUrl}
          alt="Avatar"
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            objectFit: 'cover',
            border: inHeader ? '3px solid rgba(255,255,255,0.4)' : '3px solid #e2e8f0',
          }}
        />
      );
    }
    const bg = selectedAvatar !== null ? AVATARS[selectedAvatar] : '#CBD5E1';
    const initials = name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() || '?';
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.35,
          fontWeight: 700,
          color: inHeader ? '#fff' : '#1E3A5F',
          border: inHeader ? '3px solid rgba(255,255,255,0.4)' : '3px solid #e2e8f0',
          letterSpacing: '0.02em',
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
    );
  };

  const EditarPerfil = () => (
    <div className={styles.subPage}>
      <button className={styles.backBtn} onClick={() => setView('main')}>
        <ArrowLeft size={20} />
        <span>Editar perfil</span>
      </button>

      <div className={styles.editAvatarSection}>
        {renderAvatar(80)}
        <p className={styles.emailLabel}>{displayEmail}</p>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Nome</label>
        <input
          className={styles.fieldInput}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
        />
      </div>

      <div className={styles.avatarPicker}>
        <p className={styles.fieldLabel}>Escolha um avatar</p>
        <div className={styles.avatarRow}>
          {AVATARS.map((color, i) => (
            <button
              key={i}
              className={`${styles.avatarOption} ${
                selectedAvatar === i && !photoUrl ? styles.avatarSelected : ''
              }`}
              style={{ background: color }}
              onClick={() => { setSelectedAvatar(i); setPhotoUrl(null); }}
            />
          ))}
        </div>
      </div>
      <button className={styles.cameraBtn} onClick={() => fileInputRef.current?.click()}>
        <Camera size={16} />
        Tirar foto e usar como avatar
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        style={{ display: 'none' }}
        onChange={handlePhotoCapture}
      />

      <button className={styles.saveBtn} onClick={() => setView('main')}>
        Salvar alterações
      </button>
    </div>
  );

  const TrocarSenha = () => {
    const [atual, setAtual]       = useState('');
    const [nova, setNova]         = useState('');
    const [confirma, setConfirma] = useState('');

    return (
      <div className={styles.subPage}>
        <button className={styles.backBtn} onClick={() => setView('main')}>
          <ArrowLeft size={20} />
          <span>Trocar senha</span>
        </button>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>Senha atual</label>
          <input
            className={styles.fieldInput}
            type="password"
            value={atual}
            onChange={(e) => setAtual(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Nova senha</label>
          <input
            className={styles.fieldInput}
            type="password"
            value={nova}
            onChange={(e) => setNova(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Confirmar nova senha</label>
          <input
            className={styles.fieldInput}
            type="password"
            value={confirma}
            onChange={(e) => setConfirma(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button className={styles.saveBtn} onClick={() => setView('main')}>
          Salvar senha
        </button>
      </div>
    );
  };

  const MainProfile = () => (
    <>
      {onClose && (
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Fechar perfil"
        >
          <X size={20} />
        </button>
      )}

      <div className={styles.profileHeader}>
        {renderAvatar(isMobile ? 76 : 100, true)}
        <h2 className={styles.profileName}>{name}</h2>
        <p className={styles.profileEmail}>{displayEmail}</p>
      </div>

      <div className={styles.menuList}>
        <button className={styles.menuItem} onClick={() => setView('editar')}>
          <span className={styles.menuIcon}><Pencil size={18} /></span>
          <span className={styles.menuLabel}>Editar perfil</span>
          <ChevronRight size={16} className={styles.menuChevron} />
        </button>

        <button className={styles.menuItem} onClick={() => setView('senha')}>
          <span className={styles.menuIcon}><Lock size={18} /></span>
          <span className={styles.menuLabel}>Trocar senha</span>
          <ChevronRight size={16} className={styles.menuChevron} />
        </button>

        <button className={`${styles.menuItem} ${styles.logoutItem}`} onClick={handleLogout}>
          <span className={`${styles.menuIcon} ${styles.logoutIcon}`}><LogOut size={18} /></span>
          <span className={styles.logoutLabel}>Sair</span>
        </button>
      </div>
    </>
  );

  const content = () => {
    if (view === 'editar') return <EditarPerfil />;
    if (view === 'senha')  return <TrocarSenha />;
    return <MainProfile />;
  };

  return (
    <div
      className={`${styles.wrapper} ${isMobile ? styles.mobile : styles.desktop}`}
      style={{ position: 'relative' }}
    >
      {content()}
    </div>
  );
}