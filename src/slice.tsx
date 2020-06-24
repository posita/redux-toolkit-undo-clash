// -*- encoding: utf-8 -*-

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Draft } from "immer";
import undoable, { StateWithHistory } from "redux-undo"

export interface SliceState {
  next_id: number;
}

export type UndoableSliceState = StateWithHistory<SliceState>

const INITIAL_STATE: SliceState = {
  next_id: 1,
}

interface IIncrementNextIdPayload { by?: number }

export const slice = createSlice({
  name: "slice",
  initialState: INITIAL_STATE,
  reducers: {
    incrementNextId: {
      reducer: (
        state: Draft<SliceState>,
        action: PayloadAction<IIncrementNextIdPayload>,
      ) => {
        if (typeof action.payload.by === "undefined") {
          ++state.next_id
        } else {
          state.next_id += action.payload.by
        }
      },
      prepare: (payload: IIncrementNextIdPayload) => {
        return { payload }
      },
    },
  },
})

export const {
  incrementNextId,
} = slice.actions

export const slice_reducer = slice.reducer
export const undoable_slice_reducer = undoable(slice_reducer)
export default undoable_slice_reducer
