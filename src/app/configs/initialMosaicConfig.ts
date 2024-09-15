import { MosaicNode } from "../../shared/lib/types/types";

export const initialMosaicConfig: MosaicNode<number> = {
  direction: 'row',
  first: 1,
  second: {
    direction: 'column',
    first: 2,
    second: 3,
  },
  splitPercentage: 40,
}