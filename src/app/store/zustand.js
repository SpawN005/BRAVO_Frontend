import { create } from "zustand";

export const useTournamentStore = create((set) => ({
  tournamentWinner: {
    name: null,
  },
  tournament: {
    name: "",
    startDate: null,
    endDate: null,
    location: "",
    logo: "",
    rules: {
      type: "",
      nbTeams: 0,
      nbPlayerPerTeam: 0,
      teamsPerPool: 2,
      pointsPerWin: 0,
      pointsPerDraw: 0,
      pointsPerLoss: 0,
      tieBreakingRules: [],
    },
    groups: [],
    sponsors: [],
    teams: [],
    matches: [],
  },
  updateTournament: (updatedFields) =>
    set((state) => ({
      tournament: {
        ...state.tournament,
        ...updatedFields,
        rules: {
          ...state?.tournament?.rules,
          ...updatedFields.rules,
        },
      },
    })),
  resetTournament: () =>
    set({
      tournament: null,
    }),
  setWinner: (name) =>
    set(() => ({
      tournamentWinner: {
        name: name !== null ? name : null,
      },
    })),
}));
