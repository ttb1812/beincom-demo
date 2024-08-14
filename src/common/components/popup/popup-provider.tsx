import React, { Component } from 'react';
import PopupManager from './popup-manager';
import { NSPopup } from './types';
import PopupConfirm from './popup-confirm';

export const GlobalPopupID = 'global-popup-id';
export default class PopupProvider extends Component<
  NSPopup.IPopupProps,
  NSPopup.IPopupState
> {
  popupRef = React.createRef<NSPopup.IPopupAction>();

  constructor(props: NSPopup.IPopupProps) {
    super(props);
    if (props.popupId === GlobalPopupID && PopupManager.instance) {
      return;
    } else if (props.popupId === GlobalPopupID && !PopupManager.instance) {
      PopupManager.instance = this;
    } else {
      PopupManager.instances[props.popupId] = this;
    }
  }

  show(options: NSPopup.IPopupOptions) {
    this.popupRef.current?.showPopup?.(options);
  }

  hide() {
    this.popupRef.current?.hidePopup?.();
  }

  removeInstance(instanceId: string) {
    if (instanceId === GlobalPopupID) {
      throw Error('Unable to remove global popup.');
    }

    if (
      Object.prototype.hasOwnProperty.call(PopupManager.instances, instanceId)
    ) {
      delete PopupManager.instances[instanceId];
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
        <PopupConfirm ref={this.popupRef} />
      </React.Fragment>
    );
  }
}
