"use client"
import { useState, useEffect } from "react";
import SoccerLineUp from "react-soccer-lineup";
import axios from "axios"; // Importer Axios
import getUserFromToken from '@/utilities/getUserFromToken ';

export default function App() {
  const [state, setState] = useState({
    color: "588f58",
    pattern: "lines",
    showHomeTeam: false,
    showAwayTeam: false,

    homeTeamColor: "f08080",
    homeTeamNumberColor: "ffffff",
    homeGoalkeeperColor: "d6cb65",
    homeGoalkeeperNumberColor: "333333",

    nameColor: "ffffff"
  });
  const user = getUserFromToken();
  const [teamid, setTeamid] = useState(null);

  const [error, setError] = useState(null);
  const [homeTeam, setHomeTeam] = useState({
    squad: {
      gk: null,
      df: [],
      cm: [] ,
      fw: []
    },
    style: {
      color: `#${state.homeTeamColor}`,
      numberColor: `#${state.homeTeamNumberColor}`,
      nameColor: `#${state.nameColor}`
    }
  });

  const [number, setNumber] = useState(1);
  const [playerName, setPlayerName] = useState("");
  const [playerPosition, setPlayerPosition] = useState("gk");
  const [playersFromBackend, setPlayersFromBackend] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/team/team/manager/${user.userId}`);
        const players = response.data[0].players;
        setPlayersFromBackend(players);
        setTeamid(response.data[0]._id)
      } catch (error) {
        console.error("Error fetching players:", error);
        setError("Error fetching players");
      }
    };

    fetchPlayers();
  }, [user.userId]);

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handlePlayerPositionChange = (event) => {
    setPlayerPosition(event.target.value);
  };

  const playerRemove = (position, id) => {
    if (position === "gk") {
      setHomeTeam((homeTeam) => ({
        ...homeTeam,
        squad: { ...homeTeam.squad, gk: null }
      }));
    } else if (position === "df") {
      setHomeTeam((homeTeam) => ({
        ...homeTeam,
        squad: {
          ...homeTeam.squad,
          df: homeTeam.squad.df.filter((player) => player.id !== id)
        }
      }));
    } else if (position === "fw") {
      setHomeTeam((homeTeam) => ({
        ...homeTeam,
        squad: {
          ...homeTeam.squad,
          fw: homeTeam.squad.fw.filter((player) => player.id !== id)
        }
      }));
    } else if (position === "mf") { // Gérer la suppression des milieux de terrain
      setHomeTeam((homeTeam) => ({
        ...homeTeam,
        squad: {
          ...homeTeam.squad,
          cm: homeTeam.squad.cm.filter((player) => player.id !== id)
        }
      }));
    }
  };

  const addToLineup = async () => {
    setError(null);
    try {
      const playerIds = [];
      if (homeTeam.squad.gk) playerIds.push(homeTeam.squad.gk.id);
      homeTeam.squad.df.forEach((player) => playerIds.push(player.id));
      homeTeam.squad.fw.forEach((player) => playerIds.push(player.id));
      homeTeam.squad.cm.forEach((player) => playerIds.push(player.id)); // Inclure les milieux de terrain

      await axios.post(`http://localhost:3001/team/team/addToLineup/${teamid}`, { playerIds });
      
      setHomeTeam({
        squad: {
          gk: null,
          df: [],
          cm: [],
          fw: []
        },
        style: {
          color: `#${state.homeTeamColor}`,
          numberColor: `#${state.homeTeamNumberColor}`,
          nameColor: `#${state.nameColor}`
        }
      });

      setNumber(1);
      
      localStorage.removeItem("homeTeam");

      alert("Lineup updated successfully");
    } catch (error) {
      console.error("Error adding players to lineup:", error);
      setError("Error adding players to lineup");
    }
  };

  const addPlayer = async () => {
    setError(null);
    if (playerName === "") {
      setError("Player Name required!");
    } else {
      try {
        const player = playersFromBackend.find((player) => player.firstName === playerName);
        if (!player) {
          setError("Player not found!");
          return;
        }

        let playerObj = {
          id: player._id,
          number: number,
          name: playerName,
          color: `#${state.homeTeamColor}`,
          numberColor: `#${state.homeTeamNumberColor}`,
          namecolor: `#${state.nameColor}`
        };

        if (playerPosition === "gk") {
          if (homeTeam.squad.gk !== null) {
            setError("Home Team goal keeper is full!");
          } else {
            playerObj.onClick = () => playerRemove("gk", playerObj.id);
            setHomeTeam((homeTeam) => ({
              ...homeTeam,
              squad: { ...homeTeam.squad, gk: playerObj }
            }));
          }
        } else if (playerPosition === "df") {
          if (homeTeam.squad.df.length === 5  ) {
            setError("Home Team defence is full!");
          } else {
            playerObj.onClick = () => playerRemove("df", playerObj.id);
            setHomeTeam((homeTeam) => ({
              ...homeTeam,
              squad: {
                ...homeTeam.squad,
                df: [...homeTeam.squad.df, playerObj]
              }
            }));
          }
        } else if (playerPosition === "fw") {
          if (homeTeam.squad.fw.length === 5) {
            setError("Home Team forward is full!");
          } else {
            playerObj.onClick = () => playerRemove("fw", playerObj.id);
            setHomeTeam((homeTeam) => ({
              ...homeTeam,
              squad: {
                ...homeTeam.squad,
                fw: [...homeTeam.squad.fw, playerObj]
              }
            }));
          }
        } else if (playerPosition === "cm") { // Gérer l'ajout de milieux de terrain
          if (homeTeam.squad.cm.length === 5) {
            setError("Home Team midfielder is full!");
          } else {
            playerObj.onClick = () => playerRemove("cm", playerObj.id);
            setHomeTeam((homeTeam) => ({
              ...homeTeam,
              squad: {
                ...homeTeam.squad,
                cm: [...homeTeam.squad.cm, playerObj]
              }
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching players:", error);
        setError("Error fetching players");
      }
    }
    setNumber(number + 1);
  };

  useEffect(() => {
    localStorage.setItem("homeTeam", JSON.stringify(homeTeam));
  }, [homeTeam]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <form style={{ color: "white" }}>
            <div className="form-row" style={{ width: "100%" }}>
              <div className="form-group col-12">
                {error !== null ? (
                  <div
                    className="alert alert-danger"
                    role="alert"
                    style={{ marginTop: "32px" }}
                  >
                    {error}
                  </div>
                ) : null}
                <label htmlFor="playerName">Player Name</label>
                <input
                  type="text"
                  className="form-control text-black"
                  id="playerName"
                  placeholder="Player Name"
                  value={playerName}
                  onChange={handlePlayerNameChange}
                />
              </div>
              <fieldset className="form-group">
                <div className="row">
                  <legend className="col-form-label col-12">
                    <b>Player Position</b>
                  </legend>
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input text-black"
                        type="radio"
                        value="gk"
                        checked={playerPosition === "gk"}
                        onChange={handlePlayerPositionChange}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Goal Keeper
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input text-black"
                        type="radio"
                        value="df"
                        checked={playerPosition === "df"}
                        onChange={handlePlayerPositionChange}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Defence
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input text-black"
                        type="radio"
                        value="cm"
                        checked={playerPosition === "cm"}
                        onChange={handlePlayerPositionChange}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Midfielder
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input text-black"
                        type="radio"
                        value="fw"
                        checked={playerPosition === "fw"}
                        onChange={handlePlayerPositionChange}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Forward
                      </label>
                    </div>
                    
                  </div>
                </div>
              </fieldset>
            </div>
          </form>
          <button className="btn btn-primary" onClick={addPlayer}>
            Add Player
          </button>
          <button className="btn btn-success" onClick={addToLineup}>
            Finish Lineup
          </button>
        </div>
        <div className="col-5" >
          <SoccerLineUp
            size={"responsive"}
            color={"green"}
            pattern={"squares"}
            homeTeam={homeTeam}
          />
        </div>
      </div>
    </div>
  );
}

