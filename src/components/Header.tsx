import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const navLinks = [
    { name: '// home', href: '#home' },
    { name: '// skills', href: '#skills' },
    { name: '// projects', href: '#projects' },
    { name: '// contact', href: '#contact' },
];

export const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Monitora o scroll apenas para mudar a cor do fundo
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Função simplificada: Apenas fecha o menu
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <Nav $scrolled={scrolled}>
            <Container>
                {/* O href="#home" faz o trabalho. O onClick só fecha o menu se estiver aberto */}
                <Logo href="#home" onClick={handleLinkClick}>
                    <span className="blue">&lt;</span>FBDev<span className="blue"> /&gt;</span>
                </Logo>

                <MenuToggle onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? '✕' : '☰'}
                </MenuToggle>

                <NavMenu $isOpen={isOpen}>
                    {navLinks.map((link) => (
                        <NavItem 
                            key={link.name} 
                            href={link.href} 
                            onClick={handleLinkClick} // Deixa o navegador rolar nativamente
                        >
                            {link.name}
                        </NavItem>
                    ))}
                    
                    <HireButton href="#contact" onClick={handleLinkClick}>
                        _contrate-me
                    </HireButton>
                </NavMenu>
            </Container>
        </Nav>
    );
};

// --- MANTENHA OS ESTILOS EXATAMENTE COMO ESTAVAM ---
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

const Logo = styled.a`
    font-family: 'Fira Code', monospace; font-size: 1.5rem; font-weight: 700; color: #e2e8f0; text-decoration: none; cursor: pointer;
    .blue { color: #38bdf8; }
    &:hover { transform: scale(1.05); transition: 0.2s; }
`;

const NavMenu = styled.div<{ $isOpen: boolean }>`
    display: flex; gap: 2rem; align-items: center;
    
    @media (max-width: 768px) {
        position: absolute; top: 80px; left: 0; width: 100%;
        flex-direction: column; background: #0f172a; padding: 2rem;
        display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
        border-bottom: 1px solid rgba(56, 189, 248, 0.1);
        box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    }
`;

const NavItem = styled.a`
    font-family: 'Fira Code', monospace; color: #94a3b8; text-decoration: none; font-size: 0.95rem;
    position: relative; transition: color 0.3s; cursor: pointer;
    
    &:hover { color: #38bdf8; }
    
    &::after {
        content: ''; position: absolute; width: 0; height: 1px; bottom: -4px; left: 0;
        background-color: #38bdf8; transition: width 0.3s;
    }
    &:hover::after { width: 100%; }
`;

const HireButton = styled.a`
    font-family: 'Fira Code', monospace; padding: 0.6rem 1.8rem;
    border: 1px solid #38bdf8; color: #38bdf8; border-radius: 4px; 
    text-decoration: none; font-weight: 600; transition: all 0.3s; cursor: pointer;
    &:hover { background: rgba(56, 189, 248, 0.1); box-shadow: 0 0 20px rgba(56, 189, 248, 0.4); }
`;

const MenuToggle = styled.button`
    display: none; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;
    @media (max-width: 768px) { display: block; }
`;