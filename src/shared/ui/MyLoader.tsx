import cn from 'classnames';
import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { COLORS } from '../lib/types/mainTypes';

interface Props {
  className?: string;
}

export const MyLoader: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, 'flex items-center justify-center h-full')}>
      <RotatingLines
        visible={true}
        width="96"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        strokeColor={COLORS.PRIMARY}
      />
    </div>
  );
};
