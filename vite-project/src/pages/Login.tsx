import { Button } from '../components/ui/Button/button';
import { Card, CardHeader, CardTitle } from '../components/ui/Cards/card';
import { Input } from '../components/ui/Input/input';
import { Label } from '../components/ui/Label/label';
import './Login.css';

function Login() {
    return (
        <section className="login-section">
            <div className="login-form-side">
                <div className="form-wrapper">
                    <Card>
                        <CardHeader>
                            <CardTitle className="card-title">Entrar</CardTitle>
                        </CardHeader>

                        <div className="input-group">
                            <Label htmlFor='usuario'>Usuário:</Label>
                            <Input id='usuario' className='input-base' type='text' placeholder='usuário'/>
                        </div>

                        <div className="input-group">
                            <Label htmlFor='senha'>Senha:</Label>
                            <Input id='senha' className='input-base' type='password' placeholder='AfcI123!'/>
                        </div>

                        <Button className="btn-register" type="submit">
                            Entrar
                        </Button>
                        <a href="/register">Não tem uma conta? Cadastre-se</a>
                    </Card>
                </div>
            </div>

            <div className="login-brand-side"></div>
        </section>
    );
}
export default Login;