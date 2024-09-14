import cn from 'classnames';
import React from 'react';
import { ICompanyValue } from '../../entities/Company/types/companyTypes';

interface Props {
  className?: string;
  optionKey: string;
  value?: ICompanyValue;
}

export const MyCompanyOption: React.FC<Props> = (props) => {
  const { optionKey, value = '...', className, ...otherProps } = props;

  const preparadKey = optionKey.replace('_', ' ');

  return (
    <div className={cn(className)} {...otherProps}>
      <p className="font-bold capitalize">
        {`${preparadKey}:`} <span className="font-normal">{value}</span>
      </p>
    </div>
  );
};
