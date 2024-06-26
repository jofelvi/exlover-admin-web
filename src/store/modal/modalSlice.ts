import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen?: boolean;
  tittle?: string;
  content?: React.ReactNode;
  accions?: React.ReactNode;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalState>) {
      state.isOpen = true;
      state.tittle = action.payload.tittle;
      state.content = action.payload.content;
      state.accions = action.payload.accions;
    },
    closeModal(state) {
      state.isOpen = false;
      state.tittle = undefined;
      state.content = undefined;
      state.accions = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
