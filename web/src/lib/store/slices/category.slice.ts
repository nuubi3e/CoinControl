import { CategoryState } from '@/lib/types/redux.slices.types'
import { createSlice } from '@reduxjs/toolkit'

const init: CategoryState = {
  categories: [],
}
const categorySlice = createSlice({
  initialState: init,
  name: 'categories',
  reducers: {},
})

export const categoryAction = categorySlice.actions
export const categoryReducers = categorySlice.reducer
