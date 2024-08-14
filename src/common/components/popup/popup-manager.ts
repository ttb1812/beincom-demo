import { NSPopup } from './types';

class GlobalUIManager {
  instance?: NSPopup.IPopupStatic = undefined;
  instances: Record<string, NSPopup.IPopupStatic> = {};
}
const PopupManager = new GlobalUIManager();
export default PopupManager;
