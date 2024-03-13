"use client"
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PlayerStatsContainer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-flow: column;
  height: 323px;
 
  min-width: 350px;
  padding: 5px;
  overflow-x: hidden;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 9px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #00d4b1;
    border: 1px solid #f1f3f4;
    border-radius: 4px;
  }
`;

const PlayerStatsTableContainer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-flow: column;
  min-width: 350px;
  padding: 5px;
`;

const PlayerStatsTable = styled.div`
  border-bottom: 1px solid #f1f3f4;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 150px 1fr;
  padding: 5px;
`;

const PlayerStatsTableRowHead = styled.div`
  display: flex;
  flex-flow: column;
  font-weight: 700;
`;

const PlayerStatsTableRowBody = styled.div`
  display: flex;
  flex-flow: column;
`;

const PlayerHighlightedStats = ({ playerHighlightInfo }) => (
  <PlayerStatsContainer>
    {playerHighlightInfo && (
      <PlayerStatsTableContainer>
        <PlayerStatsTable>
          <PlayerStatsTableRowHead>Name</PlayerStatsTableRowHead>
          <PlayerStatsTableRowBody>{playerHighlightInfo.firstName}</PlayerStatsTableRowBody>
        </PlayerStatsTable>
        <PlayerStatsTable>
          <PlayerStatsTableRowHead>prenom</PlayerStatsTableRowHead>
          <PlayerStatsTableRowBody>{playerHighlightInfo.lastName}</PlayerStatsTableRowBody>
        </PlayerStatsTable>
        <PlayerStatsTable>
          <PlayerStatsTableRowHead>Position</PlayerStatsTableRowHead>
          <PlayerStatsTableRowBody>{playerHighlightInfo.position}</PlayerStatsTableRowBody>
        </PlayerStatsTable>
        <PlayerStatsTable>
          <PlayerStatsTableRowHead>yellowCards</PlayerStatsTableRowHead>
          <PlayerStatsTableRowBody>{playerHighlightInfo.yellowCards}</PlayerStatsTableRowBody>
        </PlayerStatsTable>
        <PlayerStatsTable>
          <PlayerStatsTableRowHead>redCards</PlayerStatsTableRowHead>
          <PlayerStatsTableRowBody>{playerHighlightInfo.redCards}</PlayerStatsTableRowBody>
        </PlayerStatsTable>
        <PlayerStatsTable>
          <PlayerStatsTableRowHead>goalsScored</PlayerStatsTableRowHead>
          <PlayerStatsTableRowBody>{playerHighlightInfo.goalsScored}</PlayerStatsTableRowBody>
        </PlayerStatsTable>
        <PlayerStatsTable>
          <PlayerStatsTableRowHead>assist</PlayerStatsTableRowHead>
          <PlayerStatsTableRowBody>{playerHighlightInfo.assist}</PlayerStatsTableRowBody>
        </PlayerStatsTable>
        <PlayerStatsTable>
          <PlayerStatsTableRowHead>cleanSheets</PlayerStatsTableRowHead>
          <PlayerStatsTableRowBody>{playerHighlightInfo.cleanSheets}</PlayerStatsTableRowBody>
        </PlayerStatsTable>
      </PlayerStatsTableContainer>
    )}
  </PlayerStatsContainer>
);

PlayerHighlightedStats.propTypes = {
  playerHighlightInfo: PropTypes.object, // Assurez-vous que playerHighlightInfo est un objet
};

export default PlayerHighlightedStats;