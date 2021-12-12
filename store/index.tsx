import create from "zustand";

type Store = {
  status: boolean;
  setStatus: () => void;
  color: string;
  setColor: (color: string) => void;
};

const useStore = create<Store>(
  (set): Store => ({
    status: false,
    color: "blue",
    setStatus: () =>
      set((state) => ({
        ...state,
        status: !state.status,
      })),
    setColor: (color: string) =>
      set((state) => ({
        ...state,
        color,
      })),
  })
);

export default useStore;
