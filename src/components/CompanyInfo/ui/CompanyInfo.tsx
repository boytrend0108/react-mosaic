import React from 'react';
import { companyApi } from '../api/companyApi';

interface Props {
  companyId?: string;
}

export const CompanyInfo: React.FC<Props> = ({ companyId }) => {
  if (!companyId) {
    return <p>Please select a company</p>;
  }

  const { data, error, isLoading } = companyApi.useGetCompanyByIdQuery(companyId);

  return (
    <article className="">
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>Error</h2>}

      <p>{data?.ceo}</p>
    </article>
  );
};
