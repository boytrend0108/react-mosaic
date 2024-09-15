import React from 'react';
import classNames from 'classnames';
import { Classes, HTMLSelect } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { addToTopRight, autoArrange } from '../../../app/lib/helpers/appFuntions';
import { THEMES } from '../../../shared/lib/consts/consts';
import { MosaicNode } from '../../../shared/lib/types/types';
import { Theme } from '../../../shared/lib/types/themeTypes';

type CurrentNodeType = MosaicNode<number> | null;
type Props = {
  currentNode: CurrentNodeType;
  setCurrentNode: (v: CurrentNodeType) => void;
  currentTheme: Theme;
  setCurrentTheme: (v: Theme) => void;
};

export const Navbar: React.FC<Props> = (props) => {
  const { currentNode, setCurrentNode, currentTheme, setCurrentTheme } = props;

  return (
    <div className={classNames(Classes.NAVBAR, Classes.DARK)}>
      <div className={Classes.NAVBAR_GROUP}>
        <div className={Classes.NAVBAR_HEADING}>
          <a href="/">react-mosaic</a>
        </div>
      </div>

      <div className={classNames(Classes.NAVBAR_GROUP, Classes.BUTTON_GROUP)}>
        <label className={classNames('theme-selection', Classes.LABEL, Classes.INLINE)}>
          Theme:
          <HTMLSelect value={currentTheme} onChange={(e) => setCurrentTheme(e.currentTarget.value as Theme)}>
            {React.Children.toArray(Object.keys(THEMES).map((label) => <option>{label}</option>))}
          </HTMLSelect>
        </label>

        <div className="navbar-separator" />

        <span className="actions-label">Example Actions:</span>

        <button
          className={classNames(Classes.BUTTON, Classes.iconClass(IconNames.GRID_VIEW))}
          onClick={() => autoArrange(currentNode, setCurrentNode)}
        >
          Auto Arrange
        </button>

        <button
          className={classNames(Classes.BUTTON, Classes.iconClass(IconNames.ARROW_TOP_RIGHT))}
          onClick={() => addToTopRight(currentNode, setCurrentNode)}
        >
          Add Window to Top Right
        </button>

        <a className="github-link" href="https://github.com/nomcopter/react-mosaic">
          <img src="GitHub.png" />
        </a>
      </div>
    </div>
  );
};
