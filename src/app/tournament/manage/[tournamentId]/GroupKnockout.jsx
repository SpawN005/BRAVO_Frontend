"use client";
import React, { useState } from "react";
import { Droppable, Draggable, DragDropContext } from "@hello-pangea/dnd";
import tournamentsService from "@/services/tournament/tournamentsService";

const GroupKnockout = ({ tournamentData, onTournamentDataChange }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  console.log(tournamentData);
  const patchTournament = async (updatedData) => {
    try {
      console.log(updatedData);
      // Assuming tournamentId is available in tournamentData
      const updatedTournament = await tournamentsService.patchTournamentById(
        tournamentData._id,
        updatedData,
      );
    } catch (error) {
      console.error("Error patching tournament:", error);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTournamentData = { ...tournamentData };
    const sourceGroupIndex = updatedTournamentData.groups.findIndex(
      (group) => group._id === source.droppableId,
    );
    const destinationGroupIndex = updatedTournamentData.groups.findIndex(
      (group) => group._id === destination.droppableId,
    );
    const movedTeam = updatedTournamentData.groups[
      sourceGroupIndex
    ].teams.splice(source.index, 1)[0];
    updatedTournamentData.groups[destinationGroupIndex].teams.splice(
      destination.index,
      0,
      movedTeam,
    );

    setTournamentData(updatedTournamentData);
    // Assuming you need to submit after each drag and drop
  };

  const handleClick = () => {
    patchTournament(tournamentData);
    setIsSubmitted(true);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 justify-between gap-4">
          {tournamentData.groups.map((group) => (
            <Droppable key={group._id} droppableId={group._id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="mb-4 rounded-md bg-blue-600 p-4"
                >
                  <h2 className="mb-2 text-lg font-semibold text-white">
                    {group.name}
                  </h2>
                  {group.teams.map((team, index) => (
                    <Draggable key={team} draggableId={team} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2 rounded-md bg-green-400 p-2 text-white"
                        >
                          {team}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <button
        type="button"
        onClick={handleClick}
        className="mt-2 h-12 w-20 rounded-md bg-green-500 font-semibold text-white"
      >
        Submit
      </button>
    </>
  );
};

export default GroupKnockout;
