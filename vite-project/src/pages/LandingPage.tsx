import './LandingPage.css';

function LandingPage(){
    return(
        <div className ='landing-page'>
            <nav className='navbar-container'>
                <span className='logo-titulo'>Rua Livre</span>
                    <div className='navbar-links'>
                        <a href='#' className='nav-link'>Início</a>
                        <a href='#' className='nav-link'>Função</a>
                        <a href='#' className='nav-link'>App</a>
                    </div>
            </nav>  
            {/* // Hero Section */}
            <section className="hero-section">
                <div className='hero-content'>
                    <div className="hero-text">
                        <p className='hero-description'>Nossa plataforma monitora as vias urbanas em tempo real e indica os pontos com maior ocorrência de alagamentos na sua cidade.</p>
                        <button className='btn-register'>Cadastre-se</button>
                    </div>
                    
                    <div className="hero-image">
                        <img src='src/assets/celular.png' alt='imagem do celular'/>
                    </div>
                </div>

            </section>

        </div>
        

        
    );
}
export default LandingPage;