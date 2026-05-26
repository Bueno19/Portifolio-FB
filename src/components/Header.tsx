import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface HeaderProps {
    currentView: string;
    onChangeView: (view: 'home' | 'market' | 'gamer' | 'chatbot' | 'creative') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onChangeView }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Atualizamos a função para receber o evento e evitar o pulo brusco do navegador
    const handleNavigation = (
        e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, 
        target: string, 
        view: 'home' | 'market' | 'gamer' | 'chatbot' | 'creative'
    ) => {
        e.preventDefault(); // Impede o comportamento padrão do HTML
        setIsOpen(false);   // Fecha o menu mobile automaticamente
        onChangeView(view);
        
        if (view === 'home') {
            // O setTimeout garante que o React renderize a página 'home' antes de tentar rolar
            setTimeout(() => {
                const element = document.querySelector(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100);
        }
    };

    return (
        <Nav $scrolled={scrolled}>
            <Container>
                {/* Logo semântica */}
                <Logo 
                    href="#home" 
                    onClick={(e) => handleNavigation(e, '#home', 'home')}
                    title="Voltar ao início"
                >
                    <span className="brackets">&lt;</span>
                    FBDev
                    <span className="brackets"> /&gt;</span>
                </Logo>

                {/* Botão Mobile com Acessibilidade (A11y) */}
                <MenuToggle 
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? '✕' : '☰'}
                </MenuToggle>

                <NavMenu $isOpen={isOpen}>
                    {/* Agora todos os NavItems possuem href adequado */}
                    <NavItem 
                        href="#home"
                        onClick={(e) => handleNavigation(e, '#home', 'home')} 
                        $active={currentView === 'home'}
                    >
                        // home
                    </NavItem>

                    <NavItem 
                        href="#skills"
                        onClick={(e) => handleNavigation(e, '#skills', 'home')}
                    >
                        // skills
                    </NavItem>

                    <NavItem 
                        href="#projects"
                        onClick={(e) => handleNavigation(e, '#projects', 'home')}
                    >
                        // projects
                    </NavItem>

                    <NavItem 
                        href="#lab"
                        onClick={(e) => handleNavigation(e, '#lab', 'home')}
                        // Ativa se for qualquer view que não seja a home
                        $active={currentView !== 'home'}
                    >
                        // lab
                    </NavItem>

                    <HireButton 
                        href="#contact"
                        onClick={(e) => handleNavigation(e, '#contact', 'home')}
                    >
                        _contrate-me
                    </HireButton>
                </NavMenu>
            </Container>
        </Nav>
    );
};

// --- ESTILOS ---

const Nav = styled.nav<{ $scrolled: boolean }>`
    position: fixed; 
    top: 0; left: 0; width: 100%; height: 80px;
    z-index: 9999;
    display: flex; justify-content: center;
    transition: all 0.3s ease;
    background: ${({ $scrolled }) => $scrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent'};
    backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(16px)' : 'none'};
    border-bottom: ${({ $scrolled }) => $scrolled ? '1px solid rgba(56, 189, 248, 0.1)' : 'none'};
`;

const Container = styled.div`
    width: 100%; max-width: 1200px; padding: 0 2rem;
    height: 100%; display: flex; justify-content: space-between; align-items: center;
`;

// Transformado de 'div' para 'a' para maior correção semântica
const Logo = styled.a`
    font-family: 'Fira Code', monospace;
    font-size: 1.6rem;
    font-weight: 700;
    color: #e2e8f0;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.2s;
    user-select: none;

    .brackets { color: #38bdf8; transition: color 0.3s; }
    &:hover { transform: scale(1.05); .brackets { color: #818cf8; } }
`;

const NavMenu = styled.div<{ $isOpen: boolean }>`
    display: flex; gap: 2rem; align-items: center;
    
    @media (max-width: 768px) {
        position: absolute; 
        top: 80px; 
        left: 0; 
        width: 100%;
        flex-direction: column; 
        background: #0f172a; 
        padding: 2rem;
        border-bottom: 1px solid rgba(56, 189, 248, 0.1);
        box-shadow: 0 10px 20px rgba(0,0,0,0.5);
        
        /* Nova animação suave no Mobile */
        transition: all 0.3s ease-in-out;
        opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
        visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
        transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-20px')});
    }
`;

const NavItem = styled.a<{ $active?: boolean }>`
    font-family: 'Fira Code', monospace; 
    color: ${({ $active }) => $active ? '#38bdf8' : '#94a3b8'}; 
    text-decoration: none; font-size: 0.95rem;
    position: relative; transition: color 0.3s; cursor: pointer;
    
    &:hover { color: #38bdf8; }
    
    &::after {
        content: ''; position: absolute; width: ${({ $active }) => $active ? '100%' : '0'}; 
        height: 1px; bottom: -4px; left: 0;
        background-color: #38bdf8; transition: width 0.3s;
    }
    &:hover::after { width: 100%; }
`;

// Transformado de 'button' para 'a' para se alinhar como link âncora
const HireButton = styled.a`
    font-family: 'Fira Code', monospace; padding: 0.6rem 1.8rem;
    background: transparent; text-decoration: none;
    border: 1px solid #38bdf8; color: #38bdf8; border-radius: 4px; 
    font-weight: 600; transition: all 0.3s; cursor: pointer;
    display: inline-block;
    
    &:hover { 
        background: rgba(56, 189, 248, 0.1); 
        box-shadow: 0 0 20px rgba(56, 189, 248, 0.4); 
    }
`;

const MenuToggle = styled.button`
    display: none; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;
    @media (max-width: 768px) { display: block; }
`;