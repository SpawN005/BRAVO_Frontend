'use client'
import React, { useState } from 'react';
import PlayersList from './PlayersList'
import matchLoggingService from '@/services/MatchLogging/MatchLoggingService'; // adjust the path as needed

export default function ActionButton({ teamName, actionType, players, listPosition, backgroundColor, onAction }) {
    const [isHovering, setIsHovering] = useState(false);
    const handlePlayerClick = playerName => {
        console.log(`Action: ${actionType}, Team: ${teamName}, Player: ${playerName}`);
        const matchId= "65e5c560c17097502c672541"
        const playerId= "65d4ce5a0eeffca291e9761c"
        const teamId= "65d4ce5a0eefffa291e9761f"
        
        if (actionType === 'Goal') {
            // Assuming you have the matchId and other necessary data available
            matchLoggingService.scoreGoal(matchId, playerId,playerId, teamId) // Adjust parameters as needed
                .then(response => {
                    console.log('Goal scored:', response);
                    onAction(teamName, actionType, playerName);
                })
                .catch(error => {
                    console.error('Error in scoring goal:', error);
                });
        } else if (actionType === 'Yellow Card') {
            matchLoggingService.addYellowCard(matchId, playerId, teamId) // Adjust parameters as needed
                .then(response => {
                    console.log('Yellow card added:', response);
                    onAction(teamName, actionType, playerName);
                })
                .catch(error => {
                    console.error('Error in adding yellow card:', error);
                });
        }
        
    };
    const listStyle = listPosition === 'left' ? { right: '100%' } : { left: '100%' };



    return (
        <div 
        className='flex relative'
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
    >
        <div className="action-button-container">
            <button className="w-40 h-24 font-semibold  rounded-md border-2 flex items-center justify-center text-white border-0 "  style={{ backgroundColor: backgroundColor }}>
                {actionType}
            </button>
        </div>
        {isHovering && (
            <div className='absolute top-0 w-40' style={listStyle}>
                <PlayersList players={players} onPlayerClick={handlePlayerClick} />
            </div>
        )}
    </div>
    );
}
