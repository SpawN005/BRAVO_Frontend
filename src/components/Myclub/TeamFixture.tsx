"use client"
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LiaGalacticRepublic } from 'react-icons/lia';

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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 400px;
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
  padding-top: 10px;
`;

const FixtureContainer = styled.div`
  background-color: #fff;
  border: 1px solid #f1f3f4;
  display: grid;
  grid-template-areas:
    "teamOne date teamTwo";
  justify-content: space-around;
  min-height: 150px;
  padding: 5px;
 min-width: 820px;
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
const parseTime = (date) => new Date(date).toLocaleTimeString([],
  { hour: 'numeric', minute: '2-digit', hour12: true });

const TeamFixtures = () => (
  <section>
      <FixturesTableHeader>
        <Club>Upcoming Fixtures</Club>
      </FixturesTableHeader>
    <FixturesTable>
      
        <FixtureContainer >
          <TeamOne>
            <img   width="60" />
         real madrid
          </TeamOne>
          <GameInfoContainer>
            <GameInfo>{parseTime(20)}</GameInfo>
            <GameInfo>{parseDate(2020)}</GameInfo>
            <GameInfo>{LiaGalacticRepublic}</GameInfo>
          </GameInfoContainer>
          <TeamTwo>
            <img width="60" />
            barcelone
          </TeamTwo>
        </FixtureContainer>
        
      
    </FixturesTable>
  </section>
);

TeamFixtures.propTypes = {
  fixtures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TeamFixtures;