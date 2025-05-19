import { create } from "zustand";

type ModalView = "products" | "blogs" | "both";

type ModalState = {
  isOpen: boolean;
  view: ModalView | null;
};

type ModalActions = {
  openModal: (view: ModalView) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState & ModalActions>((set) => ({
  isOpen: false,
  view: null,
  blogCategory: null,

  openModal: (view) => set({ isOpen: true, view }),

  closeModal: () => set({ isOpen: false, view: null }),
}));
