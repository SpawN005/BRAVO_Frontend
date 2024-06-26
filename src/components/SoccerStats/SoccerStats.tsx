"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { GlobalStyle } from "../../css/styles";
import ClubInfomation from "../Myclub/ClubInfo";
import TeamFixture from "../Myclub/TeamFixture";
import TeamPlayers from "../PlayerDetailles/TeamPlayers";
import PlayerHighlightedStats from "../PlayerDetailles/PlayerStats";
import getUserFromToken from "@/utilities/getUserFromToken ";

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
  color: black;
`;
const ClubInformationSections = styled.div`
  display: flex;
  flex-flow: row;
  grid-gap: 10px 10px;

  max-height: 365px;
  min-width: 1250px;
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
  teamHighlightFixtures;
  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(
          `https://bravo-backend.onrender.com/team/team/manager/${user.userId}`,
        );
        setTeamData(response?.data[0]);
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
    };

    fetchTeamDetails();
  }, []);

  const highlightPlayerInfo = async (playerId) => {
    try {
      const response = await axios.get(
        `https://bravo-backend.onrender.com/player/${playerId}`,
      );
      setPlayerHighlightInfo(response.data);
    } catch (error) {
      console.error("Error fetching player:", error);
    }
  };
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      if (teamData) {
        const response = await axios.get(
          `https://bravo-backend.onrender.com/matches/upcomingteams/${teamData._id}`,
        );

        setMatches(response?.data);
      }
    };
    fetchMatches();
  }, [teamData]);

  return (
    <MainBody>
      <ClubInformationSections>
        <ClubInfomation teamData={teamData} />
        <TeamFixture matches={matches} />
      </ClubInformationSections>

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
