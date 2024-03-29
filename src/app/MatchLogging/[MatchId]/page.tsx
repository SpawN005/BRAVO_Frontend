'use client'
import React, { useState, useEffect } from 'react';

import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import Header from "../../../components/MatchLogging/Header";
import MatchDetailsComponent from "../../../components/MatchLogging/MatchDetails";
import MatchInfoComponent from "../../../components/MatchLogging/MatchInfoComponent";
import ActionButton from "../../../components/MatchLogging/ActionButton";
import FooterActions from "../../../components/MatchLogging/FooterActions";
import matchLoggingService from '@/services/MatchLogging/MatchLoggingService';
import { usePathname } from 'next/navigation'

const LoggingPage = () => {
  const [matchDetails, setMatchDetails] = useState(null);
  const [matchActions, setMatchActions] = useState([]);
    const actions = ['Goal', 'Red Card', 'Yellow Card', "Subtitute", "Penalty"]; // Define more actions as needed
  const homeTeam = { name: 'SC Freiburg' };
  const awayTeam = { name: 'Lens' };


  const homeTeamPlayers = [{ id: 1, name: 'Player 1' }, { id: 2, name: 'Player 2' }]; // Replace with actual data
  const awayTeamPlayers = [{ id: 3, name: 'Player 3' }, { id: 4, name: 'Player 4' }]; // Replace with actual data
  const homeTeamActions = matchActions.filter(action => action.team === homeTeam.name);
  const awayTeamActions = matchActions.filter(action => action.team === awayTeam.name);
  const pathname = usePathname()

  const actionStyles = {
    'Goal': { backgroundColor: 'green', iconImage: 'path/to/goal-icon.png' },
    'Red Card': { backgroundColor: 'red', iconImage: 'path/to/redcard-icon.png' },
    'Yellow Card': { backgroundColor: 'yellow', iconImage: 'path/to/yellowcard-icon.png' },
    'Substitute': { backgroundColor: 'blue', iconImage: 'path/to/substitute-icon.png' },
    'Penalty': { backgroundColor: 'purple', iconImage: 'path/to/penalty-icon.png' },
    // Add more action styles here as needed
  };

  useEffect(() => {
    //const matchId = '65e5c560c17097502c672541'; // The match ID
    const pathParts = pathname.split('/');
    const matchId = pathParts[pathParts.length - 1];
    
    matchLoggingService.getMatchDetails(matchId)
      .then(data => {
        setMatchDetails(data);
      })
      .catch(error => {
        console.error('Error fetching match details:', error);
      });
  }, []);


  if (!matchDetails) {
    return <div>Loading match details...</div>;
  }

const handleAction = (teamName, actionType, playerName) => {
  const newAction = {
    team: teamName,
    action: actionType,
    player: playerName,
    time: new Date()
  };
  
    setMatchActions(prevActions => [...prevActions, newAction]);
  };
  return (
    <div className=" pb-20">
      <Header />
      <MatchDetailsComponent
        homeTeam={{ name: matchDetails.team1Name, logoUrl: 'path/to/team1logo.png', url: `/teams/${matchDetails.team1}/overview` }}
        awayTeam={{ name: matchDetails.team2Name, logoUrl: 'path/to/team2logo.png', url: `/teams/${matchDetails.team2}/overview` }}
        matchTime='Live'
        matchScore='0 - 0'
      />

      <MatchInfoComponent
        infoItems={[
          { id: 1, iconSvg: '', text: 'February 22, 2024, 6:45 PM' },
          { id: 2, iconSvg: '', text: 'Europa-Park Stadion' },
          { id: 3, iconSvg: '', text: 'Rade Obrenović' }

        ]}
      />
      <div className="actions-container flex justify-between">
        <div className="home-team-actions flex  flex-col gap-4">
        {actions.map(action => {
  // Check if the action has a defined style, otherwise provide a default
  const { backgroundColor, iconImage } = actionStyles[action] || { backgroundColor: 'gray', iconImage: 'path/to/default-icon.png' };

  return (
    <ActionButton
      key={action}
      teamName={homeTeam.name}
      actionType={action}
      players={homeTeamPlayers}
      listPosition="right"
      onAction={handleAction}
      backgroundColor={backgroundColor}
      iconImage={iconImage}
    />
  );
})}
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
        {actions.map(action => {
  // Check if the action has a defined style, otherwise provide a default
  const { backgroundColor, iconImage } = actionStyles[action] || { backgroundColor: 'gray', iconImage: 'path/to/default-icon.png' };

  return (
    <ActionButton
      key={action}
      teamName={awayTeam.name}
      actionType={action}
      players={awayTeamPlayers}
      listPosition="left"
      onAction={handleAction}
      backgroundColor={backgroundColor}
      iconImage={iconImage}
    />
  );
})}
        </div>
        <div className='bg-white fixed bottom-0 w-full  p-4'>
<FooterActions></FooterActions>

</div>
      </div>

    </div>

  );
};

export default LoggingPage;
