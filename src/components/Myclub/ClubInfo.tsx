"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ClubInfoContainer = styled.div`
  height: 320px;
`;

const ClubInfoTable = styled.div`
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-flow: column;
  max-height: 366px;
  min-height: 366px;
  min-width: 350px;
  padding: 5px;

  
`;

const ClubLogo = styled.div`
  display: flex;
  justify-content: space-evenly;
  max-height: auto;
  padding: 10px;
`;

const ClubTable = styled.div`
  border-radius: 4px;
  border-top: 1px solid #f1f3f4;
  display: grid;
  grid-template-columns: 100px 1fr;
  padding: 5px;
`;

const ClubTableRowHead = styled.div`
  display: flex;
  flex-flow: column;
  font-weight: 700;
`;

const ClubTableRowBody = styled.div`
  display: flex;
  flex-flow: column;
`;

const TeamDetails = () => {
  const [teamData, setTeamData] = useState(null);

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

  return (
    <ClubInfoContainer>
    {teamData ? (
          <ClubInfoTable >
          <ClubLogo>
            <img src={`http://localhost:3001/uploads/1708437605158.png`} alt={teamData.name} width="115" />
          </ClubLogo>
          <ClubTable>
            <ClubTableRowHead>Club</ClubTableRowHead>
            <ClubTableRowBody>{teamData.name}</ClubTableRowBody>
          </ClubTable>
          
          <ClubTable>
            <ClubTableRowHead>Country</ClubTableRowHead>
            <ClubTableRowBody>{teamData.country}</ClubTableRowBody>
          </ClubTable>
          <ClubTable>
            <ClubTableRowHead>City</ClubTableRowHead>
            <ClubTableRowBody>{teamData.city}</ClubTableRowBody>
          </ClubTable>
          <ClubTable>
            <ClubTableRowHead>Match Win</ClubTableRowHead>
            <ClubTableRowBody>{teamData.win}</ClubTableRowBody>
          </ClubTable>
          <ClubTable>
            <ClubTableRowHead>Match lose </ClubTableRowHead>
            <ClubTableRowBody>{teamData.lose}</ClubTableRowBody>
          </ClubTable>
          <ClubTable>
            <ClubTableRowHead>score</ClubTableRowHead>
            <ClubTableRowBody>{teamData.score}</ClubTableRowBody>
          </ClubTable>
        </ClubInfoTable>
     ) : (
      <p className="text-center">Loading team details...</p>
    )}
    </ClubInfoContainer>
  );
};

export default TeamDetails;

