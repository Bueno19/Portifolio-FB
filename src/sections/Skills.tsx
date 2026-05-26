import React from 'react';
import styled from 'styled-components';

// 1. TIPAGEM: Definimos como uma habilidade deve ser estruturada
interface Skill {
    name: string;
    levelValue: number; // Define a largura da barra visual (ex: 90 para encher quase tudo)
    levelText: string;  // O texto que o recrutador vai ler (mais seguro que porcentagem)
    color: string;
}

export const Skills: React.FC = () => {
    // 2. DADOS REAIS: Baseado nos repositórios do seu GitHub
    const skills: Skill[] = [
        // Frontend Moderno (Maior foco nos seus projetos)
        { name: 'React & Hooks', levelValue: 90, levelText: 'Avançado', color: '#61DAFB' },
        { name: 'TypeScript', levelValue: 85, levelText: 'Avançado', color: '#3178C6' },
        { name: 'JavaScript (ES6+)', levelValue: 85, levelText: 'Avançado', color: '#F7DF1E' },
        { name: 'Styled Components', levelValue: 90, levelText: 'Avançado', color: '#DB7093' },
        
        // Backend e Banco de Dados (Kiosk Manager)
        { name: 'PHP & Arquitetura MVC', levelValue: 75, levelText: 'Intermediário', color: '#777BB4' }, 
        { name: 'SQL / MySQL', levelValue: 70, levelText: 'Intermediário', color: '#00758F' },
        
        // Scripts e Automação (Bot de Senhas)
        { name: 'Python', levelValue: 65, levelText: 'Prática Frequente', color: '#3776AB' },
        
        // Ferramentas do dia a dia
        { name: 'Git & GitHub', levelValue: 80, levelText: 'Avançado', color: '#F05032' },
    ];

    return (
        <Container>
            <CodeHeader>
                <span className="keyword">function</span> <span className="func-name">getSkills</span><span className="params">()</span> <span className="bracket">{'{'}</span>
                <div className="comment">// Tecnologias validadas em projetos reais</div>
            </CodeHeader>

            <SkillsGrid>
                {/* 3. RENDERIZAÇÃO: Iterando sobre a nossa nova lista de skills */}
                {skills.map((skill) => (
                    <SkillCard key={skill.name} $color={skill.color}>
                        <div className="skill-info">
                            <span className="skill-name">{skill.name}</span>
                            {/* Aqui usamos o texto descritivo ao invés da porcentagem */}
                            <span className="skill-level">{skill.levelText}</span>
                        </div>
                        <ProgressBar>
                            <ProgressFill $width={skill.levelValue} $color={skill.color} />
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

    /* Estilo atualizado para o nível da habilidade */
    .skill-level {
        color: ${({ $color }) => $color};
        font-weight: bold;
        font-size: 0.9rem;
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