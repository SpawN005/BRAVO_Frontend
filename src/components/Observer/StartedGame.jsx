import React, { useState,useEffect } from 'react';
import { Label, Dropdown, Segment, Grid, Header, Button, Menu } from 'semantic-ui-react';
import './header.css';

const gameState = {
    'first half': 'Première mi-temps',
    'second half': 'Deuxième mi-temps',
    'finished': 'Temps réglementaire terminé',
    'extra time': 'Temps supplémentaire'
};
const MATCH_DURATION = 90; 
const HALF_DURATION = MATCH_DURATION / 2;     
export default function StartedGame({ game, onCard, Card, onGoal, onGameEvent }) {
    
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);
    const [redCardPlayers, setRedCardPlayers] = useState([]); // Liste des joueurs ayant reçu un carton rouge
    const [gameTime, setGameTime] = useState(0); // Temps écoulé dans le match (en minutes)
    const [currentHalf, setCurrentHalf] = useState('first half'); // Mi-temps actuelle

    useEffect(() => {
        const timer = setTimeout(() => {
            if (gameTime < MATCH_DURATION) {
                setGameTime(gameTime + 1);
                if (gameTime === HALF_DURATION) {
                    setCurrentHalf('second half');
                }
            } else {
                setCurrentHalf('finished');
            }
        }, 10000); 

        return () => clearTimeout(timer);
    }, [gameTime]);
    const handleGameEvent = (event) => {
        switch (event) {
            case 'start':
                // Démarrez le match
                startGame();
                break;
            case 'extra time':
                // Passez au temps supplémentaire
                startExtraTime();
                break;
            default:
                console.log('Événement de match non géré');
        }
    };

    const startGame = () => {
        console.log('Le match a commencé.');
        // Mettez en place la logique pour commencer le match ici
    };

    const startExtraTime = () => {
        console.log('Temps supplémentaire commencé.');
        // Mettez en place la logique pour passer au temps supplémentaire ici
    };
    const yellowCard1 = (playerId) => {
        if (!redCardPlayers.includes(playerId)) { // Vérifier si le joueur n'a pas de carton rouge
            setSelectedPlayerId(playerId);
            onCard(game.statsTeam1, game.team1._id, playerId); 
        } else {
            console.log('Ce joueur a déjà reçu un carton rouge.');
            // Affichez un message d'erreur ou effectuez une action appropriée
        }
    };

    const yellowCard2 = (playerId) => {
        if (!redCardPlayers.includes(playerId)) {
            setSelectedPlayerId(playerId);
            onCard(game.statsTeam2, game.team2._id, playerId); 
        } else {
            console.log('Ce joueur a déjà reçu un carton rouge.');
        }
    };

    const onCardRed1 = (playerId) => {
        Card(game.statsTeam1, game.team1._id, playerId);
        setRedCardPlayers([...redCardPlayers, playerId]); // Ajouter le joueur à la liste des joueurs avec un carton rouge
    };

    const onCardRed2 = (playerId) => {
        Card(game.statsTeam2, game.team2._id, playerId); 
        setRedCardPlayers([...redCardPlayers, playerId]);
    };

    const ongoalClick = (playerId) => {
        if (!redCardPlayers.includes(playerId)) {
            onGoal('team1', playerId, playerId, playerId); 
        } else {
            console.log('Ce joueur a déjà reçu un carton rouge et ne peut pas marquer de but.');
        }
    };

    const homePlayers = game.team1p.players.map(player => {
        const isPlayerSelected = player._id === selectedPlayerId;
        const isRedCardPlayer = redCardPlayers.includes(player._id);

        return (
            <div key={player._id}>
                    <Dropdown
                        text={player.firstName}
                        pointing="left"
                        className="link item"
                    >
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => ongoalClick( player._id)}>But</Dropdown.Item>
                        <Dropdown.Item onClick={() => yellowCard1(player._id)}>Carton Jaune</Dropdown.Item>
                        <Dropdown.Item onClick={() => onCardRed1( player._id)}>Carton Rouge</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
   {/* Render the Label with a red ribbon if the player has a red card */}
   {isRedCardPlayer && <Label color="red" ribbon>{player.firstName}</Label>}
                {/* Conditionally render the Label if the player is selected */}
                {isPlayerSelected && <Label color="yellow" ribbon>{player.firstName}</Label>}            </div>
        );
    });

    const awayPlayers = game.team2p.players.map(player => (
        <Dropdown text={player.firstName}
            pointing="left"
            className="link item"
            key={player._id}>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => onGoal('team2', player._id, 'team2')}>But</Dropdown.Item>
                <Dropdown.Item onClick={() => yellowCard2(player._id)}>Carton Jaune</Dropdown.Item>
                <Dropdown.Item onClick={() => onCardRed2( player._id)}>Carton Rouge</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    ));

    return (
     
        <Segment>
            <div className="mt-12">
            <div className="match">
                <div className="match-content">
                    <div className="column">
                        <div className="team">
                            <div className="team-logo">
                                <img src={game.team1.logo} alt="Team 1 Logo" />
                            </div>
                            <h2 className="team-name">{game.team1Name}</h2>
                        </div>
                    </div>
                    <div className="column">
                        <div className="match-details">
                            <div className="match-date">
                                3 May at <strong>17:30</strong>
                            </div>
                            <div className="match-score">
                                <span className="match-score-number match-score-number--leading">{game.team1.stats.score}</span>
                                <span className="match-score-divider">:</span>
                                <span className="match-score-number">{game.team2.stats.score}</span>
                            </div>
                            <div className="match-time-lapsed">
                                {gameTime}'
                            </div>
                            <div className="match-referee">
                                Referee: <strong>{game.referee}</strong>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="team team--away">
                            <div className="team-logo">
                                <img src={game.team2.logo} alt="Team 2 Logo" />
                            </div>
                            <h2 className="team-name">{game.team2Name}</h2>
                        </div>
                    </div>
                </div>
            </div>
            </div>
                     <Grid>

            <Grid.Row columns={1}>
                <Grid.Column>
                    <Header as='h2' textAlign='center'>Joueurs</Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} className="match-container">
                <Grid.Column className="team">
                    <Menu vertical borderless secondary style={{ width: "95%" }}>{homePlayers}</Menu>
                </Grid.Column>
                <Grid.Column className="team">
                    <Menu vertical borderless secondary style={{ width: "95%" }}>{awayPlayers}</Menu>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
                <Grid.Column textAlign="right" className="actions">
                    <Button.Group>
                    <Button primary onClick={() => handleGameEvent('start')}> Commencer le match</Button>
                        <Button onClick={() =>  onGameEvent('second half')}>Mi-temps</Button>
                        <Button  onClick={() => onGameEvent('finished')}>Terminer le match</Button>
                        <Button onClick={() =>  onGameEvent('extra time')}>Temps supplémentaire</Button>
                    </Button.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>

    );
}
