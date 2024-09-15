import React, { useState } from 'react';
import { getLeaves, Mosaic, MosaicNode, MosaicZeroState } from '../../';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../styles/index.less';
import { THEMES } from '../../shared/lib/consts/consts';
import { initialMosaicConfig } from '../configs/initialMosaicConfig';
import { useCompaniesData } from '../../shared/lib/hooks/useGetCompanies';
import { ExampleWindow } from '../../widgets/ExampleWindow';
import { onChange, onRelease } from '../lib/helpers/appFuntions';
import { Navbar } from '../../widgets/Navbar';
import { Theme } from '../../shared/lib/types/themeTypes';

export const App: React.FC = () => {
  const [currentNode, setCurrentNode] = useState<MosaicNode<number> | null>(initialMosaicConfig);
  const [currentTheme, setCurrentTheme] = useState<Theme>('Blueprint');
  const totalWindowCount = getLeaves(currentNode || null).length;
  useCompaniesData();

  return (
    <React.StrictMode>
      <div className="react-mosaic-example-app">
        <Navbar
          currentNode={currentNode}
          setCurrentNode={setCurrentNode}
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
        />

        <Mosaic<number>
          renderTile={(count, path) => {
            return <ExampleWindow count={count} path={path} totalWindowCount={totalWindowCount} />;
          }}
          zeroStateView={<MosaicZeroState createNode={() => totalWindowCount + 1} />}
          value={currentNode}
          onChange={(newCurrentNode) => onChange(newCurrentNode, setCurrentNode)}
          onRelease={onRelease}
          className={THEMES[currentTheme]}
          blueprintNamespace="bp4"
        />
      </div>
    </React.StrictMode>
  );
};
