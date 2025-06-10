import { create } from "zustand";

type Steps = "form" | "success" | "error";

interface ConsultationModalStore {
  isOpen: boolean;
  step: Steps;
  open: () => void;
  close: () => void;
  setStep: (step: Steps) => void;
}

export const useConsultationModal = create<ConsultationModalStore>((set) => ({
  isOpen: false,
  step: "form",
  open: () => set({ isOpen: true, step: "form" }),
  close: () => set({ isOpen: false, step: "form" }),
  setStep: (val: Steps) => set({ step: val }),
}));
