import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const FixturesTable = styled.div`
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  max-height: 325px;
  min-height: 325px;
  overflow-x: hidden;
  width: 110%;

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

const FixturesTableHeader = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #b2b2b2;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  font-weight: 700;
  grid-area: header;
  padding: 5px;
  width: 110%;
  padding-top: 10px;
`;

const FixtureContainer = styled.div`
  background-color: #fff;
  border: 1px solid #f1f3f4;
  display: grid;
  grid-template-areas: "teamOne date teamTwo";
  justify-content: space-around;
  min-height: 150px;
  padding: 5px;
  width: 50%;
`;

const TeamOne = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  flex-flow: column;
  font-size: 14px;
  font-weight: 500;
  grid-area: teamOne;
  line-height: 1.2rem;
  max-width: 100px;
  text-align: center;
`;

const TeamTwo = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  flex-flow: column;
  font-size: 14px;
  font-weight: 500;
  grid-area: teamTwo;
  line-height: 1.2rem;
  max-width: 100px;
  text-align: center;
`;

const GameInfoContainer = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  flex-flow: column;
  font-weight: 700;
  grid-area: date
  justify-content: center;
  min-width: 100px;
`;

const GameInfo = styled.span`
  font-size: 13px;
  font-weight: 400;
`;

const Club = styled.div`
  display: inline-block;
  grid-area: club;
  height: 20px;
  padding-left: 10px;
`;

const parseDate = (date) => new Date(date).toDateString();
const parseTime = (date) =>
  new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

const TeamFixtures = ({ matches }) => (
  <section>
    {matches && matches.length ? (
      <FixturesTable>
        {matches &&
          matches.map(
            (
              fixture, // Ajout de la vérification de nullité
            ) => (
              <FixtureContainer key={fixture._id}>
                <TeamOne>
                  <img
                    src={fixture.team1.logo}
                    alt={fixture.team1.name}
                    width="60"
                  />
                  {fixture.team1.name}
                </TeamOne>
                <GameInfoContainer>
                  <GameInfo>
                    {fixture.date ? parseTime(fixture.date) : ""}
                  </GameInfo>
                  <GameInfo>
                    {fixture.date ? parseDate(fixture.date) : "TBA"}
                  </GameInfo>
                  <GameInfo>{fixture.stage}</GameInfo>
                </GameInfoContainer>
                <TeamTwo>
                  <img
                    src={fixture.team2.logo}
                    alt={fixture.team2.name}
                    width="60"
                  />
                  {fixture.team2.name}
                </TeamTwo>
              </FixtureContainer>
            ),
          )}
      </FixturesTable> // Ajout de la vérification de nullité
    ) : (
      <FixturesTableHeader>
        <Club>Upcoming Fixtures</Club>
      </FixturesTableHeader>
    )}
  </section>
);

TeamFixtures.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TeamFixtures;
