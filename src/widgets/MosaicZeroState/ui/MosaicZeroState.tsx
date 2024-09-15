import classNames from 'classnames';
import noop from 'lodash/noop';
import React from 'react';
import { MosaicContext } from '../../../shared/lib/types/contextTypes';
import { CreateNode, MosaicKey } from '../../../shared/lib/types/types';
import { OptionalBlueprint } from '../../../shared/lib/utils/OptionalBlueprint';

export interface MosaicZeroStateProps<T extends MosaicKey> {
  createNode?: CreateNode<T>;
}

export class MosaicZeroState<T extends MosaicKey> extends React.PureComponent<MosaicZeroStateProps<T>> {
  static contextType = MosaicContext;
  context!: MosaicContext<T>;

  render() {
    return (
      <div
        className={classNames(
          'mosaic-zero-state',
          OptionalBlueprint.getClasses(this.context.blueprintNamespace, 'NON_IDEAL_STATE'),
        )}
      >
        <div className={OptionalBlueprint.getClasses(this.context.blueprintNamespace, 'NON_IDEAL_STATE_VISUAL')}>
          <OptionalBlueprint.Icon className="default-zero-state-icon" size="large" icon="APPLICATIONS" />
        </div>
        <h4 className={OptionalBlueprint.getClasses(this.context.blueprintNamespace, 'HEADING')}>No Windows Present</h4>
        <div>
          {this.props.createNode && (
            <button
              className={classNames(
                OptionalBlueprint.getClasses(this.context.blueprintNamespace, 'BUTTON'),
                OptionalBlueprint.getIconClass(this.context.blueprintNamespace, 'ADD'),
              )}
              onClick={this.replace}
            >
              Add New Window
            </button>
          )}
        </div>
      </div>
    );
  }

  private replace = () =>
    Promise.resolve(this.props.createNode!())
      .then((node) => this.context.mosaicActions.replaceWith([], node))
      .catch(noop); // Swallow rejections (i.e. on user cancel)
}
