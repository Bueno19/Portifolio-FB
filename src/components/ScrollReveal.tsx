import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// 1. TIPAGEM E PARÂMETROS
// Adicionamos 'direction' e 'delay' para tornar o componente mais flexível.
interface ScrollRevealProps {
    children: React.ReactNode;
    width?: string;
    direction?: 'up' | 'down' | 'left' | 'right'; // De onde o elemento vai surgir?
    delay?: number; // Tempo de espera (em segundos) antes de começar a animar
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
    children, 
    width = '100%',
    direction = 'up', // Padrão: surge de baixo para cima
    delay = 0         // Padrão: sem atraso
}) => {
    // Estado que controla se o elemento apareceu na tela
    const [isVisible, setIsVisible] = useState(false);
    
    // Referência para o elemento HTML real na tela
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 2. CONFIGURAÇÃO DO OBSERVEDOR
        // Ele "vigia" quando o elemento cruza a área visível do navegador
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Se o elemento estiver visível na tela
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    
                    // Como só queremos animar a primeira vez, mandamos o observador parar de vigiar
                    if (ref.current) observer.unobserve(ref.current);
                }
            },
            { 
                threshold: 0.1, // Dispara quando 10% do elemento estiver visível
                rootMargin: '0px 0px -50px 0px' // Faz disparar um pouquinho depois da borda inferior para um efeito mais dramático
            }
        );

        if (ref.current) observer.observe(ref.current);

        // Função de limpeza: garante que o observador seja desligado se o componente for desmontado
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        // 3. RENDERIZAÇÃO
        // Passamos os dados para os estilos do Styled Components.
        // O '$' (ex: $isVisible) é uma convenção do Styled Components para propriedades temporárias (transient props) 
        // que não devem ser repassadas para o HTML padrão.
        <RevealWrapper 
            ref={ref} 
            $isVisible={isVisible} 
            $direction={direction} 
            $delay={delay}
            style={{ width }}
        >
            {children}
        </RevealWrapper>
    );
};

// --- FUNÇÃO AUXILIAR DE ESTILO ---
// Calcula a posição inicial baseada na direção escolhida
const getInitialTransform = (direction: string) => {
    switch (direction) {
        case 'up': return 'translateY(50px)';
        case 'down': return 'translateY(-50px)';
        case 'left': return 'translateX(-50px)';
        case 'right': return 'translateX(50px)';
        default: return 'translateY(50px)';
    }
};

// --- ESTILOS ---
const RevealWrapper = styled.div<{ $isVisible: boolean; $direction: string; $delay: number }>`
    /* Se visível, opacidade 1, senão 0 */
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    
    /* Se visível, vai para a posição original (0,0), senão vai para a posição calculada acima */
    transform: ${({ $isVisible, $direction }) => ($isVisible ? 'translate(0, 0)' : getInitialTransform($direction))};
    
    /* Define o tempo da animação e adiciona o delay caso exista */
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    transition-delay: ${({ $delay }) => $delay}s;
    
    /* Otimização de performance do navegador */
    will-change: opacity, transform;
`;