"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styled from "styled-components";

const ClubInfoContainer = styled.div`
  max-height: 365px;
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
  overflow-y: none;

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

const TeamDetails = ({ teamData }) => {
  console.log(teamData);
  return (
    <ClubInfoContainer>
      {teamData ? (
        <ClubInfoTable>
          <ClubLogo>
            <img src={teamData.logo} alt={teamData.name} width="115" />
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
            <ClubTableRowHead>Match nul </ClubTableRowHead>
            <ClubTableRowBody>{teamData.nul}</ClubTableRowBody>
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
