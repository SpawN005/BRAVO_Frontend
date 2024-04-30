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
    // Exit early if there is no destination
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    // If the source and destination are the same (group and index), do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Make a copy of tournamentData
    const updatedTournamentData = { ...tournamentData };

    // Find the indices of the source and destination groups
    const sourceGroupIndex = updatedTournamentData.groups.findIndex(
      (group) => group._id === source.droppableId,
    );
    const destinationGroupIndex = updatedTournamentData.groups.findIndex(
      (group) => group._id === destination.droppableId,
    );

    // Ensure the source and destination groups exist
    if (sourceGroupIndex === -1 || destinationGroupIndex === -1) {
      console.error("Source or destination group not found");
      return;
    }

    // Retrieve the source and destination groups
    const sourceGroup = updatedTournamentData.groups[sourceGroupIndex];
    const destinationGroup =
      updatedTournamentData.groups[destinationGroupIndex];

    // Ensure the source and destination indices are within bounds
    if (
      source.index < 0 ||
      source.index >= sourceGroup.teams.length ||
      destination.index < 0 ||
      destination.index >= destinationGroup.teams.length
    ) {
      console.error("Invalid source or destination index");
      return;
    }

    // Retrieve the specific teams from the source and destination groups
    const sourceTeam = sourceGroup.teams[source.index];
    const destinationTeam = destinationGroup.teams[destination.index];

    // Perform the swap of the specific teams
    sourceGroup.teams[source.index] = destinationTeam;
    destinationGroup.teams[destination.index] = sourceTeam;

    // Update the state with the modified tournament data
    setTournamentData(updatedTournamentData);

    // Check if groups are even after the swap
    checkGroupsEven();
  };

  const handleClick = () => {
    patchTournament(tournamentData);
    setIsSubmitted(true);
    router.push(`/tournament/details`);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-4 ">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex w-1/2 flex-col content-center items-center justify-center gap-4  self-center">
          {tournamentData?.groups.map((group, idx) => (
            <Droppable key={group._id} droppableId={group._id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="relative mb-4 w-full rounded-md bg-blue-600 p-4"
                >
                  <h2 className="mb-2 text-center text-lg font-semibold text-white">
                    Match {idx + 1}
                  </h2>
                  <div className="flex flex-row justify-around">
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
                            className="mb-2 rounded-md bg-green-400 p-2 text-white "
                          >
                            {team.name}
                          </div>
                        )}
                      </Draggable>
                    ))}{" "}
                  </div>{" "}
                  <h2 className="absolute bottom-7 left--10 right-100 text-center text-lg font-bold text-white ">
                    VS
                  </h2>
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
