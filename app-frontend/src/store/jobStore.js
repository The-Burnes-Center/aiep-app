import { create } from 'zustand';

const useJobStore = create((set) => ({
  jobId: null,
  resultData: null,
  setJobId: (id) => set({ userId: id }),
  clearJobId: () => set({ userId: null }),
  setResultData: (obj) => set({resultData: obj}),
  clearResultData: () => set({ resultData: null }),
}));

export default useJobStore;
