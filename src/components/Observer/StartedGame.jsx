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
  const [gameTime, setGameTime] = useState(1);
  const [currentHalf, setCurrentHalf] = useState("first half");
  const [matchState, setMatchState] = useState("not started");
  const [scoreTeam1, setScoreTeam1] = useState(0);
  const [scoreTeam2, setScoreTeam2] = useState(0);
  const [yellowCardCount, setYellowCardCount] = useState({});
  const [yellow, setYellow] = useState("");
  const [goalname, setGoalname] = useState();
  const [red, setRed] = useState("");
  const [yellowCardPlayers, setYellowCardPlayers] = useState([]);
  const [redCardPlayers, setRedCardPlayers] = useState([]);

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
  useEffect(() => {
    setScoreTeam1(game?.team1?.stats.score);
    setScoreTeam2(game?.team2?.stats.score);
  }, []);

  const assist = (playerId, teamS, team) => {
    if (redCardPlayers.includes(playerId)) {
      console.log(
        "Ce joueur a reçu un carton rouge. Il ne peut pas marquer de but.",
      );
      return;
    }
    onAssist(teamS, team, playerId);
  };
  const handleGoalScored = (playerId, teamstatsid, teamid) => {
    if (redCardPlayers.includes(playerId)) {
      console.log(
        "Ce joueur a reçu un carton rouge. Il ne peut pas marquer de but.",
      );
      return;
    }
    const socket = io("https://bravo-backend.onrender.com");

    socket.emit("goalScored", {
      playerId2: playerId,
      playerId1: playerId,
      teamId: teamid,
      matchId: teamstatsid,
    });
  };
  const handleYellowCardGiven = (playerId, teamstatsid, teamid) => {
    const socket = io("https://bravo-backend.onrender.com");

    // Initialize yellow card count for the player if not already set
    if (!(playerId in yellowCardCount)) {
      yellowCardCount[playerId] = 0;
    }

    // Increment yellow card count for the player
    if (yellowCardCount[playerId] < 3) {
      // Emit 'yellowCardGiven' event to the server
      socket.emit("yellowCardGiven", {
        playerId: playerId,
        teamId: teamid,
        matchId: teamstatsid,
      });

      // Increment yellow card count
      yellowCardCount[playerId] += 1;

      // Add player to yellow card players list if not already in it
      if (!yellowCardPlayers.includes(playerId)) {
        setYellowCardPlayers([...yellowCardPlayers, playerId]);
      }
    }

    // Check if the player has received 2 yellow cards
    if (yellowCardCount[playerId] === 2) {
      // Handle red card for the player
      handleRedCardGiven(playerId, teamstatsid, teamid);

      // Reset the yellow card count for the player
      yellowCardCount[playerId] = 0;

      // Add player to red card players list if not already in it
      if (!redCardPlayers.includes(playerId)) {
        setRedCardPlayers([...redCardPlayers, playerId]);
      }
    }

    // Verify if the player has received a red card before proceeding
    if (redCardPlayers.includes(playerId)) {
      console.log(`Player ${playerId} has already received a red card.`);
      // Handle the scenario where the player has already received a red card
      return; // Early exit if the player has already received a red card
    }
  };

  const handleRedCardGiven = (playerId, teamstatsid, teamid) => {
    if (redCardPlayers.includes(playerId)) {
      console.log(
        "Ce joueur a reçu un carton rouge. Il ne peut pas marquer de but.",
      );
      return;
    }
    const socket = io("https://bravo-backend.onrender.com");

    socket.emit("redCardGiven", {
      playerId: playerId,
      teamId: teamid,
      matchId: teamstatsid,
    });

    setRedCardPlayers([...redCardPlayers, playerId]);
  };

  console.log(game);
  useEffect(() => {
    const socket = io("https://bravo-backend.onrender.com");

    // Listen for updates from the server
    socket.on("updateMatchStats", (updatedStats) => {
      if (updatedStats.scoringTeamStats.team === game.team1._id) {
        setScoreTeam1(updatedStats.scoringTeamStats.score);
      } else if (updatedStats.scoringTeamStats.team === game.team2._id) {
        setScoreTeam2(updatedStats.scoringTeamStats.score);
      }
      // setGoalname(updatedStats.scoringTeamStats.scorers[0].firstName);
    });
    socket.on("updateMatchCard", (updatedCard) => {
      // Vérifiez si la mise à jour concerne les cartons jaunes
      // Récupérez le prénom du joueur du premier élément du tableau des cartons jaunes
      // Mettez à jour l'état avec le prénom du joueur
      setYellow(updatedCard);
    });
    socket.on("updateMatchCardred", (updatedCardred) => {
      // Vérifiez si la mise à jour concerne les cartons jaunes
      // Récupérez le prénom du joueur du premier élément du tableau des cartons jaunes
      // Mettez à jour l'état avec le prénom du joueur
      setRed(updatedCardred);
    });
    return () => {
      // Déconnectez le socket lorsque le composant est démonté
      socket.disconnect();
    };
  }, []);

  const homePlayers = game?.team1?.lineup.map((player) => {
    return (
      <div key={player._id}>
        <Dropdown
          text={player.firstName}
          pointing="left"
          className="link item"
          disabled={!(matchState === "started")}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() =>
                handleGoalScored(
                  player._id,
                  game.team1.stats._id,
                  game.team1._id,
                )
              }
            >
              But
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                assist(player._id, game.team1.stats._id, game.team1._id)
              }
            >
              assist
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                handleYellowCardGiven(
                  player._id,
                  game.team1.stats._id,
                  game.team1._id,
                )
              }
            >
              Carton Jaune
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                handleRedCardGiven(
                  player._id,
                  game.team1.stats._id,
                  game.team1._id,
                )
              }
            >
              Carton Rouge
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* Render the Label with a red ribbon if the player has a red card */}
        {yellowCardPlayers.includes(player._id) && (
          <Label color="yellow" ribbon>
            {player.firstName}
          </Label>
        )}
        {redCardPlayers.includes(player._id) && (
          <Label color="red" ribbon>
            {player.firstName}
          </Label>
        )}
      </div>
    );
  });
  const awayPlayers = game?.team2?.lineup.map((player) => (
    <div key={player._id}>
      <Dropdown
        text={player.firstName}
        pointing="left"
        className="link item"
        disabled={!(matchState === "started")}
      >
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() =>
              handleGoalScored(player._id, game.team2.stats._id, game.team2._id)
            }
          >
            But
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>
              assist(player._id, game.team2.stats._id, game.team2._id)
            }
          >
            assist
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>
              handleYellowCardGiven(
                player._id,
                game.team2.stats._id,
                game.team2._id,
              )
            }
          >
            Carton Jaune
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>
              handleRedCardGiven(
                player._id,
                game.team2.stats._id,
                game.team2._id,
              )
            }
          >
            Carton Rouge
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* Render the Label with a yellow ribbon if the player has a yellow card */}
      {yellowCardPlayers.includes(player._id) && (
        <Label color="yellow" ribbon>
          {player.firstName}
        </Label>
      )}
      {/* Render the Label with a red ribbon if the player has a red card */}
      {redCardPlayers.includes(player._id) && (
        <Label color="red" ribbon>
          {player.firstName}
        </Label>
      )}
    </div>
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
            <Menu vertical borderless secondary style={{ width: "90%" }}>
              {homePlayers}
            </Menu>
          </Grid.Column>
          <Grid.Column className="team">
            <Menu vertical borderless secondary style={{ width: "90%" }}>
              {awayPlayers}
            </Menu>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="right" className="actions">
            <Button.Group>
              {matchState === "not started" && game.status === "UPCOMING" && (
                <Button primary onClick={() => handleGameEvent("start")}>
                  Commencer le match
                </Button>
              )}
              {matchState === "started" ? (
                <>
                  <Button onClick={() => handleGameEvent("half")}>
                    {currentHalf === "first half"
                      ? "Mi-temps"
                      : "Deuxième mi-temps"}
                  </Button>
                  <Button onClick={() => handleGameEvent("finish")}>
                    Terminer le match
                  </Button>
                </>
              ) : (
                ""
              )}
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
