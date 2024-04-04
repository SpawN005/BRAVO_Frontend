import React, { useState, useEffect } from "react";
import {
  Label,
  Dropdown,
  Segment,
  Grid,
  Header,
  Button,
  Menu,
} from "semantic-ui-react";
import "./header.css";
import io from "socket.io-client";
const gameState = {
  "first half": "Première mi-temps",
  "second half": "Deuxième mi-temps",
  finished: "Terminé",
  "extra time": "Temps supplémentaire",
};
const MATCH_DURATION = 90;
const HALF_DURATION = MATCH_DURATION / 2;
export default function StartedGame({
  game,
  onCard,
  Card,
  onGoal,
  Stat,
  onAssist,
  start,
}) {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [redCardPlayers, setRedCardPlayers] = useState([]);
  const [gameTime, setGameTime] = useState(0); // Temps écoulé dans le match (en minutes)
  const [currentHalf, setCurrentHalf] = useState("first half"); // Mi-temps actuelle
  const [matchState, setMatchState] = useState("not started");
  const [scoreTeam1, setScoreTeam1] = useState(0);
  const [scoreTeam2, setScoreTeam2] = useState(0);
  console.log(game);

  const handleGameEvent = (event) => {
    switch (event) {
      case "start":
        // Démarrez le match
        setMatchState("started");
        start(game._id);

        break;
      case "half":
        // Passez à la mi-temps ou au temps supplémentaire
        setCurrentHalf(
          currentHalf === "first half" ? "second half" : "extra time",
        );
        break;
      case "finish":
        setMatchState("finished");

        Stat(game._id, game.team1._id, game.team2._id);
        break;
      default:
        console.log("Événement de match non géré");
    }
  };
  useEffect(() => {
    let timer;
    if (matchState === "started" && gameTime < MATCH_DURATION) {
      timer = setTimeout(() => {
        setGameTime(gameTime + 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [matchState, gameTime]);

  const yellowCard = (playerId, teamS, team) => {
    if (!redCardPlayers.includes(playerId)) {
      // Vérifier si le joueur n'a pas de carton rouge
      setSelectedPlayerId(playerId);
      onCard(teamS, team, playerId);
    } else {
      console.log("Ce joueur a déjà reçu un carton rouge.");
      // Affichez un message d'erreur ou effectuez une action appropriée
    }
  };

  const onCardRed = (playerId, teamS, team) => {
    Card(teamS, team, playerId);
    setRedCardPlayers([...redCardPlayers, playerId]); // Ajouter le joueur à la liste des joueurs avec un carton rouge
  };

  const assist = (playerId, teamS, team) => {
    onAssist(teamS, team, playerId);
  };
  const handleGoalScored = (playerId, teamstatsid, teamid) => {
    const socket = io("http://localhost:3001");

    // Emit 'goalScored' event to the server with data as an object
    socket.emit("goalScored", {
      playerId2: playerId,
      playerId1: playerId,
      teamId: teamid,
      matchId: teamstatsid,
    });
  };
  console.log(game);
  useEffect(() => {
    const socket = io("http://localhost:3001");

    // Listen for updates from the server
    socket.on("updateMatchStats", (updatedStats) => {
      // Mettez à jour les scores des équipes correspondantes
      if (updatedStats.team === game.team1._id) {
        setScoreTeam1(updatedStats.score);
      } else if (updatedStats.team === game.team2._id) {
        setScoreTeam2(updatedStats.score);
      }
    });
    return () => {
      // Déconnectez le socket lorsque le composant est démonté
      socket.disconnect();
    };
  }, []);

  const homePlayers = game.team1p.players.map((player) => {
    const isPlayerSelected = player._id === selectedPlayerId;
    const isRedCardPlayer = redCardPlayers.includes(player._id);

    return (
      <div key={player._id}>
        <Dropdown text={player.firstName} pointing="left" className="link item">
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() =>
                handleGoalScored(player._id, game.statsTeam1, game.team1._id)
              }
            >
              But
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                assist(player._id, game.statsTeam2, game.team2._id)
              }
            >
              assist
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                yellowCard(player._id, game.statsTeam1, game.team1._id)
              }
            >
              Carton Jaune
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                onCardRed(player._id, game.statsTeam1, game.team1._id)
              }
            >
              Carton Rouge
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* Render the Label with a red ribbon if the player has a red card */}
        {isRedCardPlayer && (
          <Label color="red" ribbon>
            {player.firstName}
          </Label>
        )}
        {/* Conditionally render the Label if the player is selected */}
        {isPlayerSelected && (
          <Label color="yellow" ribbon>
            {player.firstName}
          </Label>
        )}
      </div>
    );
  });

  const awayPlayers = game.team2p.lineup.map((player) => (
    <Dropdown
      text={player.firstName}
      pointing="left"
      className="link item"
      key={player._id}
    >
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() =>
            handleGoalScored(player._id, game.statsTeam2, game.team2._id)
          }
        >
          But
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() =>
            handleGoalScored(player._id, game.statsTeam2, game.team2._id)
          }
        >
          assist
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => yellowCard(player._id, game.statsTeam, game.team2._id)}
        >
          Carton Jaune
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => onCardRed(player._id, game.statsTeam2, game.team2._id)}
        >
          Carton Rouge
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ));

  return (
    <Segment className="bg-black">
      <div className="mt-22">
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
                  <span className="match-score-number match-score-number--leading">
                    {scoreTeam1}
                  </span>
                  <span className="match-score-divider">:</span>
                  <span className="match-score-number">{scoreTeam2}</span>
                </div>
                <div className="match-time-lapsed">{gameTime}'</div>
                <div className="match-referee">
                  Mi-temps: <strong>{gameState[currentHalf]}</strong>
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
            <Header as="h2" textAlign="center">
              Joueurs
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} className="match-container">
          <Grid.Column className="team">
            <Menu vertical borderless secondary style={{ width: "95%" }}>
              {homePlayers}
            </Menu>
          </Grid.Column>
          <Grid.Column className="team">
            <Menu vertical borderless secondary style={{ width: "95%" }}>
              {awayPlayers}
            </Menu>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="right" className="actions">
            <Button.Group>
              <Button primary onClick={() => handleGameEvent("start")}>
                Commencer le match
              </Button>
              <Button onClick={() => handleGameEvent("half")}>
                {currentHalf === "first half"
                  ? "Mi-temps"
                  : "Deuxième mi-temps"}
              </Button>
              <Button onClick={() => handleGameEvent("finish")}>
                Terminer le match
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
