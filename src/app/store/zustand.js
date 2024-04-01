import { create } from "zustand";

export const useTournamentStore = create((set) => ({
  tournament: {
    name: "",
    startDate: null,
    endDate: null,
    location: "",
    rules: {
      type: "",
      nbTeams: 0,
      nbPlayerPerTeam: 0,
      teamsPerPool: 1,
      pointsPerWin: 0,
      pointsPerDraw: 0,
      pointsPerLoss: 0,
      tieBreakingRules: [],
    },
    groups: [],
    sponsors: [],
    managerEmails: [],
    matches: [],
  },
  updateTournament: (updatedFields) =>
    set((state) => ({
      tournament: {
        ...state.tournament,
        ...updatedFields,
        rules: {
          ...state.tournament.rules,
          ...updatedFields.rules,
        },
      },
    })),
  resetTournament: () =>
    set({
      tournament: null,
    }),
}));