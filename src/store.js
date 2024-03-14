// store.js
import create from 'zustand';

const useStore = create(set => ({
  user: {},
  permissionLevel: null,
  setUser: userData => set(state => ({ ...state, user: userData })),
  setPermissionLevel: level => set({ permissionLevel: level }),
}));

export default useStore;