import React, { memo } from 'react';
import { companyApi } from '../api/companyApi';
import { ICompanyValue } from '../types/companyTypes';

interface Props {
  companyId: ICompanyValue;
}

export const Company: React.FC<Props> = memo(({ companyId }) => {
  const { data, error, isLoading } = companyApi.useGetCompanyByIdQuery(companyId || '');

  return (
    <article>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>Error</h2>}
      <div>
        <p className="text-7xl text-blue-800">ticker</p>
        <p>{data?.name}</p>
      </div>
    </article>
  );
});
