import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks/store';
import { ICompanyValue } from '../../../../entities/Company/lib/types/companyTypes';
import { MosaicWindowContext } from '../../../lib/types/contextTypes';
import * as appAction from '../../../store/appSlice';
import './CloseAdditionalControlsButton.css';

type Props = {
  count: number;
  companyName: ICompanyValue;
};

export const CloseAdditionalControlsButton: React.FC<Props> = (props) => {
  const { count, companyName } = props;
  const context = React.useContext(MosaicWindowContext);
  const dispatch = useAppDispatch();
  const { companiesList } = useAppSelector((state) => state.appReducer);

  function handleOnClick(id: ICompanyValue, name: ICompanyValue, ticker: ICompanyValue) {
    context.mosaicWindowActions.setAdditionalControlsOpen(false);
    dispatch(appAction.setSelectedWindow({ count, id, name, ticker }));
  }

  return (
    <div className={classNames(Classes.BUTTON_GROUP, Classes.MINIMAL, 'w-full h-25')}>
      <ul className="companies-list overflow-auto h-full w-full">
        {companiesList.map(({ id, name, ticker }) => {
          if (name === companyName) {
            return;
          }

          return (
            <li key={id}>
              <button onClick={() => handleOnClick(id, name, ticker)} className={Classes.BUTTON}>
                {ticker}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
