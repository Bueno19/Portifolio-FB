import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';

export const Contact: React.FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault(); // Impede o recarregamento da página
        setLoading(true);

        if (form.current) {
            emailjs.sendForm(
                'service_hos84z5',    // <--- COLOCAR SEU SERVICE ID AQUI
                'template_bcivft4',   // <--- COLOCAR SEU TEMPLATE ID AQUI
                form.current,
                'Xq9S6JbTJbzsUQOjk'     // <--- COLOCAR SUA PUBLIC KEY AQUI
            )
            .then((result) => {
                console.log(result.text);
                setSuccess(true);
                setLoading(false);
                form.current?.reset(); // Limpa o formulário
                
                // Remove a mensagem de sucesso após 5 segundos
                setTimeout(() => setSuccess(false), 5000);
            }, (error) => {
                console.log(error.text);
                setLoading(false);
                alert("Ocorreu um erro ao enviar. Tente novamente.");
            });
        }
    };

    return (
        <SectionContainer id="contact">
            <Container>
                <HeaderContent>
                    <SectionTitle>
                        <span className="purple">async function</span> <span className="blue">contactMe</span>() {'{'}
                    </SectionTitle>
                    <SubTitle>// Vamos transformar sua ideia em realidade</SubTitle>
                </HeaderContent>

                <ContentGrid>
                    {/* Lado Esquerdo: Informações */}
                    <InfoCard>
                        <InfoTitle>Canais de Comunicação</InfoTitle>
                        <p>Estou disponível para novos projetos, freelas e parcerias.</p>
                        
                        <ContactList>
                            <ContactItem href="https://wa.link/20s88x" target="_blank" $isWhatsapp>
                                <Icon>📱</Icon>
                                <div>
                                    <strong>WhatsApp</strong>
                                    <span>Chamar agora</span>
                                </div>
                            </ContactItem>

                            <ContactItem href="https://github.com/Bueno19" target="_blank">
                                <Icon>💻</Icon>
                                <div>
                                    <strong>GitHub</strong>
                                    <span>github.com/Bueno19</span>
                                </div>
                            </ContactItem>

                            <ContactItem href="mailto:fe_br07@hotmail.com">
                                <Icon>📧</Icon>
                                <div>
                                    <strong>E-mail</strong>
                                    <span>fe_br07@hotmail.com</span>
                                </div>
                            </ContactItem>
                        </ContactList>
                    </InfoCard>

                    {/* Lado Direito: Formulário React com EmailJS */}
                    <FormCard>
                        <FormTitle>Envie uma mensagem</FormTitle>
                        
                        <Form ref={form} onSubmit={sendEmail}>
                            <InputGroup>
                                <Label>Nome</Label>
                                <Input type="text" placeholder="Seu nome" name="user_name" required />
                            </InputGroup>
                            
                            <InputGroup>
                                <Label>E-mail</Label>
                                <Input type="email" placeholder="seu@email.com" name="user_email" required />
                            </InputGroup>
                            
                            <InputGroup>
                                <Label>Mensagem</Label>
                                <TextArea placeholder="Como posso te ajudar?" name="message" rows={4} required />
                            </InputGroup>
                            
                            <SubmitButton type="submit" disabled={loading || success}>
                                {loading ? 'Enviando...' : success ? 'Mensagem Enviada! ✅' : 'Enviar Mensagem ->'}
                            </SubmitButton>
                            
                            {success && <SuccessMessage>Obrigado! Entrarei em contato em breve.</SuccessMessage>}
                        </Form>
                    </FormCard>
                </ContentGrid>
                
                <SectionClosing>{'}'}</SectionClosing>
            </Container>
        </SectionContainer>
    );
};

// --- Estilos ---

const SectionContainer = styled.section`
    width: 100%; padding: 100px 20px;
    background-color: #0b1120; display: flex; justify-content: center;
    border-top: 1px solid #1e293b;
`;

const Container = styled.div` width: 100%; max-width: 1200px; `;

