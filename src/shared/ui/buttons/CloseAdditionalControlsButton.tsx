import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch } from '../../lib/hooks/store';
import { ICompanyValue } from '../../../entities/Company/lib/types/companyTypes';
import { useCompaniesData } from '../../lib/hooks/useGetCompanies';

import { MosaicWindowContext } from '../../lib/types/contextTypes';
import * as appAction from '../../store/appSlice';

type Props = {
  count: number;
};

export const CloseAdditionalControlsButton: React.FC<Props> = ({ count }) => {
  const context = React.useContext(MosaicWindowContext);
  const { briefCompaniesData } = useCompaniesData();
  const dispatch = useAppDispatch();

  function handleOnClick(id: ICompanyValue, name: ICompanyValue) {
    context.mosaicWindowActions.setAdditionalControlsOpen(false);
    dispatch(appAction.setSelectedWindow({ count, id, name }));
  }

  return (
    <div className={classNames(Classes.BUTTON_GROUP, Classes.MINIMAL)}>
      <ul>
        {briefCompaniesData.map(({ id, name }) => (
          <li key={id}>
            <button onClick={() => handleOnClick(id, name)} className={Classes.BUTTON}>
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
