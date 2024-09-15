import { useEffect, useState } from 'react';
import { companyApi } from '../../../entities/Company';
import { ICompany } from '../../../entities/Company/lib/types/companyTypes';

type CompanyData = Pick<ICompany, 'id' | 'name'>;

export function useCompaniesData() {
  const [briefCompaniesData, setBriefCompaniesData] = useState<CompanyData[]>([]);
  const { data } = companyApi.useGetAllCompaniesQuery('');

  useEffect(() => {
    if (data) {
      setBriefCompaniesData(data.map((el) => ({ id: el.id, name: el.name })));
    }
  }, [data]);

  return { companiesData: data, briefCompaniesData }
}