const HeaderContent = styled.div` margin-bottom: 60px; text-align: center; `;

const SectionTitle = styled.h2`
    font-size: 2.5rem; color: #e2e8f0; margin-bottom: 10px; font-family: 'Fira Code', monospace;
    .purple { color: #c084fc; } .blue { color: #38bdf8; }
    @media (max-width: 768px) { font-size: 1.8rem; }
`;

const SubTitle = styled.p` color: #64748b; font-size: 1.1rem; font-family: 'Fira Code', monospace; `;

const SectionClosing = styled.h2`
    font-size: 2.5rem; text-align: center; color: #e2e8f0; margin-top: 40px; 
    font-family: 'Fira Code', monospace; opacity: 0.5;
`;

const ContentGrid = styled.div`
    display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
    @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const InfoCard = styled.div`
    padding: 20px;
    p { color: #94a3b8; margin-bottom: 30px; line-height: 1.6; }
`;

const InfoTitle = styled.h3` font-size: 1.8rem; color: #f1f5f9; margin-bottom: 20px; `;

const ContactList = styled.div` display: flex; flex-direction: column; gap: 20px; `;

const ContactItem = styled.a<{ $isWhatsapp?: boolean }>`
    display: flex; align-items: center; gap: 15px;
    text-decoration: none; padding: 15px; border-radius: 12px;
    background: rgba(30, 41, 59, 0.3); 
    border: 1px solid ${({ $isWhatsapp }) => $isWhatsapp ? 'rgba(37, 211, 102, 0.3)' : 'rgba(255, 255, 255, 0.05)'}; 
    transition: 0.3s;
    
    &:hover { 
        background: ${({ $isWhatsapp }) => $isWhatsapp ? 'rgba(37, 211, 102, 0.1)' : 'rgba(56, 189, 248, 0.1)'}; 
        border-color: ${({ $isWhatsapp }) => $isWhatsapp ? '#25D366' : '#38bdf8'}; 
        transform: translateX(5px); 
    }
    
    div { display: flex; flex-direction: column; }
    strong { color: #f8fafc; font-size: 1rem; }
    span { color: #94a3b8; font-size: 0.9rem; font-family: 'Fira Code', monospace; }
`;

const Icon = styled.span` font-size: 1.5rem; `;

const FormCard = styled.div`
    background: rgba(30, 41, 59, 0.4); padding: 40px; border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.05); backdrop-filter: blur(5px);
`;

const FormTitle = styled.h3` font-size: 1.5rem; color: #f1f5f9; margin-bottom: 25px; `;

const Form = styled.form` display: flex; flex-direction: column; gap: 20px; `;

const InputGroup = styled.div` display: flex; flex-direction: column; gap: 8px; `;

const Label = styled.label` color: #cbd5e1; font-size: 0.9rem; font-weight: 500; `;

const Input = styled.input`
    background: #0f172a; border: 1px solid #334155; color: #f1f5f9;
    padding: 12px; border-radius: 8px; font-family: 'Inter', sans-serif;
    outline: none; transition: 0.3s;
    &:focus { border-color: #38bdf8; box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2); }
`;

const TextArea = styled.textarea`
    background: #0f172a; border: 1px solid #334155; color: #f1f5f9;
    padding: 12px; border-radius: 8px; font-family: 'Inter', sans-serif;
    outline: none; transition: 0.3s; resize: vertical;
    &:focus { border-color: #38bdf8; box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2); }
`;

const SubmitButton = styled.button`
    background: linear-gradient(90deg, #38bdf8, #2563eb); color: white;
    padding: 14px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;
    font-size: 1rem; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px;
    
    &:hover { filter: brightness(1.1); transform: translateY(-2px); }
    &:disabled { background: #334155; cursor: not-allowed; filter: none; transform: none; }
`;

const SuccessMessage = styled.p`
    color: #4ade80; font-size: 0.9rem; text-align: center; margin-top: 10px;
    animation: fadeIn 0.5s ease-in;
`;