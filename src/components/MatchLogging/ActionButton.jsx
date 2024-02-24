'use client'
import React, { useState } from 'react';
import PlayersList from './PlayersList'
export default function ActionButton({ teamName, actionType, players, listPosition, onAction }) {
    const [isHovering, setIsHovering] = useState(false);
    const handlePlayerClick = playerName => {
        console.log(`Action: ${actionType}, Team: ${teamName}, Player: ${playerName}`);
        onAction(teamName, actionType, playerName);

    };
    const listStyle = listPosition === 'left' ? { right: '100%' } : { left: '100%' };



    return (
        <div 
        className='flex relative'
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
    >
        <div className="action-button-container">
            <button className="w-40 h-24 rounded-md border-2 flex items-center justify-center text-black">
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
