import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICompany, ICompanyValue } from '../lib/types/companyTypes';
import { BASE_URL } from '../../../../secret/secret'

export const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCompanyById: builder.query<ICompany, ICompanyValue>({
      query: (id) => `company/${id}`,
    }),

    getAllCompanies: builder.query<ICompany[], string>({
      query: () => `/company`,
    }),
  }),
})
