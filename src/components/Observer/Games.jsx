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

                } catch (error) {
                    console.error('Error fetching game details:', error);
                }
            
        };

        fetchGame();
    }, [matchId]);
    const goalScored = async (gameId, team, playerId, assister) => {
        try {
            const response = await axios.post('http://localhost:3001/match-stats/score/65f300ae1bca4428915cf2f1', {
                idplayer1: playerId,
                idplayer2: assister,
                idteam: games[0].team1._id,
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
            console.log('Carton jaune attribué:', response.data);
           

        } catch (error) {
            console.log('Carton jaune attribué:',teamN);

            console.error('Erreur lors de l\'attribution du carton jaune:', error);
        }
    };

    const gameEvent = async (gameId, event) => {
        try {
            const updatedGames = games.map(game => {
                if (game._id === gameId) {
                    game.state = event;
                }
                return game;
            });
            setGames(updatedGames);

            await axios.post('/match', {
                gameId,
                event
            });
        } catch (error) {
            console.error('Error updating game event:', error);
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
                        onCard={cardGiven}
                        Card={redcard}
                        onGameEvent={gameEvent}
                    />
                ))}
            </Segment.Group>
        </Container>
    );
}
