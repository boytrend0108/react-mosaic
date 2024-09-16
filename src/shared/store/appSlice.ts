import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICompanyValue } from '../../entities/Company/lib/types/companyTypes'

interface CompanyListItem {
  id: ICompanyValue;
  name: ICompanyValue;
  ticker: ICompanyValue;
}

export interface SelectedWindow extends CompanyListItem {
  count: number,
}

export interface AppState {
  selectedWindows: Record<number, SelectedWindow>;
  companiesList: CompanyListItem[]
}

const initialState: AppState = {
  selectedWindows: {},
  companiesList: [],
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedWindow: (state, action: PayloadAction<SelectedWindow>) => {
      state.selectedWindows[action.payload.count] = action.payload;
    },

    setCompaniesList: (state, action: PayloadAction<CompanyListItem>) => {
      state.companiesList.push(action.payload);
    },
  },
})

export const { setSelectedWindow, setCompaniesList } = appSlice.actions

export default appSlice.reducer