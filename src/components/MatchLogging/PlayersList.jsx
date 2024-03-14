import React from 'react'

export default function PlayersList({ players, onPlayerClick }) {
  return (
<div className="players-list bg-white shadow-lg rounded-md p-2">
    {players.map(player => (
      <div
        key={player.id}
        className="player-item p-1 cursor-pointer"
        onClick={() => onPlayerClick(player.name)}
      >
        {player.name}
      </div>
    ))}
  </div>
  )
}
