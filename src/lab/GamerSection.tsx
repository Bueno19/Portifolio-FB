import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// --- Interfaces ---
interface GamerProfile {
  nickname: string;
  level: number;
  cpu: string;
  gpu: string;
  ram: string;
  favoriteGenre: string;
  isSetup: boolean;
}

interface GameRecommendation {
  id: number;
  title: string;
  genre: string;
  image: string;
}

// --- BANCO DE DADOS DA "IA" (CAPAS DA TWITCH/STEAM DE ALTA QUALIDADE) ---
const gameDatabase: Record<string, GameRecommendation[]> = {
  FPS: [
    { 
      id: 1, 
      title: 'Valorant', 
      genre: 'FPS Tático', 
      // Capa Oficial da Twitch (600x800) - Garantia de qualidade
      image: 'https://static-cdn.jtvnw.net/ttv-boxart/516575-600x800.jpg' 
    },
    { 
      id: 2, 
      title: 'Call of Duty: MW3', 
      genre: 'FPS Ação', 
      image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2519060/library_600x900.jpg' 
    },
    { 
      id: 3, 
      title: 'Overwatch 2', 
      genre: 'Hero Shooter', 
      image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2357570/library_600x900.jpg' 
    },
    { 
      id: 4, 
      title: 'Counter-Strike 2', 
      genre: 'FPS Tático', 
      image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/library_600x900.jpg' 
    }
  ],
  RPG: [
    { 
      id: 5, 
      title: 'Baldur\'s Gate 3', 
      genre: 'RPG Turno', 
      image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/library_600x900.jpg' 
    },
    { 
      id: 6, 
      title: 'Elden Ring', 
      genre: 'Action RPG', 
      image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900.jpg' 
    },
    { 
      id: 7, 
      title: 'The Witcher 3', 
      genre: 'Open World', 
      image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/library_600x900.jpg' 
    },
    { 
      id: 8, 
      title: 'Cyberpunk 2077', 
      genre: 'Action RPG', 
      image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg' 
    }
  ],
  Horror: [
    { 
      id: 9, 
      title: 'Resident Evil 4', 
      genre: 'Survival Horror', 
      image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/library_600x900.jpg' 
    },
    { 
      id: 10, 
      title: 'Silent Hill 2', 
      genre: 'Psychological', 
      image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2124490/library_600x900.jpg' 
    },
    { 
      id: 11, 
      title: 'Dead Space', 
      genre: 'Sci-Fi Horror', 
      image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1693980/library_600x900.jpg' 
    }
  ],
  Strategy: [
    { 
      id: 12, 
      title: 'Civilization VI', 
      genre: 'Turn Based', 
      image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/289070/library_600x900.jpg' 
    },
    { 
      id: 13, 
      title: 'League of Legends', 
      genre: 'MOBA', 
      // Capa Oficial da Twitch para LoL
      image: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-600x800.jpg' 
    },
    { 
      id: 14, 
      title: 'Dota 2', 
      genre: 'MOBA', 
      image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/library_600x900.jpg' 
    }
  ]
};

