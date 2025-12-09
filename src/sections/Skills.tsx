import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Skill { name: string; level: number; color: string; }

const mySkills: Skill[] = [
    { name: 'HTML5 & CSS3', level: 95, color: '#e34c26' },
    { name: 'JavaScript (ES6+)', level: 85, color: '#f7df1e' },
    { name: 'TypeScript', level: 75, color: '#3178c6' },
    { name: 'React & Hooks', level: 90, color: '#61dafb' },
    { name: 'Styled Components', level: 80, color: '#db7093' },
    { name: 'Git & GitHub', level: 90, color: '#f1502f' },
    { name: 'Node.js', level: 50, color: '#68a063' },
];

const fillBar = (level: number) => keyframes` from { width: 0; } to { width: ${level}%; } `;

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => (
    <Card>
        <HeaderInfo>
            <SkillName>{skill.name}</SkillName>
            <Percentage>{skill.level}%</Percentage>
        </HeaderInfo>
        <ProgressBarContainer>
            <Progress $level={skill.level} $color={skill.color} />
        </ProgressBarContainer>
    </Card>
);

export const Skills: React.FC = () => {
    return (
        // ID OBRIGATÓRIO PARA NAVEGAÇÃO
        <SectionContainer id="skills">
            <Container>
                <HeaderContent>
                    <SectionTitle>
                        <span className="purple">function</span> <span className="blue">getSkills</span>() {'{'}
                    </SectionTitle>
                    <SubTitle>// Tecnologias que domino e utilizo no dia a dia</SubTitle>
                </HeaderContent>
                <Grid>
                    {mySkills.map((skill) => <SkillCard key={skill.name} skill={skill} />)}
                </Grid>
                <SectionClosing>{'}'}</SectionClosing>
            </Container>
        </SectionContainer>
    );
};

// --- Estilos ---
const SectionContainer = styled.section`
    width: 100%; padding: 140px 20px; background-color: #0b1120;
    display: flex; justify-content: center; border-top: 1px solid #1e293b;
`;
const Container = styled.div` width: 100%; max-width: 1200px; `;
const HeaderContent = styled.div` margin-bottom: 80px; text-align: center; `;
const SectionTitle = styled.h2`
    font-size: 3rem; color: #e2e8f0; margin-bottom: 15px; font-family: 'Fira Code', monospace;
    .purple { color: #c084fc; } .blue { color: #38bdf8; }
    @media (max-width: 768px) { font-size: 2rem; }
`;
const SubTitle = styled.p` color: #64748b; font-size: 1.1rem; font-family: 'Fira Code', monospace; `;
const SectionClosing = styled.h2`
    font-size: 3rem; text-align: center; color: #e2e8f0; margin-top: 60px; font-family: 'Fira Code', monospace; opacity: 0.5;
`;
const Grid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; `;
const Card = styled.div`
    background: rgba(30, 41, 59, 0.4); padding: 35px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease; backdrop-filter: blur(5px); display: flex; flex-direction: column; justify-content: center;
    &:hover { transform: translateY(-8px); border-color: #38bdf8; background: rgba(30, 41, 59, 0.6); box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.5); }
`;
const HeaderInfo = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; `;
const SkillName = styled.h3` font-size: 1.2rem; color: #f1f5f9; font-weight: 600; letter-spacing: 0.5px; `;
const Percentage = styled.span` font-weight: bold; color: #94a3b8; font-size: 1rem; font-family: 'Fira Code', monospace; `;
const ProgressBarContainer = styled.div` width: 100%; height: 10px; background-color: #1e293b; border-radius: 20px; overflow: hidden; `;
const Progress = styled.div<{ $level: number; $color: string }>`
    height: 100%; width: ${({ $level }) => $level}%; background-color: ${({ $color }) => $color};
    border-radius: 20px; box-shadow: 0 0 15px ${({ $color }) => $color};
    animation: ${({ $level }) => fillBar($level)} 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
`;