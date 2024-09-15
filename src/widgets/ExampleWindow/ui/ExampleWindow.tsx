import React, { memo } from 'react';
import { CloseAdditionalControlsButton } from '../../../shared/ui/buttons/CloseAdditionalControlsButton/CloseAdditionalControlsButton';
import { MosaicWindow } from '../../MosaicWindow/ui/MosaicWindow';
import { Company } from '../../../entities/Company';
import { useAppSelector } from '../../../shared/lib/hooks/store';
import { MosaicBranch } from '../../../shared/lib/types/types';

type Props = {
  count: number;
  path: MosaicBranch[];
  totalWindowCount: number;
};

export const ExampleWindow: React.FC<Props> = memo((props) => {
  const { path, totalWindowCount, count } = props;
  const { selectedWindows } = useAppSelector((state) => state.appReducer);
  const selectedCompany = selectedWindows[count];
  const additionalControls = React.Children.toArray([
    <CloseAdditionalControlsButton count={count} companyName={selectedCompany?.name} />,
  ]);

  return (
    <MosaicWindow<number>
      additionalControls={additionalControls}
      title={selectedCompany?.name as string}
      createNode={() => totalWindowCount + 1}
      path={path}
      onDragStart={() => console.log('MosaicWindow.onDragStart')}
      onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
    >
      <div className="example-window overflow-auto">
        <Company companyId={selectedCompany?.id} />
      </div>
    </MosaicWindow>
  );
});
