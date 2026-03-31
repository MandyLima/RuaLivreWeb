import { useEffect } from 'react';
import './LandingPage.css';

const LandingPage = () => {

useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Quando o item entra na tela, adiciona a classe
                entry.target.classList.add('active');
            } else {
                // Isso faz com que a animação resete para rodar de novo
                entry.target.classList.remove('active');
            }
        });
    }, { 
        threshold: 0.1, // Dispara quando 10% aparece
        rootMargin: "0px 0px -50px 0px" // Pequena margem para a animação não ser cortada
    });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
}, []);

return(
        <div className='landing-page'>

            {/* Navbar */}
            <nav className='navbar-container'>
                <span className='logo-titulo'>Rua Livre</span>
                <div className='navbar-links'>
                    <a href='#inicio' className='nav-link'>Início</a>
                    <a href='#funcao' className='nav-link'>Função</a>
                    <a href='#app' className='nav-link'>App</a>
                    <a href='#contato' className='nav-link'>Contato</a>
                </div>
            </nav>

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
                        <button className='btn-register'>Cadastre-se</button>
                    </div>

                    <div className="hero-image reveal">
                        <img src='src/assets/mobileLogin.png' alt='Imagem do celular com o app'/>
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
                        <img src="src/assets/location.png" className="card-icon" alt="Ícone de localização"/>
                        <h3>Veja os locais alagados</h3>
                        <p className="card-description">Acesse o mapa com os pontos de alagamento ativos agora, com atualização em tempo real.</p>
                    </div>
                    <div className="card-body reveal">
                        <img src="src/assets/dashboard.png" className="card-icon" alt="Ícone de dashboard"/>
                        <h3>Veja a quantidade de bairros afetados</h3>
                        <p className="card-description">Painel com estatísticas dos bairros atingidos e nível de severidade de cada ocorrência.</p>
                    </div>
                    <div className="card-body reveal">
                        <img src="src/assets/map.png" className="card-icon" alt="Ícone de mapa"/>
                        <h3>Mapa interativo</h3>
                        <p className="card-description">Explore a cidade, trace rotas seguras e receba alertas conforme você se movimenta.</p>
                    </div>
                </div>
            </section>

            {/* App */}
            <div id='app'className="text-app reveal">
                <h2>Utilize o nosso aplicativo</h2>
                <p className="app-description">
                    Tenha alertas de alagamento sempre com você.
                    Disponível gratuitamente para Android.
                </p>
                <button className="btn-app">Baixe agora</button>
            </div>

            {/* Footer */}
            <footer className="footer-content">
                <div className="footer-brand">
                    <span className='logo-titulo'>Rua Livre</span>
                    <p className="footer-brand-desc">
                        Monitoramento de alagamentos urbanos.<br/>
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