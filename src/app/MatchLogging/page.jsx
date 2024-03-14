'use client'
import React, { useState } from 'react';

import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import Header from "../../components/MatchLogging/Header";
import MatchDetailsComponent from "../../components/MatchLogging/MatchDetails";
import MatchInfoComponent from "../../components/MatchLogging/MatchInfoComponent";
import ActionButton from "../../components/MatchLogging/ActionButton";
import FooterActions from "../../components/MatchLogging/FooterActions";

const LoggingPage = () => {
  const [matchActions, setMatchActions] = useState([]);
  const actions = ['Goal', 'Red Card', 'Yellow Card', "Offside", "Subtitute", "Penalty"]; // Define more actions as needed
  const homeTeam = { name: 'SC Freiburg' };
  const awayTeam = { name: 'Lens' };
  const homeTeamPlayers = [{ id: 1, name: 'Player 1' }, { id: 2, name: 'Player 2' }]; // Replace with actual data
  const awayTeamPlayers = [{ id: 3, name: 'Player 3' }, { id: 4, name: 'Player 4' }]; // Replace with actual data
  const homeTeamActions = matchActions.filter(action => action.team === homeTeam.name);
  const awayTeamActions = matchActions.filter(action => action.team === awayTeam.name);
  
  const handleAction = (teamName, actionType, playerName) => {
    const newAction = {
      team: teamName,
      action: actionType,
      player: playerName,
      time: new Date() // or any other time logic
    };
    setMatchActions(prevActions => [...prevActions, newAction]);
  };
  return (
    <div className=" pb-20">
      <Header />
      <MatchDetailsComponent
        homeTeam={{ name: 'SC Freiburg', logoUrl: 'https://images.fotmob.com/image_resources/logo/teamlogo/8358_small.png', url: '/teams/8358/overview/sc-freiburg' }}
        awayTeam={{ name: 'Lens', logoUrl: 'https://images.fotmob.com/image_resources/logo/teamlogo/8588_small.png', url: '/teams/8588/overview/lens' }}
        matchTime='Live'
        matchScore='0 - 0' />

      <MatchInfoComponent
        infoItems={[
          { id: 1, iconSvg: '', text: 'February 22, 2024, 6:45 PM' },
          { id: 2, iconSvg: '', text: 'Europa-Park Stadion' },
          { id: 3, iconSvg: '', text: 'Rade Obrenović' }

        ]}
      />
      <div className="actions-container flex justify-between">
        <div className="home-team-actions flex  flex-col gap-4">
          {actions.map(action => (
            <ActionButton
  key={action}
  teamName={homeTeam.name}
  actionType={action}
  players={homeTeamPlayers}
  listPosition="right"
  onAction={handleAction} // Passing the callback
/>          ))}

        </div>
        <div>
  <h5>Match Details:</h5>
  <table>
    <thead>
      <tr>
        <th>{homeTeam.name}</th>
        <th>{awayTeam.name}</th>
      </tr>
    </thead>
    <tbody>
      {homeTeamActions.map((action, index) => (
        <tr key={index}>
          <td>
            {action.time.toLocaleTimeString()}: {action.action} by {action.player}
          </td>
          <td>
            {awayTeamActions[index] ? `${awayTeamActions[index].time.toLocaleTimeString()}: ${awayTeamActions[index].action} by ${awayTeamActions[index].player}` : ''}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        <div className="away-team-actions flex flex-col gap-4">
          {actions.map(action => (
            <ActionButton key={action} teamName={awayTeam.name} actionType={action} players={awayTeamPlayers} listPosition="left"  onAction={handleAction} // Passing the callback
            />
          ))}
        </div>
        <div className='bg-white fixed bottom-0 w-full  p-4'>
<FooterActions></FooterActions>

</div>
      </div>

    </div>

  );
};

export default LoggingPage;
