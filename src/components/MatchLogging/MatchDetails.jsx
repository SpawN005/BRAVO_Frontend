
import React from 'react'

export default function MatchDetails({ homeTeam, awayTeam, matchTime, matchScore }) {
  return (
    <div>  
      <section>
    <header style={{ display: 'grid', gridTemplateColumns: '1fr 140px 1fr', alignItems: 'center' }}>
      <TeamLogoComponent teamName={homeTeam.name} teamLogoUrl={homeTeam.logoUrl} teamUrl={homeTeam.url} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ fontSize: '30px' }}>{matchTime}</span>
        <span style={{ fontSize: '16px' }}>{matchScore}</span>
      </div>
      <TeamLogoComponent teamName={awayTeam.name} teamLogoUrl={awayTeam.logoUrl} teamUrl={awayTeam.url} />
    </header>
  </section></div>
  )
}



  const TeamLogoComponent = ({ teamName, teamLogoUrl, teamUrl }) => (
    <a href={teamUrl} style={{ textDecoration: 'none solid rgb(0, 0, 0)', color: 'rgb(0, 0, 0)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '24px', color: 'rgb(0, 0, 0)' }}>{teamName}</span>
        <img src={teamLogoUrl} alt={teamName} width="40" height="40" style={{ marginLeft: '16px' }} />
      </div>
    </a>
  );
  