import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICompany, ICompanyValue } from '../types/companyTypes'

export const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getCompanyById: builder.query<ICompany, ICompanyValue>({
      query: (id) => `company/${id}`,
    }),

    getAllCompanies: builder.query<ICompany[], string>({
      query: () => `/company`,
    }),
  }),
})
