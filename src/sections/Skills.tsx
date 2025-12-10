import React from 'react';
import styled from 'styled-components';

export const Skills: React.FC = () => {
    // Cores e porcentagens para as barras
    const skills = [
        { name: 'React & Hooks', percent: 95, color: '#61DAFB' }, // Azul React
        { name: 'TypeScript', percent: 85, color: '#3178C6' },    // Azul TS
        { name: 'Styled Components', percent: 90, color: '#DB7093' }, // Rosa
        { name: 'JavaScript (ES6+)', percent: 92, color: '#F7DF1E' }, // Amarelo
        { name: 'Node.js', percent: 80, color: '#339933' },       // Verde Node
        { name: 'SQL / MySQL', percent: 75, color: '#00758F' },    // Azul Banco
        
        // Novas Linguagens (Backend/Core)
        { name: 'Java', percent: 70, color: '#f89820' },          // Laranja Java
        { name: 'C# / .NET', percent: 65, color: '#a179dc' },     // Roxo C#
        { name: 'Python', percent: 75, color: '#3776AB' },         // Azul Python
        { name: 'Assembly', percent: 40, color: '#A9A9A9' },       // Cinza
    ];

    return (
        <Container>
            <CodeHeader>
                <span className="keyword">function</span> <span className="func-name">getSkills</span><span className="params">()</span> <span className="bracket">{'{'}</span>
                <div className="comment">// Tecnologias que domino e utilizo no dia a dia</div>
            </CodeHeader>

            <SkillsGrid>
                {skills.map((skill) => (
                    <SkillCard key={skill.name} $color={skill.color}>
                        <div className="skill-info">
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-percent">{skill.percent}%</span>
                        </div>
                        <ProgressBar>
                            <ProgressFill $width={skill.percent} $color={skill.color} />
                        </ProgressBar>
                    </SkillCard>
                ))}
            </SkillsGrid>
            
            <CodeFooter><span className="bracket">{'}'}</span></CodeFooter>
        </Container>
    );
};

// --- ESTILOS ---

const Container = styled.div`
    padding: 6rem 2rem;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
`;

const CodeHeader = styled.div`
    text-align: center;
    font-family: 'Fira Code', monospace;
    font-size: 2rem;
    margin-bottom: 4rem;

    .keyword { color: #c792ea; font-weight: bold; }
    .func-name { color: #82aaff; }
    .params { color: #89ddff; }
    .bracket { color: #ffd700; }
    .comment { 
        color: #607b96; font-size: 1rem; 
        margin-top: 5px; opacity: 0.8;
    }
    
    @media (max-width: 768px) { font-size: 1.4rem; }
`;

const CodeFooter = styled.div`
    text-align: center; font-family: 'Fira Code', monospace; font-size: 2rem; margin-top: 3rem;
    .bracket { color: #ffd700; }
`;

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
`;

const SkillCard = styled.div<{ $color: string }>`
    background: #1e293b;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.05);
    transition: transform 0.3s ease;
    
    &:hover {
        transform: translateY(-5px);
        border-color: ${({ $color }) => $color};
        box-shadow: 0 10px 20px -10px rgba(0,0,0,0.5);
    }

    .skill-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        font-family: 'Fira Code', monospace;
    }

    .skill-name {
        font-weight: bold;
        color: #e2e8f0;
    }

    .skill-percent {
        color: ${({ $color }) => $color};
        font-weight: bold;
    }
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 10px;
    background-color: #0f172a;
    border-radius: 5px;
    overflow: hidden;
`;

const ProgressFill = styled.div<{ $width: number; $color: string }>`
    width: ${({ $width }) => $width}%;
    height: 100%;
    background-color: ${({ $color }) => $color};
    border-radius: 5px;
    transition: width 1s ease-in-out;
    box-shadow: 0 0 10px ${({ $color }) => $color};
`;