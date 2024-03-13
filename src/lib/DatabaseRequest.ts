/* eslint-disable no-console */
import axios from 'axios';





export const getTeamInfo = (callback) => {
     axios.get('http://localhost:3001/team/team/65da70b9d228792b5811e469')
        .then((team) => {
      callback(team.data);
    })
    .catch((err) => console.error(err));
};

export const getTeamPlayers = (callback) => {
    axios.get('http://localhost:3001/team/team/65da70b9d228792b5811e469')
    .then((players) => {
      callback(players.data);
    })
    .catch((err) => console.error(err));
};

export const getPlayerStats = (id, callback) => {
  axios.get(`http://localhost:3001/player/${id}`)
    .then((player) => {
      callback(player.data);
    })
    .catch((err) => console.error(err));
};