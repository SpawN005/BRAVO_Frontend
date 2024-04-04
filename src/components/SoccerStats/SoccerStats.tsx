"use client"
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { GlobalStyle } from '../../css/styles';
import ClubInfomation from '../Myclub/ClubInfo';
import TeamFixture from '../Myclub/TeamFixture';
import TeamPlayers from '../PlayerDetailles/TeamPlayers';
import PlayerHighlightedStats from '../PlayerDetailles/PlayerStats';
import getUserFromToken from '@/utilities/getUserFromToken ';

const MainBody = styled.div`
  aligh-items: center;
  display: flex;
  flex-flow: column;
  grid-gap: 10px 10px;
  margin-bottom: 100px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1600px;
  min-width: 250px;
  padding-top: 5px;
  width: 80vw;
`;

const ClubInformationSection = styled.div`
  aligh-items: center;
  display: flex;
  flex-flow: row;
  grid-gap: 10px 10px;
  margin-left: auto;
  margin-right: auto;
  max-height: 365px;
  max-width: 1600px;
  min-width: 250px;
  width: 80vw;
`;

const SoccerStats = () => {
  const [teamData, setTeamData] = useState(null);
  const [playerHighlightInfo, setPlayerHighlightInfo] = useState(null); 
  const [teamHighlightFixtures, setteamHighlightFixtures] = useState(null); 
  const user = getUserFromToken();
  teamHighlightFixtures
  useEffect(() => {
   
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/team/team/manager/${user.userId}`);
        setTeamData(response?.data[0]);
   
       
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
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      if (teamData) {
        const response = await axios.get(`http://localhost:3001/matches/matches/${teamData._id}`);
        console.log(response?.data.map((fixture) => (fixture.status)));
  
        const upcomingMatches = response?.data.filter(fixture => fixture.status === "UPCOMING");
  
        // Stocker les matches filtrés dans l'état matches
        setMatches(upcomingMatches);
      }
    };
    fetchMatches();
  }, [teamData]);
  return (
    <MainBody>
      <GlobalStyle />
      <ClubInformationSection>
      
      <ClubInfomation teamData={teamData} />
        <TeamFixture  matches={matches} />
     
      </ClubInformationSection>
    
           
      {teamData && teamData?.players?.length ? (
        <ClubInformationSection>
          <TeamPlayers
            players={teamData?.players}
            highlightPlayerInfo={highlightPlayerInfo}
          />
        <PlayerHighlightedStats playerHighlightInfo={playerHighlightInfo} />
        </ClubInformationSection>
      ) : null}
    </MainBody>
  );
};
export default SoccerStats;


