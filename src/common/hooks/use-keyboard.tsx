import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

const useKeyboard = (
  onKeyboardDidShow?: (e: KeyboardEvent) => void,
  onKeyboardDidHide?: (e: KeyboardEvent) => void,
) => {
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(
    Keyboard.isVisible(),
  );
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useEffect(() => {
    const _keyboardDidShow = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
      onKeyboardDidShow?.(e);
    });
    const _keyboardDidHide = Keyboard.addListener('keyboardDidHide', _e => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
      onKeyboardDidHide?.(_e);
    });

    return () => {
      _keyboardDidShow.remove();
      _keyboardDidHide.remove();
    };
  }, [keyboardHeight, onKeyboardDidHide, onKeyboardDidShow]);
  return { keyboardVisible, keyboardHeight };
};

export default useKeyboard;
