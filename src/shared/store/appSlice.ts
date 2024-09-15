import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICompanyValue } from '../../entities/Company/lib/types/companyTypes'

interface SelectedWindow {
  count: number,
  id: ICompanyValue
  name: ICompanyValue;
}

export interface AppState {
  selectedWindow: SelectedWindow | null
}

const initialState: AppState = {
  selectedWindow: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedWindow: (state, action: PayloadAction<SelectedWindow>) => {
      state.selectedWindow = action.payload;
    },
  },
})

export const { setSelectedWindow } = appSlice.actions

export default appSlice.reducer