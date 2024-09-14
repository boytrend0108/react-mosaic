import React, { memo } from 'react';
import { companyApi } from '../api/companyApi';
import { ICompanyValue } from '../types/companyTypes';
import { MyCompanyOption } from '../../../shared/ui/MyCompanyOption';

interface Props {
  companyId: ICompanyValue;
}

export const Company: React.FC<Props> = memo(({ companyId }) => {
  const { data, error, isLoading } = companyApi.useGetCompanyByIdQuery(companyId);
  console.log(data);
  return (
    <article className="Company w-full flex flex-col gap-2">
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>Error</h2>}

      {!isLoading &&
        !error &&
        data &&
        Object.entries(data).map(([key, value]) => <MyCompanyOption key={key} optionKey={key} value={value} />)}
    </article>
  );
});
