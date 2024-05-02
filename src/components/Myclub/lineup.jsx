"use client";
import { useState, useEffect } from "react";
import SoccerLineUp from "react-soccer-lineup";
import axios from "axios"; // Importer Axios
import getUserFromToken from "@/utilities/getUserFromToken ";

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

    nameColor: "ffffff",
  });
  const user = getUserFromToken();
  const [teamid, setTeamid] = useState(null);

  const [error, setError] = useState(null);
  const [homeTeam, setHomeTeam] = useState({
    squad: {
      gk: null,
      df: [],
      cm: [],
      fw: [],
    },
    style: {
      color: `#${state.homeTeamColor}`,
      numberColor: `#${state.homeTeamNumberColor}`,
      nameColor: `#${state.nameColor}`,
    },
  });

  const [number, setNumber] = useState(1);
  const [playerName, setPlayerName] = useState("");
  const [playerPosition, setPlayerPosition] = useState("gk");
  const [playersFromBackend, setPlayersFromBackend] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/team/team/manager/${user.userId}`,
        );
        const players = response.data[0].players;
        setPlayersFromBackend(players);
        setTeamid(response.data[0]._id);
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
        squad: { ...homeTeam.squad, gk: null },
      }));
    } else if (position === "df") {
      setHomeTeam((homeTeam) => ({
        ...homeTeam,
        squad: {
          ...homeTeam.squad,
          df: homeTeam.squad.df.filter((player) => player.id !== id),
        },
      }));
    } else if (position === "fw") {
      setHomeTeam((homeTeam) => ({
        ...homeTeam,
        squad: {
          ...homeTeam.squad,
          fw: homeTeam.squad.fw.filter((player) => player.id !== id),
        },
      }));
    } else if (position === "cm") {
      setHomeTeam((homeTeam) => ({
        ...homeTeam,
        squad: {
          ...homeTeam.squad,
          cm: homeTeam.squad.cm.filter((player) => player.id !== id),
        },
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

      await axios.post(
        `http://localhost:3001/team/team/addToLineup/${teamid}`,
        { playerIds },
      );

      setHomeTeam({
        squad: {
          gk: null,
          df: [],
          cm: [],
          fw: [],
        },
        style: {
          color: `#${state.homeTeamColor}`,
          numberColor: `#${state.homeTeamNumberColor}`,
          nameColor: `#${state.nameColor}`,
        },
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
        const player = playersFromBackend.find(
          (player) => player.firstName === playerName,
        );
        if (!player) {
          setError("Player not found!");
          return;
        }
        const alreadyAdded = Object.values(homeTeam.squad)
          .flat()
          .some((p) => p && p.id === player._id);
        if (alreadyAdded) {
          return;
        }

        let playerObj = {
          id: player._id,
          number: number,
          name: playerName,
          color: `#${state.homeTeamColor}`,
          numberColor: `#${state.homeTeamNumberColor}`,
          namecolor: `#${state.nameColor}`,
        };

        if (playerPosition === "gk") {
          if (homeTeam.squad.gk !== null) {
            setError("Home Team goal keeper is full!");
          } else {
            playerObj.onClick = () => playerRemove("gk", playerObj.id);
            setHomeTeam((homeTeam) => ({
              ...homeTeam,
              squad: { ...homeTeam.squad, gk: playerObj },
            }));
          }
        } else if (playerPosition === "df") {
          if (homeTeam.squad.df.length === 5) {
            setError("Home Team defence is full!");
          } else {
            playerObj.onClick = () => playerRemove("df", playerObj.id);
            setHomeTeam((homeTeam) => ({
              ...homeTeam,
              squad: {
                ...homeTeam.squad,
                df: [...homeTeam.squad.df, playerObj],
              },
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
                fw: [...homeTeam.squad.fw, playerObj],
              },
            }));
          }
        } else if (playerPosition === "cm") {
          // Gérer l'ajout de milieux de terrain
          if (homeTeam.squad.cm.length === 5) {
            setError("Home Team midfielder is full!");
          } else {
            playerObj.onClick = () => playerRemove("cm", playerObj.id);
            setHomeTeam((homeTeam) => ({
              ...homeTeam,
              squad: {
                ...homeTeam.squad,
                cm: [...homeTeam.squad.cm, playerObj],
              },
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
        <div className="mt-0">
          <form className="grid grid-cols-12" style={{ width: "100%" }}>
            <div className="form-group col-span-6">
              <label
                htmlFor="playerName"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Select a player
              </label>
              <select
                className="block w-60 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                id="playerName"
                value={playerName}
                onChange={handlePlayerNameChange}
              >
                <option value="">Select Player</option>
                {playersFromBackend.map((player) => (
                  <option key={player._id} value={player.firstName}>
                    {player.firstName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-span-6">
              <label
                htmlFor="playerPosition"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Player Position
              </label>
              <select
                className="block w-60 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                id="playerPosition"
                value={playerPosition}
                onChange={handlePlayerPositionChange}
              >
                <option value="gk">Goal Keeper</option>
                <option value="df">Defence</option>
                <option value="cm">Midfielder</option>
                <option value="fw">Forward</option>
              </select>
            </div>
          </form>
        </div>
        <div className="flex justify-evenly">
          <button
            className="mb-2 mt-2 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={addPlayer}
          >
            Add Player
          </button>
          <button
            className="mb-2 mt-2 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={addToLineup}
          >
            Finish Lineup
          </button>
        </div>
        <div className="col-5">
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
