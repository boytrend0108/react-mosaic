import React, { memo } from 'react';
import { CloseAdditionalControlsButton } from '../../../shared/ui/buttons/CloseAdditionalControlsButton';
import { MosaicWindow } from '../../MosaicWindow/ui/MosaicWindow';
import { Company } from '../../../entities/Company';
import { ICompanyValue } from '../../../entities/Company/lib/types/companyTypes';
import { useAppSelector } from '../../../shared/lib/hooks/store';
import { MosaicBranch } from '../../../shared/lib/types/types';

type Props = {
  count: number;
  path: MosaicBranch[];
  totalWindowCount: number;
  companyId: ICompanyValue;
  companyName: string;
};
export const ExampleWindow: React.FC<Props> = memo((props) => {
  const { path, totalWindowCount, companyId, companyName, count } = props;
  const additionalControls = React.Children.toArray([<CloseAdditionalControlsButton count={count} />]);
  const { selectedWindow } = useAppSelector((state) => state.appReducer);

  const { selectedId, selectedCompanyName } = setSelectedCompanyId();
  type setSelectedCompanyIdProps = {
    selectedId: ICompanyValue;
    selectedCompanyName: ICompanyValue;
  };
  function setSelectedCompanyId(): setSelectedCompanyIdProps {
    if (!selectedWindow || selectedWindow.count !== count) {
      return { selectedId: companyId, selectedCompanyName: companyName };
    }

    return { selectedId: selectedWindow.id, selectedCompanyName: selectedWindow.name };
  }

  return (
    <MosaicWindow<number>
      additionalControls={additionalControls}
      title={selectedCompanyName as string}
      createNode={() => totalWindowCount + 1}
      path={path}
      onDragStart={() => console.log('MosaicWindow.onDragStart')}
      onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
    >
      <div className="example-window overflow-auto">
        <Company companyId={selectedId} />
      </div>
    </MosaicWindow>
  );
});
