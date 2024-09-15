import React from 'react';

import { MosaicKey, MosaicNode, MosaicPath, MosaicUpdate } from './types';

export interface MosaicContext<T extends MosaicKey> {
  mosaicActions: MosaicRootActions<T>;
  mosaicId: string;
  blueprintNamespace: string;
}

export interface MosaicWindowContext {
  blueprintNamespace: string;
  mosaicWindowActions: MosaicWindowActions;
}

export interface MosaicRootActions<T extends MosaicKey> {
  /**
   * Increases the size of this node and bubbles up the tree
   * @param path Path to node to expand
   * @param percentage Every node in the path up to root will be expanded to this percentage
   */
  expand: (path: MosaicPath, percentage?: number) => void;
  /**
   * Remove the node at `path`
   * @param path
   */
  remove: (path: MosaicPath) => void;
  /**
   * Hide the node at `path` but keep it in the DOM. Used in Drag and Drop
   * @param path
   */
  hide: (path: MosaicPath) => void;
  /**
   * Replace currentNode at `path` with `node`
   * @param path
   * @param node
   */
  replaceWith: (path: MosaicPath, node: MosaicNode<T>) => void;
  /**
   * Atomically applies all updates to the current tree
   * @param updates
   * @param suppressOnRelease (default: false)
   */
  updateTree: (updates: MosaicUpdate<T>[], suppressOnRelease?: boolean) => void;
  getRoot: () => MosaicNode<T> | null;
}

export interface MosaicWindowActions {
  split: (...args: any[]) => Promise<void>;
  replaceWithNew: (...args: any[]) => Promise<void>;
  setAdditionalControlsOpen: (open: boolean | 'toggle') => void;
  getPath: () => MosaicPath;
  connectDragSource: (connectedElements: React.ReactElement<any>) => React.ReactElement | null;
}

export const MosaicContext = React.createContext<MosaicContext<MosaicKey>>(undefined!);
export const MosaicWindowContext = React.createContext<MosaicWindowContext>(undefined!);
