import { Classes, HTMLSelect } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import classNames from 'classnames';
import dropRight from 'lodash/dropRight';
import React, { useEffect, useState } from 'react';

import {
  Corner,
  createBalancedTreeFromLeaves,
  getLeaves,
  getNodeAtPath,
  getOtherDirection,
  getPathToCorner,
  Mosaic,
  MosaicBranch,
  MosaicDirection,
  MosaicNode,
  MosaicParent,
  MosaicWindow,
  MosaicZeroState,
  updateTree,
} from '../../';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../styles/index.less';
import { CloseAdditionalControlsButton } from '../../components/CloseAdditionalControlsButton';
import { THEMES } from '../../shared/consts';
import { Company, companyApi } from '../../entities/Company';
import { initialMosaicConfig } from '../configs/initialMosaicConfig';
import { ICompany, ICompanyValue } from '../../entities/Company/types/companyTypes';

const gitHubLogo = require('../../shared/assets/GitHub-Mark-Light-32px.png');

export type Theme = keyof typeof THEMES;
type CompanyData = Pick<ICompany, 'id' | 'name'>;

const additionalControls = React.Children.toArray([<CloseAdditionalControlsButton />]);

export const App: React.FC = () => {
  const [currentNode, setCurrentNode] = useState<MosaicNode<number> | null>(initialMosaicConfig);
  const [currentTheme, setCurrentTheme] = useState<Theme>('Blueprint');
  const totalWindowCount = getLeaves(currentNode || null).length;
  const [companiesData, setCompaniesData] = useState<CompanyData[]>([]);
  const { data } = companyApi.useGetAllCompaniesQuery('');

  useEffect(() => {
    if (data) {
      setCompaniesData(data.map((el) => ({ id: el.id, name: el.name })));
    }
  }, [data]);

  const onChange = (newCurrentNode: MosaicNode<number> | null) => {
    setCurrentNode(newCurrentNode);
  };

  const onRelease = (newCurrentNode: MosaicNode<number> | null) => {
    console.log('Mosaic.onRelease():', newCurrentNode);
  };

  const autoArrange = () => {
    const leaves = getLeaves(currentNode || null);
    setCurrentNode(createBalancedTreeFromLeaves(leaves));
  };

  const addToTopRight = () => {
    let newCurrentNode = currentNode;
    const totalWindowCount = getLeaves(newCurrentNode || null).length;
    if (newCurrentNode) {
      const path = getPathToCorner(newCurrentNode, Corner.TOP_RIGHT);
      const parent = getNodeAtPath(newCurrentNode, dropRight(path)) as MosaicParent<number>;
      const destination = getNodeAtPath(newCurrentNode, path) as MosaicNode<number>;
      const direction: MosaicDirection = parent ? getOtherDirection(parent.direction) : 'row';

      let first: MosaicNode<number>;
      let second: MosaicNode<number>;
      if (direction === 'row') {
        first = destination;
        second = totalWindowCount + 1;
      } else {
        first = totalWindowCount + 1;
        second = destination;
      }

      newCurrentNode = updateTree(newCurrentNode, [
        {
          path,
          spec: {
            $set: {
              direction,
              first,
              second,
            },
          },
        },
      ]);
    } else {
      newCurrentNode = totalWindowCount + 1;
    }

    setCurrentNode(newCurrentNode);
  };

  const renderNavBar = () => {
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
          <button className={classNames(Classes.BUTTON, Classes.iconClass(IconNames.GRID_VIEW))} onClick={autoArrange}>
            Auto Arrange
          </button>
          <button
            className={classNames(Classes.BUTTON, Classes.iconClass(IconNames.ARROW_TOP_RIGHT))}
            onClick={addToTopRight}
          >
            Add Window to Top Right
          </button>
          <a className="github-link" href="https://github.com/nomcopter/react-mosaic">
            <img src={gitHubLogo} />
          </a>
        </div>
      </div>
    );
  };

  return (
    <React.StrictMode>
      <div className="react-mosaic-example-app">
        {renderNavBar()}
        <Mosaic<number>
          renderTile={(count, path) => {
            return (
              <ExampleWindow
                count={count}
                path={path}
                totalWindowCount={totalWindowCount}
                companyId={companiesData[count]?.id}
              />
            );
          }}
          zeroStateView={<MosaicZeroState createNode={() => totalWindowCount + 1} />}
          value={currentNode}
          onChange={onChange}
          onRelease={onRelease}
          className={THEMES[currentTheme]}
          blueprintNamespace="bp4"
        />
      </div>
    </React.StrictMode>
  );
};

interface ExampleWindowProps {
  count: number;
  path: MosaicBranch[];
  totalWindowCount: number;
  companyId: ICompanyValue;
}

const ExampleWindow = ({ count, path, totalWindowCount, companyId }: ExampleWindowProps) => {
  return (
    <MosaicWindow<number>
      additionalControls={additionalControls}
      title={`Window ${count}`}
      createNode={() => totalWindowCount + 1}
      path={path}
      onDragStart={() => console.log('MosaicWindow.onDragStart')}
      onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
    >
      <div className="example-window overflow-auto">
        <Company companyId={companyId} />
      </div>
    </MosaicWindow>
  );
};
