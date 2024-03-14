"use client"
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { GlobalStyle } from '../../css/styles';
import ClubInfomation from '../Myclub/ClubInfo';
import TeamFixture from '../Myclub/TeamFixture';
import TeamPlayers from '../PlayerDetailles/TeamPlayers';
import PlayerHighlightedStats from '../PlayerDetailles/PlayerStats';

const MainBody = styled.div`
  display: flex;
  flex-flow: column;
  grid-gap: 10px 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1600px;
  min-width: 150px;
  width: 80vw;
`;
const ClubInformationSections = styled.div`
display: flex;
flex-flow: row;
grid-gap: 10px 10px;
margin-left: auto;
margin-right: auto;
margin-top :50px;
max-height: 365px;
min-width: 1250px;
`;
const ClubInformationSection = styled.div`
  display: flex;
  flex-flow: row;
  grid-gap: 10px 10px;
  margin-left: auto;
  margin-right: 80px;
  margin-top :50px;
  max-height: 365px;
  min-width: 250px;
  width: 80vw;
`;

const SoccerStats = () => {
  const [teamData, setTeamData] = useState(null);
  const [playerHighlightInfo, setPlayerHighlightInfo] = useState(null); 
  const [teamHighlightFixtures, setteamHighlightFixtures] = useState(null); 


  teamHighlightFixtures
  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/team/team/65df4a77413766bede36e741');
        setTeamData(response.data);
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };

    fetchTeamDetails();
  }, []);

  const highlightPlayerInfo = async (playerId) => {
    try {
      const response = await axios.get(`http://localhost:3001/player/${playerId}`);
      setPlayerHighlightInfo(response.data);
    } catch (error) {
      console.error('Error fetching player:', error);
    }
  };

  return (
    <MainBody>
      <GlobalStyle />
      <ClubInformationSections>
      
      <ClubInfomation />
      <TeamFixture
              fixtures={teamHighlightFixtures}
            />
      </ClubInformationSections>
    
           
      {teamData && teamData.players.length ? (
        <ClubInformationSection>
          <TeamPlayers
            players={teamData.players}
            highlightPlayerInfo={highlightPlayerInfo}
          />
        <PlayerHighlightedStats playerHighlightInfo={playerHighlightInfo} />
        </ClubInformationSection>
      ) : null}
    </MainBody>
  );
};
export default SoccerStats;


