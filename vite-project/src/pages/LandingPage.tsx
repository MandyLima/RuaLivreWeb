import { useEffect, useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
    const [menuAberto, setMenuAberto] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        const elements = document.querySelectorAll('.reveal');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const fecharMenu = () => setMenuAberto(false);

    return (
        <div className='landing-page'>

            {/* Navbar */}
            <nav className='navbar-container'>
                <span className='logo-titulo'>Rua Livre</span>

                {/* Links desktop */}
                <div className='navbar-links'>
                    <a href='#inicio' className='nav-link'>Início</a>
                    <a href='#funcao' className='nav-link'>Função</a>
                    <a href='#app' className='nav-link'>App</a>
                    <a href='#contato' className='nav-link'>Contato</a>
                </div>

                {/* Botão hamburguer */}
                <button
                    className={`hamburger ${menuAberto ? 'hamburger-aberto' : ''}`}
                    onClick={() => setMenuAberto(!menuAberto)}
                    aria-label="Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            {/* Menu mobile */}
            <div className={`menu-mobile ${menuAberto ? 'menu-mobile-aberto' : ''}`}>
                <a href='#inicio' className='menu-mobile-link' onClick={fecharMenu}>Início</a>
                <a href='#funcao' className='menu-mobile-link' onClick={fecharMenu}>Função</a>
                <a href='#app' className='menu-mobile-link' onClick={fecharMenu}>App</a>
                <a href='#contato' className='menu-mobile-link' onClick={fecharMenu}>Contato</a>
                <a href='/register' className='menu-mobile-link menu-mobile-cta' onClick={fecharMenu}>Cadastre-se</a>
            </div>

            {/* Overlay */}
            {menuAberto && (
                <div className='menu-overlay' onClick={fecharMenu} />
            )}

            {/* Hero Section */}
            <section id='inicio' className="hero-section">
                <div className='hero-content'>
                    <div className="hero-text">
                        <div className="hero-badge">
                            <span className="badge-dot"></span>
                            Sistema ativo 24h
                        </div>
                        <h1 className="hero-title">
                            Nossa plataforma monitora as vias urbanas em{' '}
                            <span className="hero-highlight">tempo real</span>.
                        </h1>
                        <p className='hero-description'>
                            Indica os pontos com maior ocorrência de alagamentos na sua cidade,
                            para que você chegue ao destino com segurança.
                        </p>
                        <button className='btn-register'>
                            <a href="/register">Cadastre-se</a>
                        </button>
                    </div>

                    <div className="hero-image reveal">
                        <img src='src/assets/mobileLogin.png' alt='Imagem do celular com o app' />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="feature-contain">
                    <div className="feature-image-wrap reveal">
                        <img src='src/assets/family.png' alt="Família usando o app" />
                    </div>
                    <div className="feature-text">
                        <span className="section-tag">Nossa missão</span>
                        <h2 className="feature-title">
                            Criado com o propósito para{' '}
                            <span className="feature-highlight">ajudar você!</span>
                        </h2>
                        <p className="feature-description">
                            Acreditamos que informação salva vidas. Por isso desenvolvemos uma
                            plataforma acessível para que qualquer cidadão possa saber, em segundos,
                            quais ruas estão em risco de alagamento — e tomar a rota mais segura.
                        </p>
                    </div>
                </div>
            </section>

            {/* Cards Section */}
            <section id='funcao' className="cards-section">
                <div className="cards-header">
                    <h2 className="cards-title">Veja o que nossa plataforma oferece</h2>
                    <p className="cards-subtitle">Três funcionalidades que mantêm você um passo à frente dos alagamentos.</p>
                </div>
                <div className="card-content">
                    <div className="card-body reveal">
                        <img src="src/assets/location.png" className="card-icon" alt="Ícone de localização" />
                        <h3>Veja os locais alagados</h3>
                        <p className="card-description">Acesse o mapa com os pontos de alagamento ativos agora, com atualização em tempo real.</p>
                    </div>
                    <div className="card-body reveal">
                        <img src="src/assets/dashboard.png" className="card-icon" alt="Ícone de dashboard" />
                        <h3>Veja a quantidade de bairros afetados</h3>
                        <p className="card-description">Painel com estatísticas dos bairros atingidos e nível de severidade de cada ocorrência.</p>
                    </div>
                    <div className="card-body reveal">
                        <img src="src/assets/map.png" className="card-icon" alt="Ícone de mapa" />
                        <h3>Mapa interativo</h3>
                        <p className="card-description">Explore a cidade, trace rotas seguras e receba alertas conforme você se movimenta.</p>
                    </div>
                </div>
            </section>

            {/* Seção IA */}
            <section className="ia-section">
                <div className="ia-container">
                    <div className="ia-text">
                        <span className="section-tag">Inteligência Artificial</span>
                        <h2 className="ia-title">
                            Tecnologia que <span className="feature-highlight">enxerga</span> o perigo por você
                        </h2>
                        <p className="ia-description">
                            O RuaLivre utiliza o modelo YOLO (You Only Look Once) — uma das IAs
                            mais avançadas em visão computacional — para analisar imagens das
                            câmeras municipais em tempo real e detectar automaticamente a
                            presença de alagamentos nas vias urbanas.
                        </p>
                        <div className="ia-steps">
                            <div className="ia-step">
                                <div className="ia-step-number">1</div>
                                <div>
                                    <h4>Captura</h4>
                                    <p>Câmeras IP transmitem vídeo contínuo das vias via protocolo RTSP</p>
                                </div>
                            </div>
                            <div className="ia-step">
                                <div className="ia-step-number">2</div>
                                <div>
                                    <h4>Análise</h4>
                                    <p>A IA processa cada imagem em até 5 segundos, identificando água e medindo o nível de alagamento</p>
                                </div>
                            </div>
                            <div className="ia-step">
                                <div className="ia-step-number">3</div>
                                <div>
                                    <h4>Alerta</h4>
                                    <p>Os dados são enviados à API e exibidos no mapa em tempo real para você</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ia-stats reveal">
                        <div className="ia-stat-card">
                            <span className="ia-stat-number">90%</span>
                            <span className="ia-stat-label">de precisão na detecção</span>
                        </div>
                        <div className="ia-stat-card">
                            <span className="ia-stat-number">5s</span>
                            <span className="ia-stat-label">tempo de processamento</span>
                        </div>
                        <div className="ia-stat-card">
                            <span className="ia-stat-number">24h</span>
                            <span className="ia-stat-label">monitoramento contínuo</span>
                        </div>
                        <div className="ia-stat-card">
                            <span className="ia-stat-number">100+</span>
                            <span className="ia-stat-label">requisições simultâneas</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* App */}
            <div id='app' className="text-app reveal">
                <h2>Utilize o nosso aplicativo</h2>
                <p className="app-description">
                    Tenha alertas de alagamento sempre com você.
                    Disponível em breve gratuitamente para Android.
                </p>
                <button className="btn-app" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                    Em breve
                </button>
            </div>

            {/* Footer */}
            <footer className="footer-content">
                <div className="footer-brand">
                    <span className='logo-titulo'>Rua Livre</span>
                    <p className="footer-brand-desc">
                        Monitoramento de alagamentos urbanos.<br />
                        Desenvolvido na Fatec Praia Grande.
                    </p>
                </div>

                <ul className="footer-column">
                    <li><h4>Resources</h4></li>
                    <li><a href="#inicio" className="footer-link">Início</a></li>
                    <li><a href="#funcao" className="footer-link">Função</a></li>
                    <li><a href="#app" className="footer-link">App</a></li>
                    <li><a href="#contato" className="footer-link">Contato</a></li>
                </ul>

                <ul id='contato' className="footer-column">
                    <li><h4>Suporte</h4></li>
                    <li><a href="https://github.com/MandyLima" className="footer-link">Amanda</a></li>
                    <li><a href="#" className="footer-link">Carlos</a></li>
                    <li><a href="https://github.com/Frank1br" className="footer-link">Frank</a></li>
                    <li><a href="https://github.com/isabelamarchesoni" className="footer-link">Isabela</a></li>
                </ul>

                <p className="footer-copyright">
                    © 2025 Rua Livre. Desenvolvido por estudantes da Fatec Praia Grande
                </p>
            </footer>

        </div>
    );
}

export default LandingPage;