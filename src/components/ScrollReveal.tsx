import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, width = '100%' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (ref.current) observer.unobserve(ref.current);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);

        // Segurança: Mostra o conteúdo após 500ms caso o observer falhe
        const safetyTimer = setTimeout(() => setIsVisible(true), 500);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
            clearTimeout(safetyTimer);
        };
    }, []);

    return (
        <RevealWrapper ref={ref} $isVisible={isVisible} style={{ width }}>
            {children}
        </RevealWrapper>
    );
};

const RevealWrapper = styled.div<{ $isVisible: boolean }>`
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transform: translateY(${({ $isVisible }) => ($isVisible ? 0 : '75px')});
    transition: opacity 1s ease-out, transform 1s ease-out;
    will-change: opacity, transform;
`;