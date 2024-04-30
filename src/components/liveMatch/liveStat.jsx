"use client"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import io from 'socket.io-client';

export default function LiveStat({ matchId }) {
    const [game, setGame] = useState(null);
    const [scoreTeam1, setScoreTeam1] = useState(0);
    const [scoreTeam2, setScoreTeam2] = useState(0);
    const [goalNames, setGoalNames] = useState([]);
    const [yellowCardNames, setYellowCardNames] = useState([]);
    const [redCardNames, setRedCardNames] = useState([]);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (!matchId) return;
    
        const fetchGame = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/matches/${matchId}`);

                setGame(response.data);
                setScoreTeam1(response.data.team1.stats.score)
                setScoreTeam2(response.data.team2.stats.score)
    
            } catch (error) {
                console.error('Error fetching game details:', error);
            }
        };
    
        fetchGame();
    }, [matchId]);

    useEffect(() => {
        if (!game) return;

        const socket = io('http://localhost:3001');
    
        socket.on('updateMatchStats', (updatedStats) => {
            if (updatedStats.team === game.team1._id) {
                setScoreTeam1(updatedStats.score);
            } else if (updatedStats.team === game.team2._id) {
                setScoreTeam2(updatedStats.score);
            }
            // Mise à jour de goalNames si un joueur marque un but
            if (updatedStats.scorers.length > 0) {
                setGoalNames(prevGoalNames => [...prevGoalNames, { type: 'goal', player: updatedStats.scorers[0].firstName, date: Date.now() }]);
            }
        });
        
        socket.on("updateMatchCard", (updatedCard) => {
            // Vérifiez si la mise à jour concerne les cartons jaunes
            if (updatedCard) {
                // Ajouter le nom du joueur à la liste des cartons jaunes
                setYellowCardNames(prevYellowCardNames => [...prevYellowCardNames, { type: 'yellowCard', player: updatedCard, date: Date.now() }]);
            }
        });
        socket.on("updateMatchCardred", (updatedCardred) => {
            // Vérifiez si la mise à jour concerne les cartons red
            if (updatedCardred) {
                // Ajouter le nom du joueur à la liste des cartons red
                setRedCardNames(prevRedCardNames => [...prevRedCardNames, { type: 'redCard', player: updatedCardred, date: Date.now() }]);
            }
        });
        
        return () => {
            socket.disconnect();
        };
    }, [game]);

    useEffect(() => {
        const mergedEvents = [...goalNames, ...yellowCardNames, ...redCardNames];
        // Trier les événements par ordre chronologique
        mergedEvents.sort((a, b) => a.date - b.date);
        // Mettre à jour les événements
        setEvents(mergedEvents);
    }, [goalNames, yellowCardNames, redCardNames]);

    if (!game) {
        return <div>Loading...</div>; 
    } 
    return (
        <div className="pb-10 bg-white">
            {/* Afficher les informations sur le match */}
            <div  className="bg-white text-black py-2">
                <div align="center">
                    {game.stage}
                </div>
                <div className="w-full flex ">
                    <div className="w-[35%]" align="center">
                        <img src={game.team1.logo} width={70} />
                    </div>
                    <div className="w-[32%] text-right text-black mt-6 ">{game.team1.name}</div>
                    <div className="w-[16%] text-center mt-6 ">
                        {scoreTeam1} : {scoreTeam2}
                    </div>
                    <div className="w-[32%] text-left  text-black mt-6">
                        {game.team2.name}
                    </div>
                    <div className="w-[35%]" align="center">
                        <img src={game.team2.logo} width={70} />
                    </div>
                </div>
                <div className="text-center text-red-700">Live</div>
            </div>

            {/* Afficher les événements du match */}
            <div align="center" className="grid grid-cols-1 divide-y">
                <h1 className=" bg-gray-700 p-1 text-gray-300 text-xl">Events</h1>
                {events.map((event, index) => (
                    <div className="p-5" key={index}>
                        {event.type === 'goal' && <img src="/images/1.png" width={20} />}
                        {event.type === 'yellowCard' && <img src="/images/yellowcard.png" width={20} />}
                        {event.type === 'redCard' && <img src="/images/red.png" width={20} />}

                        <span>{event.player}</span>
                    </div>
                ))}
            </div>
          
            {/* Afficher les détails du match */}
            <div align="center" className="grid grid-cols-1 divide-y">
                <h1 className=" bg-gray-700 p-1 text-gray-300 text-xl">Match Details</h1>
                <div className="p-2">Stadium - {game.stadium}</div>
                <div className="p-2">Referee - {game.referee}</div>
                <div className="p-2">{game.stage}</div>
            </div>
        </div>
    );
}
