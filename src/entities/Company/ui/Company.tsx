import React, { memo } from 'react';
import { companyApi } from '../api/companyApi';
import { ICompanyValue } from '../lib/types/companyTypes';
import { MyCompanyOption } from '../../../shared/ui/MyCompanyOption';
import { MyLoader } from '../../../shared/ui/MyLoader';

interface Props {
  companyId: ICompanyValue;
}

export const Company: React.FC<Props> = memo(({ companyId }) => {
  const { data, error, isLoading } = companyApi.useGetCompanyByIdQuery(companyId);

  return (
    <article className="Company w-full h-full flex flex-col gap-2">
      {isLoading && <MyLoader />}
      {error && <h2>Upps... Something went wrong...</h2>}

      {!isLoading && !error && data && (
        <div className="flex flex-col gap-2">
          {Object.entries(data).map(([key, value]) => (
            <MyCompanyOption key={key} optionKey={key} value={value} />
          ))}
        </div>
      )}
    </article>
  );
});
