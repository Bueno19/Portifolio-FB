import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

// --- 1. DEFINIÇÃO DA INTERFACE ---
interface PriceData {
    name: string;
    symbol: string;
    price: number;
    change: number;
    category: 'fiat' | 'crypto' | 'stock'; 
    image: string;
}

export const MarketMonitor: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [data, setData] = useState<PriceData[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState('');

    // Trava o scroll da página
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    // --- 2. DADOS SIMULADOS (BACKUP) ---
    // Usamos isto se a API real falhar, garantindo que nunca faltam preços
    const getMockData = () => {
        return {
            USDBRL: { bid: '5.15', pctChange: '0.1' },
            EURBRL: { bid: '5.55', pctChange: '-0.2' },
            GBPBRL: { bid: '6.45', pctChange: '0.05' },
            bitcoin: { brl: 350000, brl_24h_change: 2.5 },
            ethereum: { brl: 18500, brl_24h_change: 1.2 },
            solana: { brl: 850, brl_24h_change: -1.5 }
        };
    };

    const getB3Data = () => {
        const stocks = [
            { symbol: 'IBOV', name: 'Ibovespa', basePrice: 128500, volatility: 0.8 },
            { symbol: 'PETR4', name: 'Petrobras', basePrice: 36.40, volatility: 1.5 },
            { symbol: 'VALE3', name: 'Vale', basePrice: 68.20, volatility: 1.2 },
            { symbol: 'ITUB4', name: 'Itaú Unibanco', basePrice: 32.50, volatility: 0.9 },
            { symbol: 'BBAS3', name: 'Banco do Brasil', basePrice: 28.10, volatility: 1.1 }
        ];

        return stocks.map(stock => {
            const randomChange = (Math.random() * stock.volatility * 2) - stock.volatility; 
            const currentPrice = stock.basePrice + (stock.basePrice * (randomChange / 100));
            
            return {
                name: stock.name,
                symbol: stock.symbol,
                price: Number(currentPrice), // Garante que é número
                change: Number(randomChange),
                category: 'stock' as const,
                image: 'https://cdn-icons-png.flaticon.com/512/3310/3310639.png'
            };
        });
    };

    const fetchData = async () => {
        if (data.length === 0) setLoading(true);

        // Prepara objetos para receber os dados
        let fiatData = null;
        let cryptoData = null;
        const mock = getMockData();

        // A. Tenta buscar MOEDAS (Fiat)
        try {
            const res = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL');
            fiatData = res.data;
        } catch (e) {
            console.warn("API Fiat falhou, usando dados backup");
            fiatData = mock; // Usa backup se falhar
        }

        // B. Tenta buscar CRIPTO
        try {
            const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=brl&include_24hr_change=true');
            cryptoData = res.data;
        } catch (e) {
            console.warn("API Crypto falhou, usando dados backup");
            cryptoData = mock; // Usa backup se falhar
        }

        // C. Gera dados da B3
        const b3Data = getB3Data();

        try {
            // Garante que temos dados (ou da API ou do Mock) antes de montar a lista
            const usd = fiatData.USDBRL || mock.USDBRL;
            const eur = fiatData.EURBRL || mock.EURBRL;
            const gbp = fiatData.GBPBRL || mock.GBPBRL;
            
            const btc = cryptoData.bitcoin || mock.bitcoin;
            const eth = cryptoData.ethereum || mock.ethereum;
            const sol = cryptoData.solana || mock.solana;

            const newData: PriceData[] = [
                ...b3Data, // Ações B3

                // Moedas Fiat
                {
                    name: 'Dólar Comercial', symbol: 'USD',
                    price: parseFloat(usd.bid),
                    change: parseFloat(usd.pctChange),
                    category: 'fiat', image: 'https://flagcdn.com/w80/us.png'
                },
                {
                    name: 'Euro', symbol: 'EUR',
                    price: parseFloat(eur.bid),
                    change: parseFloat(eur.pctChange),
                    category: 'fiat', image: 'https://flagcdn.com/w80/eu.png'
                },
                {
                    name: 'Libra Esterlina', symbol: 'GBP',
                    price: parseFloat(gbp.bid),
                    change: parseFloat(gbp.pctChange),
                    category: 'fiat', image: 'https://flagcdn.com/w80/gb.png'
                },

                // Cripto
                {
                    name: 'Bitcoin', symbol: 'BTC',
                    price: Number(btc.brl),
                    change: Number(btc.brl_24h_change),
                    category: 'crypto', image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'
                },
                {
                    name: 'Ethereum', symbol: 'ETH',
                    price: Number(eth.brl),
                    change: Number(eth.brl_24h_change),
                    category: 'crypto', image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
                },
                {
                    name: 'Solana', symbol: 'SOL',
                    price: Number(sol.brl),
                    change: Number(sol.brl_24h_change),
                    category: 'crypto', image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png'
                }
            ];

            setData(newData);
            setLastUpdate(new Date().toLocaleTimeString());

        } catch (error) {
            console.error("Erro na montagem dos dados", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 15000);
        return () => clearInterval(interval);
    }, []);

    // Função de renderização segura do preço
    const renderPrice = (valor: number) => {
        if (typeof valor !== 'number' || isNaN(valor)) return 'R$ ---';
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <Overlay>
            <ModalContainer>
                <GridBackground />
                <Header>
                    <div className="title-box">
                        <span className="live-indicator"><span className="dot"></span> LIVE_MARKET</span>
                        <h2>B3 & GLOBAL MARKETS</h2>
                    </div>
                    <CloseButton onClick={onClose}><span className="icon">✕</span></CloseButton>
                </Header>

                <SubHeader>
                    <div className="status-group">
                        <p>STATUS: <span className="green">ONLINE</span></p>
                        <p>SOURCE: <span className="blue">HYBRID FEED</span></p>
                    </div>
                    <p className="update-time">UPDATED: <span className="yellow">{lastUpdate}</span></p>
                </SubHeader>

                {loading && data.length === 0 ? (
                    <LoadingContainer>
                        <Spinner />
                        <p>CARREGANDO DADOS...</p>
                    </LoadingContainer>
                ) : (
                    <AssetsGrid>
                        {data.map((item, index) => (
                            <AssetCard key={`${item.symbol}-${index}`} $isPositive={item.change >= 0}>
                                <div className="glow-bg"></div>
                                <div className="card-top">
                                    <div className="asset-identity">
                                        <div className="img-container">
                                            <img src={item.image} alt={item.symbol} onError={(e) => e.currentTarget.style.display = 'none'} />
                                        </div>
                                        <div>
                                            <span className="symbol">{item.symbol}</span>
                                            <span className="name">{item.name}</span>
                                        </div>
                                    </div>
                                    <Badge $isPositive={item.change >= 0}>
                                        {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change || 0).toFixed(2)}%
                                    </Badge>
                                </div>
                                <div className="price-section">
                                    <small>PREÇO (BRL)</small>
                                    <div className="price-value">
                                        {renderPrice(item.price)}
                                    </div>
                                </div>
                            </AssetCard>
                        ))}
                    </AssetsGrid>
                )}
                
                <FooterBar>
                    <div className="ticker-text">B3 (Simulado) • Cripto & Moedas (API + Backup)</div>
                    <RefreshButton onClick={fetchData}>ATUALIZAR [R]</RefreshButton>
                </FooterBar>
            </ModalContainer>
        </Overlay>
    );
};

