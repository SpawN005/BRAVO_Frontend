"use client";
import React, { useEffect, useState } from "react";
import { Droppable, Draggable, DragDropContext } from "@hello-pangea/dnd";
import tournamentsService from "@/services/tournament/tournamentsService";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [isGroupsEven, setIsGroupsEven] = useState(true);

  const [tournamentData, setTournamentData] = useState();
  const router = useRouter();
  const patchTournament = async (updatedData) => {
    try {
      console.log(updatedData);
      const updatedTournament = await tournamentsService.patchTournamentById(
        tournamentData._id,
        updatedData,
      );
    } catch (error) {
      console.error("Error patching tournament:", error);
    }
  };
  const getTournament = async () => {
    try {
      const tournament = await tournamentsService.getTournamentById(
        localStorage.getItem("Mytournament"),
      );
      setTournamentData(tournament);
    } catch (error) {
      console.error("Error patching tournament:", error);
    }
  };
  useEffect(() => {
    getTournament();
  }, []);
  const checkGroupsEven = () => {
    if (!tournamentData) return;
    // Get the number of teams in each group
    const groupSizes = tournamentData.groups.map((group) => group.teams.length);
    // Check if all group sizes are equal
    const areGroupsEven = groupSizes.every((size) => size === groupSizes[0]);
    // Update state
    setIsGroupsEven(areGroupsEven);
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
    checkGroupsEven();
    // Assuming you need to submit after each drag and drop
  };
  console.log(tournamentData);
  const handleClick = () => {
    patchTournament(tournamentData);
    setIsSubmitted(true);
    router.push(`/tournament/details`);
  };

  return (
    <div className=" flex h-screen w-screen flex-col items-start justify-center	 bg-[url('https://images.unsplash.com/photo-1517747614396-d21a78b850e8?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover	 bg-bottom bg-no-repeat 	 p-4 backdrop-blur">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid w-full grid-cols-4 content-center items-center gap-4 ">
          {tournamentData?.groups.map((group) => (
            <Droppable key={group._id} droppableId={group._id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="mb-4 rounded-md border-2 border-green-500  bg-transparent p-4"
                >
                  <h2 className="mb-2 text-lg font-semibold text-white">
                    {group.name}
                  </h2>
                  {group.teams.map((team, index) => (
                    <Draggable
                      key={team._id}
                      draggableId={team._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2 rounded-md bg-green-400 p-2 text-white"
                        >
                          {team.name}
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
      {isSubmitted && isGroupsEven && (
        <button
          type="button"
          onClick={handleClick}
          className="mt-2 h-12 w-20 rounded-md bg-green-500 font-semibold text-white"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Page;
