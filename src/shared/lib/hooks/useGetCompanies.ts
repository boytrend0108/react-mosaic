import { useEffect } from 'react';
import { companyApi } from '../../../entities/Company';
import { useAppDispatch } from './store';
import * as companyAction from '../../../shared/store/appSlice';

export function useCompaniesData() {
  const { data } = companyApi.useGetAllCompaniesQuery('');
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const { id, name, ticker } = data[i];
        dispatch(companyAction.setSelectedWindow({ count: i + 1, id, name, ticker }));
        dispatch(companyAction.setCompaniesList({ id, name, ticker }));
      }
    }
  }, [data]);
}
