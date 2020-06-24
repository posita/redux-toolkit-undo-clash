// -*- encoding: utf-8 -*-

import { AnyAction } from "@reduxjs/toolkit"
import * as slice from "./slice"

describe("slice reducer", () => {
  describe("plain increment", () => {
    it("should return the initial state", () => {
      var state = slice.slice_reducer(undefined, {} as AnyAction)
      const expected_state = { next_id: 1 }
      expect(state).toEqual(expected_state)
    })

    it("should increment next_id", () => {
      var state = slice.slice_reducer(undefined, slice.incrementNextId({}))
      expect(state.next_id).toEqual(2)
    })

    it("should increment next_id by a given amount", () => {
      var state = slice.slice_reducer(undefined, slice.incrementNextId({ by: -3 }))
      expect(state.next_id).toEqual(-2)
    })
  })

  describe("undoable increment", () => {
    it("should return the initial state", () => {
      var state = slice.undoable_slice_reducer(undefined, {} as AnyAction)
      // const no_op = {} as AnyAction; state = slice.undoable_slice_reducer(state, no_op)  // uncomment this and try again ...
      const expected_state = { next_id: 1 }
      expect(state.present).toEqual(expected_state)
    })

    it("should increment next_id", () => {
      var state = slice.undoable_slice_reducer(undefined, slice.incrementNextId({}))
      // state = slice.undoable_slice_reducer(state, slice.incrementNextId({}))  // ... or uncomment this and try again
      expect(state.present.next_id).toEqual(2)
    })

    it("should increment next_id by a given amount", () => {
      var state = slice.undoable_slice_reducer(undefined, slice.incrementNextId({ by: -3 }))
      // state = slice.undoable_slice_reducer(state, slice.incrementNextId({ by: -3 }))  // ... or uncomment this and try again
      expect(state.present.next_id).toEqual(-2)
    })
  })
})