const GamerSection: React.FC = () => {
  // Estado inicial recuperado do LocalStorage
  const [profile, setProfile] = useState<GamerProfile>(() => {
    const saved = localStorage.getItem('gamer_profile_v3'); // v3 para forçar atualização
    return saved ? JSON.parse(saved) : {
      nickname: '', level: 1, cpu: '', gpu: '', ram: '', favoriteGenre: '', isSetup: false
    };
  });

  const [formData, setFormData] = useState(profile);
  const [recommendations, setRecommendations] = useState<GameRecommendation[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Efeito para carregar recomendações se o perfil já estiver configurado
  useEffect(() => {
    if (profile.isSetup && profile.favoriteGenre) {
      generateRecommendations(profile.favoriteGenre);
    }
  }, [profile.isSetup]);

  // Efeito para salvar no LocalStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('gamer_profile_v3', JSON.stringify(profile));
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Lógica de recomendação baseada no gênero
  const generateRecommendations = (genre: string) => {
    const list = gameDatabase[genre] || gameDatabase['RPG'];
    // Embaralha a lista e pega os 3 primeiros
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    setRecommendations(shuffled.slice(0, 3));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true); // Ativa animação de loading

    // Simula delay de 2 segundos para a "IA"
    setTimeout(() => {
      setProfile({
        ...formData,
        level: Math.floor(Math.random() * 50) + 1, // Nível aleatório inicial
        isSetup: true
      });
      setIsProcessing(false);
    }, 2000);
  };

  const handleReset = () => {
    setProfile({ ...profile, isSetup: false });
    setFormData({ ...profile, isSetup: false }); // Reseta form também
  };

  // --- TELA 1: CARREGANDO (SIMULAÇÃO IA) ---
  if (isProcessing) {
    return (
      <Container>
        <LoadingBox>
          <div className="spinner"></div>
          <h2>AI ANALYZING PREFERENCES...</h2>
          <p>Configuring neural network for {formData.favoriteGenre} genre.</p>
        </LoadingBox>
      </Container>
    );
  }

  // --- TELA 2: QUIZ / SETUP ---
  if (!profile.isSetup) {
    return (
      <Container>
        <QuizCard>
          <h2>INITIALIZE PROFILE</h2>
          <p>Configure seu setup para receber indicações personalizadas.</p>
          
          <form onSubmit={handleSaveProfile}>
            <FormGroup>
              <label>CODENAME (NICK)</label>
              <input 
                type="text" name="nickname" required 
                placeholder="PlayerOne" 
                value={formData.nickname} onChange={handleChange} 
              />
            </FormGroup>

            <div className="row">
              <FormGroup>
                <label>CPU</label>
                <input 
                  type="text" name="cpu" required 
                  placeholder="i7 / Ryzen 5" 
                  value={formData.cpu} onChange={handleChange} 
                />
              </FormGroup>
              <FormGroup>
                <label>GPU</label>
                <input 
                  type="text" name="gpu" required 
                  placeholder="RTX 4060" 
                  value={formData.gpu} onChange={handleChange} 
                />
              </FormGroup>
            </div>

            <FormGroup>
              <label>GÊNERO FAVORITO (PARA IA)</label>
              <select name="favoriteGenre" value={formData.favoriteGenre} onChange={handleChange} required>
                <option value="">Selecione para calibrar a IA...</option>
                <option value="FPS">FPS (Tiro em Primeira Pessoa)</option>
                <option value="RPG">RPG / Aventura</option>
                <option value="Horror">Terror / Survival</option>
                <option value="Strategy">Estratégia / MOBA</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>RAM</label>
              <select name="ram" value={formData.ram} onChange={handleChange} required>
                <option value="8GB">8GB</option>
                <option value="16GB">16GB</option>
                <option value="32GB">32GB</option>
                <option value="64GB+">64GB+</option>
              </select>
            </FormGroup>

            <SaveButton type="submit">GENERATE PROFILE & RECOMMENDATIONS</SaveButton>
          </form>
        </QuizCard>
      </Container>
    );
  }

  // --- TELA 3: DASHBOARD ---
  return (
    <Container>
      <ProfileHeader>
        <Avatar>
          {/* Avatar estilo ROBÔ para combinar com tema Gamer e evitar "velhinhas" */}
          <img 
            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${profile.nickname}`} 
            alt="Avatar" 
          />
          <StatusDot />
        </Avatar>
        <ProfileInfo>
          <div className="top-row">
            <Gamertag>{profile.nickname}</Gamertag>
            <EditButton onClick={handleReset}>RECALIBRATE ⚙</EditButton>
          </div>
          <LevelBadge>GENRE: {profile.favoriteGenre}</LevelBadge>
          
          <XpBarContainer>
            <div className="label">Next Level Progress</div>
            <div className="bar-bg">
              <div className="bar-fill" style={{ width: '65%' }}></div>
            </div>
          </XpBarContainer>
        </ProfileInfo>
        
        <SpecsBox>
          <h3>SYSTEM SPECS</h3>
          <div className="spec-item"><span>CPU</span> {profile.cpu}</div>
          <div className="spec-item"><span>GPU</span> {profile.gpu}</div>
          <div className="spec-item"><span>RAM</span> {profile.ram}</div>
        </SpecsBox>
      </ProfileHeader>

      <SectionTitle>AI RECOMMENDATIONS // {profile.favoriteGenre.toUpperCase()}</SectionTitle>
      
      <GamesGrid>
        {recommendations.map((game) => (
          <GameCard key={game.id}>
            <div className="image-wrapper">
              <img src={game.image} alt={game.title} />
              <div className="overlay">
                <button>JOGAR AGORA</button>
              </div>
            </div>
            <div className="info">
              <h3>{game.title}</h3>
              <span className="genre">Match: 98%</span>
            </div>
          </GameCard>
        ))}
      </GamesGrid>
    </Container>
  );
};

export default GamerSection;

// --- STYLED COMPONENTS (CSS) ---

const Container = styled.div`
  background-color: #0f0f13;
  color: white;
  min-height: 100vh;
  padding: 40px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuizCard = styled.div`
  background: #16161e;
  padding: 40px;
  border-radius: 16px;
  border: 1px solid #333;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);

  h2 { color: #9d4edd; margin-bottom: 10px; font-family: 'Fira Code', monospace; }
  p { color: #aaa; margin-bottom: 30px; }
  .row { display: flex; gap: 15px; }
`;

const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #333;
    border-top-color: #9d4edd;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }
  
  h2 { color: #9d4edd; font-family: 'Fira Code', monospace; }
  p { color: #666; }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  
  label { font-size: 0.7rem; font-weight: bold; color: #7b2cbf; margin-bottom: 8px; letter-spacing: 1px;}
  
  input, select {
    background: #0f0f13;
    border: 1px solid #333;
    color: white;
    padding: 12px;
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
    outline: none;
    transition: all 0.3s;
    
    &:focus { border-color: #9d4edd; box-shadow: 0 0 10px rgba(157, 78, 221, 0.2); }
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(90deg, #7b2cbf, #9d4edd);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: transform 0.2s;
  
  &:hover { transform: scale(1.02); box-shadow: 0 0 20px rgba(157, 78, 221, 0.4); }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  background: linear-gradient(145deg, #1a1a2e, #16213e);
  padding: 30px;
  border-radius: 20px;
  width: 100%;
  max-width: 1000px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  margin-bottom: 50px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  flex-wrap: wrap; /* Para mobile */

  @media (max-width: 768px) {
    justify-content: center;
    text-align: center;
  }
`;

const Avatar = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid #7b2cbf;
    background: #000;
  }
`;

const StatusDot = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background-color: #4caf50;
  border: 3px solid #1a1a2e;
  border-radius: 50%;
  box-shadow: 0 0 10px #4caf50;
`;

const ProfileInfo = styled.div`
  flex: 1;
  .top-row { display: flex; align-items: center; gap: 10px; }
  @media (max-width: 768px) { .top-row { justify-content: center; } }
`;

const Gamertag = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  font-weight: 800;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #fff, #9d4edd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const EditButton = styled.button`
  background: none;
  border: 1px solid #333;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.7rem;
  
  &:hover { color: white; border-color: white; }
`;

const LevelBadge = styled.span`
  background-color: #ff9e00;
  color: black;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-top: 5px;
  display: inline-block;
`;

const XpBarContainer = styled.div`
  margin-top: 15px;
  max-width: 300px;
  .label { font-size: 0.7rem; color: #aaa; margin-bottom: 4px; }
  .bar-bg {
    width: 100%; height: 8px; background: #333; border-radius: 4px; overflow: hidden;
  }
  .bar-fill {
    height: 100%; background: linear-gradient(90deg, #9d4edd, #e0aaff);
    box-shadow: 0 0 10px #9d4edd;
  }
`;

const SpecsBox = styled.div`
  background: rgba(0,0,0,0.3);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
  border-left: 2px solid #7b2cbf;

  h3 { font-size: 0.8rem; color: #7b2cbf; margin-bottom: 5px; letter-spacing: 1px; }

  .spec-item {
    font-family: 'Fira Code', monospace;
    font-size: 0.8rem;
    color: #e0e0e0;
    display: flex;
    justify-content: space-between;
    
    span { color: #666; font-weight: bold; margin-right: 10px;}
  }
`;

const SectionTitle = styled.h2`
  align-self: flex-start;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto 20px auto;
  font-size: 1.2rem;
  color: #555;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
  width: 100%;
  max-width: 1000px;
`;

const GameCard = styled.div`
  background-color: #16161e;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-5px);
    border-color: #7b2cbf;
    box-shadow: 0 0 20px rgba(123, 44, 191, 0.4);
    
    .overlay { opacity: 1; }
  }

  .image-wrapper {
    position: relative;
    height: 280px; /* Altura padrão de poster vertical */
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover; /* Garante que a imagem preencha o card sem distorcer */
    }

    .overlay {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.7);
      display: flex; align-items: center; justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
      
      button {
        padding: 8px 16px;
        background: white; border: none; font-weight: bold; cursor: pointer;
        border-radius: 20px;
        &:hover { background: #ddd; }
      }
    }
  }

  .info {
    padding: 15px;
    
    h3 { margin: 0 0 5px 0; font-size: 1rem; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .genre { font-size: 0.8rem; color: #7b2cbf; font-weight: bold; }
  }
`;