import create from "zustand";

type Store = {
  status: boolean;
  setStatus: () => void;
};

const useStore = create<Store>(
  (set): Store => ({
    status: false,
    setStatus: () =>
      set((state) => ({
        ...state,
        status: !state.status,
      })),
  })
);

export default useStore;
