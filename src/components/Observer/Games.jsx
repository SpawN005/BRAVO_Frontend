"use client"
import React, { useState, useEffect } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import StartedGame from './StartedGame';
import axios from 'axios';
import UserMatches from './UserMatches';
export default function Games({ matchId }) {
    const [games, setGames] = useState([]);
    
    console.log(matchId)
    useEffect(() => {
        const fetchGame = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/matches/${matchId}`);
                    setGames([response.data]); // Mettez la réponse dans un tableau
                    console.log(response.data)
                } catch (error) {
                    console.error('Error fetching game details:', error);
                }
            
        };

        fetchGame();
    }, [matchId]);
    const goalScored = async (gameId, team, playerId, assister) => {
        try {
            const response = await axios.post(`http://localhost:3001/match-stats/score/${gameId}`, {
                idplayer1: playerId,
                idplayer2: assister,
                idteam: team,
            });
        } catch (error) {
            console.error('Error recording goal:', error);
        }
    };
    const assist = async (gameId, team, assister) => {
        try {
            const response = await axios.post(`http://localhost:3001/match-stats/assist/${gameId}`, {
                idplayer: assister,
                idteam: team,
            });
        } catch (error) {
            console.error('Error recording goal:', error);
        }
    };
    const finalResult = async (gameId,team1,team2) => {
        try {
              await axios.post(`http://localhost:3001/match-stats/updateTeamWin/${gameId}`, {
                team1Id: team1,
                team2Id: team2
            });
        } catch (error) {
            console.error('Error recording goal:', error);
        }
    };
    const startMatch = async (gameId) => {
        try {
              await axios.post(`http://localhost:3001/match-stats/startMatch/${gameId}`, {
               
            });
        } catch (error) {
            console.error('Error recording goal:', error);
        }
    };
    
    const cardGiven = async ( gameId,team, playerId) => {
        try {
            const response = await axios.post(`http://localhost:3001/match-stats/yellow-card/${gameId}`, {
                idplayer: playerId,
                idteam: team
            });

            console.log('Carton jaune attribué:', response.data);
           

        } catch (error) {
            console.log('Carton jaune attribué:',games[0].team1);

            console.error('Erreur lors de l\'attribution du carton jaune:', error);
        }
    };
    const redcard = async (gameId,teamN, playerId) => {
        try {
            const response = await axios.post(`http://localhost:3001/match-stats/red-card/${gameId}`, {
                idplayer: playerId,
                idteam: teamN
            });
            console.log('Carton rouge attribué:', response.data);
           

        } catch (error) {
            console.log('Carton rouge attribué:',teamN);

            console.error('Erreur lors de l\'attribution du carton jaune:', error);
        }
    };


    return (
        <Container>
            <Segment.Group>

            {Array.isArray(games) && games.map(game => (
                    <StartedGame
                        key={game._id}
                        game={game}
                        onGoal={goalScored}
                        onAssist={assist}
                        onCard={cardGiven}
                        Card={redcard}
                        Stat={finalResult}
                        start={startMatch}
                    />
                ))}
            </Segment.Group>
        </Container>
    );
}
