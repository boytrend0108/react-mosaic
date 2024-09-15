import { dropRight } from "lodash";
import { MosaicDirection, MosaicNode, MosaicParent } from "../../../shared/lib/types/types";
import { updateTree } from "../../../shared/lib/utils/mosaicUpdates";
import { Corner, createBalancedTreeFromLeaves, getLeaves, getNodeAtPath, getOtherDirection, getPathToCorner } from "../../../shared/lib/utils/mosaicUtilities";

export const onChange = (newCurrentNode: MosaicNode<number> | null, setCurrentNode: (v: MosaicNode<number> | null) => void) => {
  setCurrentNode(newCurrentNode);
};

export const onRelease = (newCurrentNode: MosaicNode<number> | null) => {
  console.log('Mosaic.onRelease():', newCurrentNode);
};

export const autoArrange = (currentNode: MosaicNode<number> | null, setCurrentNode: (v: MosaicNode<number> | null) => void) => {
  const leaves = getLeaves(currentNode || null);
  setCurrentNode(createBalancedTreeFromLeaves(leaves));
};

export const addToTopRight = (currentNode: MosaicNode<number> | null, setCurrentNode: (v: MosaicNode<number> | null) => void) => {
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



