import classNames from 'classnames';
import React from 'react';

import { MosaicContext, MosaicRootActions, MosaicWindowContext } from '../../lib/types/contextTypes';
import { OptionalBlueprint } from '../../lib/utils/OptionalBlueprint';
import { DefaultToolbarButton, MosaicButtonProps } from './MosaicButton';

export class ExpandButton extends React.PureComponent<MosaicButtonProps> {
  static contextType = MosaicWindowContext;
  context!: MosaicWindowContext;

  render() {
    return (
      <MosaicContext.Consumer>
        {({ mosaicActions }) => (
          <DefaultToolbarButton
            title="Expand"
            className={classNames(
              'expand-button',
              OptionalBlueprint.getIconClass(this.context.blueprintNamespace, 'MAXIMIZE'),
            )}
            onClick={this.createExpand(mosaicActions)}
          />
        )}
      </MosaicContext.Consumer>
    );
  }

  private createExpand(mosaicActions: MosaicRootActions<any>) {
    return () => {
      mosaicActions.expand(this.context.mosaicWindowActions.getPath());

      if (this.props.onClick) {
        this.props.onClick();
      }
    };
  }
}
