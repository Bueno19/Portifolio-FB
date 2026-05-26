import React from 'react';
import styled, { keyframes } from 'styled-components';

// ⚠️ Certifique-se de ter uma imagem salva em: src/assets/profile.png
import ProfilePic from '../assets/profile.png'; 

// Animação de flutuação para a foto (Mantida)
const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
`;

// Nova animação para a tag "Disponível para projetos/estágio"
const pulse = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(56, 189, 248, 0); }
    100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
`;

export const Hero: React.FC = () => {
    return (
        <HeroSection id="home">
            <GridBackground />
            
            <Container>
                <Content>
                    <DevBadge>
                        <span className="dot"></span> Disponível para Estágio
                    </DevBadge>
                    
                    <Title>
                        Construindo o futuro com <br />
                        <span className="gradient-text">código & design</span>
                    </Title>
                    
                    <Subtitle>
                        Olá, eu sou <strong>Felipe Bueno</strong>. Transformo lógica em experiências digitais excepcionais. 
                        Focado no desenvolvimento <strong>Full-Stack (React & PHP)</strong>, busco minha primeira oportunidade 
                        para criar soluções reais e aprender com um time incrível.
                    </Subtitle>
                    
                    <ButtonGroup>
                        <PrimaryButton href="#projects" title="Navegar para a seção de projetos">
                            Ver Projetos <span>-&gt;</span>
                        </PrimaryButton>
                        
                        {/* Mantive o estilo de terminal que você criou, é muito criativo! */}
                        <SecondaryButton href="https://github.com/Bueno19" target="_blank" rel="noopener noreferrer" title="Acessar meu GitHub">
                            <span>$</span> git checkout perfil
                        </SecondaryButton>
                    </ButtonGroup>
                </Content>
                
                <ImageWrapper>
                   <GlowCircle />
                   <ProfileImg src={ProfilePic} alt="Foto de Felipe Bueno sorrindo e focado" />
                </ImageWrapper>
            </Container>
        </HeroSection>
    );
};

// --- ESTILOS ---

const HeroSection = styled.section`
    width: 100%;
    position: relative;
    min-height: 90vh; 
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0f172a;
    overflow: hidden;
`;

const GridBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), 
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%);
    pointer-events: none;
`;

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    margin: 0 auto;

    @media (max-width: 900px) {
        flex-direction: column-reverse; 
        text-align: center;
        gap: 4rem;
        padding-top: 2rem;
    }
`;

const Content = styled.div`
    max-width: 650px;
`;

const DevBadge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(56, 189, 248, 0.1);
    color: #38bdf8;
    padding: 8px 20px;
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: 'Fira Code', monospace;
    margin-bottom: 2rem;
    border: 1px solid rgba(56, 189, 248, 0.3);
    transition: all 0.3s ease;

    &:hover {
        background: rgba(56, 189, 248, 0.2);
    }

    .dot {
        width: 8px;
        height: 8px;
        background: #38bdf8;
        border-radius: 50%;
        animation: ${pulse} 2s infinite; /* Adicionado efeito de pulso para chamar atenção */
    }
`;

const Title = styled.h1`
    font-size: 4.5rem;
    line-height: 1.1;
    font-weight: 800;
    color: #f8fafc;
    margin-bottom: 1.5rem;

    .gradient-text {
        background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    @media (max-width: 768px) {
        font-size: 3rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1.25rem;
    color: #94a3b8;
    line-height: 1.8;
    margin-bottom: 3rem;
    max-width: 90%;

    strong {
        color: #e2e8f0;
    }

    @media (max-width: 900px) {
        margin: 0 auto 3rem auto;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;

    @media (max-width: 900px) {
        justify-content: center;
    }
`;

const PrimaryButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: linear-gradient(90deg, #38bdf8, #2563eb);
    color: white;
    padding: 18px 40px;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 700;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);
    min-width: 200px;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(56, 189, 248, 0.5);
        filter: brightness(1.1);
    }

    span {
        font-family: 'Fira Code', monospace;
        transition: margin-left 0.3s;
        font-size: 1.2rem;
    }

    &:hover span {
        margin-left: 8px;
    }
`;

const SecondaryButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: rgba(15, 23, 42, 0.6);
    color: #cbd5e1;
    padding: 18px 40px;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid #334155;
    font-family: 'Fira Code', monospace;
    transition: all 0.3s ease;
    min-width: 220px;

    span {
        color: #38bdf8;
        font-size: 1.2rem;
    }

    &:hover {
        border-color: #38bdf8;
        color: white;
        background: rgba(56, 189, 248, 0.05);
        box-shadow: 0 0 15px rgba(56, 189, 248, 0.1);
        transform: translateY(-3px);
    }
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${float} 6s ease-in-out infinite;

    @media (max-width: 768px) {
        width: 300px;
        height: 300px;
    }
`;

const GlowCircle = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(0,0,0,0) 70%);
    z-index: -1;
    transition: transform 0.5s ease;

    /* Aumenta o brilho ao passar o mouse na foto */
    ${ImageWrapper}:hover & {
        transform: scale(1.1);
        background: radial-gradient(circle, rgba(56,189,248,0.25) 0%, rgba(0,0,0,0) 70%);
    }
`;

const ProfileImg = styled.img`
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid #1e293b;
    z-index: 2;
    box-shadow: 0 0 25px rgba(56, 189, 248, 0.2);
    transition: all 0.4s ease;

    &:hover {
        border-color: #38bdf8;
        transform: scale(1.05); /* Um leve zoom na foto ao passar o mouse */
    }

    @media (max-width: 768px) {
        width: 250px;
        height: 250px;
    }
`;