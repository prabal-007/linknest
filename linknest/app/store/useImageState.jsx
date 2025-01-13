import { create } from 'zustand';

export const useImageState = create((set) => ({
    sharedState: "/profile.png",
    setSharedState: (value) => set({ sharedState: value}),
}));