// --- ESTILOS ---
const pulse = keyframes` 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } `;
const spin = keyframes` 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } `;
const slideUp = keyframes` from { opacity: 0; transform: translateY(30px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } `;

const Overlay = styled.div`
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px); z-index: 99999;
    display: flex; align-items: center; justify-content: center; padding: 20px;
`;

const ModalContainer = styled.div`
    background: #0b0d14; width: 100%; max-width: 1100px;
    border: 1px solid #334155; border-radius: 16px; box-shadow: 0 0 80px rgba(0, 0, 0, 0.9);
    position: relative; overflow: hidden; display: flex; flex-direction: column;
    max-height: 90vh; animation: ${slideUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

const GridBackground = styled.div`
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background-image: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    background-size: 100% 2px, 3px 100%; pointer-events: none; z-index: 0; opacity: 0.3;
`;

const Header = styled.div`
    display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2.5rem;
    border-bottom: 1px solid #1e293b; position: relative; z-index: 1; background: rgba(11, 13, 20, 0.9);
    .title-box { display: flex; align-items: center; gap: 15px; h2 { font-family: 'Fira Code', monospace; color: #f8fafc; font-size: 1.4rem; letter-spacing: 1px; } }
    .live-indicator { display: flex; align-items: center; gap: 6px; font-size: 0.7rem; font-weight: bold; color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 4px 8px; border-radius: 4px; .dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: ${pulse} 1.5s infinite; box-shadow: 0 0 8px #10b981; } }
`;

const SubHeader = styled.div`
    display: flex; justify-content: space-between; padding: 0.8rem 2.5rem; background: #0f172a;
    border-bottom: 1px solid #1e293b; font-family: 'Fira Code', monospace; font-size: 0.75rem; color: #64748b; position: relative; z-index: 1;
    .status-group { display: flex; gap: 20px; } .green { color: #10b981; } .blue { color: #38bdf8; } .yellow { color: #fbbf24; }
`;

const CloseButton = styled.button`
    background: none; border: 1px solid #334155; border-radius: 6px; color: #94a3b8; cursor: pointer;
    display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; transition: all 0.2s;
    &:hover { border-color: #ef4444; color: #ef4444; background: rgba(239, 68, 68, 0.1); }
`;

const AssetsGrid = styled.div`
    display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; padding: 2.5rem;
    position: relative; z-index: 1; overflow-y: auto; justify-content: center;
`;

const AssetCard = styled.div<{ $isPositive: boolean }>`
    background: rgba(30, 41, 59, 0.4); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 1.2rem; position: relative; overflow: hidden; transition: all 0.3s ease;
    display: flex; flex-direction: column; justify-content: space-between;
    &:hover { transform: translateY(-5px); border-color: ${({ $isPositive }) => $isPositive ? '#10b981' : '#ef4444'}; background: rgba(30, 41, 59, 0.6); }
    .glow-bg { position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, ${({ $isPositive }) => $isPositive ? 'rgba(16, 185, 129, 0.03)' : 'rgba(239, 68, 68, 0.03)'} 0%, transparent 60%); pointer-events: none; }
    .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
    .asset-identity { display: flex; gap: 10px; align-items: center; .img-container { width: 32px; height: 32px; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; overflow: hidden; } img { width: 100%; height: 100%; object-fit: cover; } div { display: flex; flex-direction: column; } .symbol { font-weight: 800; color: #f8fafc; font-size: 1rem; } .name { font-size: 0.7rem; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 80px; } }
    .price-section { small { font-family: 'Fira Code', monospace; font-size: 0.65rem; color: #64748b; display: block; margin-bottom: 4px; } .price-value { font-size: 1.2rem; font-weight: 700; color: #f8fafc; letter-spacing: -0.5px; } }
`;

const Badge = styled.div<{ $isPositive: boolean }>`
    font-family: 'Fira Code', monospace; font-size: 0.75rem; font-weight: bold; padding: 4px 6px; border-radius: 4px;
    background: ${({ $isPositive }) => $isPositive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
    color: ${({ $isPositive }) => $isPositive ? '#10b981' : '#ef4444'}; white-space: nowrap;
`;

const FooterBar = styled.div`
    padding: 1rem 2.5rem; border-top: 1px solid #1e293b; display: flex; align-items: center; justify-content: space-between; background: rgba(11, 13, 20, 0.95); z-index: 1;
    .ticker-text { color: #475569; font-family: 'Fira Code', monospace; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; }
    @media (max-width: 600px) { flex-direction: column; gap: 10px; .ticker-text { display: none; } }
`;

const RefreshButton = styled.button`
    background: #38bdf8; color: #0f172a; font-family: 'Fira Code', monospace; font-weight: bold; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; transition: all 0.2s; text-transform: uppercase; font-size: 0.75rem;
    &:hover { background: #7dd3fc; box-shadow: 0 0 15px rgba(56, 189, 248, 0.5); } &:active { transform: scale(0.98); }
`;

const LoadingContainer = styled.div`
    padding: 6rem; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; color: #38bdf8; font-family: 'Fira Code', monospace; font-size: 0.9rem;
`;

const Spinner = styled.div`
    width: 40px; height: 40px; border: 3px solid rgba(56, 189, 248, 0.3); border-top-color: #38bdf8; border-radius: 50%; animation: ${spin} 1s linear infinite;
`;