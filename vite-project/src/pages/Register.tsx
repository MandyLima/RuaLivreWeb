import { Button } from '../components/ui/Button/button';
import { Card, CardHeader, CardTitle } from '../components/ui/Cards/card';
import { Input } from '../components/ui/Input/input';
import { Label } from '../components/ui/Label/label';
import './Register.css';

function Register() {
    return (
        <section className="register-section">
            {/* Lado Esquerdo - O Formulário agora vem primeiro */}
            <div className="register-form-side">
                <div className="form-wrapper">
                    <Card>
                        <CardHeader>
                            <CardTitle className="card-title">Cadastre-se</CardTitle>
                        </CardHeader>

                        <div className="input-group">
                            <Label htmlFor='usuario'>Usuário:</Label>
                            <Input id='usuario' className='input-base' type='text' placeholder='usuário'/>
                        </div>

                        <div className="input-group">
                            <Label htmlFor='email'>Email:</Label>
                            <Input id='email' className='input-base' type='text' placeholder='user@gmail.com'/>
                        </div>
                        
                        <div className="input-group">
                            <Label htmlFor='senha'>Senha:</Label>
                            <Input id='senha' className='input-base' type='password' placeholder='AfcI123!'/>
                        </div>

                        <Button className="btn-register" type="submit">
                            Cadastrar
                        </Button>
                    </Card>
                </div>
            </div>

            <div className="register-brand-side"></div>
        </section>
    );
}
export default Register;