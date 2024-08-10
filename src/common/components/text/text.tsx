import React, { memo } from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { ITextProps } from './types';
import useTextViewModel from './use-text-view-model';

const Text = (props: ITextProps) => {
  const { stylesText, requiredTextStyle } = useTextViewModel(props);

  const renderChildren = React.useCallback(() => {
    if (
      props.textHighLight &&
      props.children &&
      typeof props.children === 'string'
    ) {
      if (props.children.unUnicodeMatch(props.textHighLight)) {
        const fullText = props.children;
        const indexWord = fullText
          .unUnicode()
          .indexOf(props.textHighLight.unUnicode());
        const childrenList: any[] = [];
        const beforeTextHighLight = fullText.slice(0, indexWord);
        if (beforeTextHighLight) {
          childrenList.push(beforeTextHighLight);
        }
        const _textHighLight = fullText.slice(
          indexWord,
          indexWord + props.textHighLight.length,
        );
        childrenList.push({
          text: _textHighLight,
        });

        const afterTextHighLight = fullText.slice(
          indexWord + props.textHighLight.length,
          fullText.length,
        );
        if (afterTextHighLight) {
          childrenList.push(afterTextHighLight);
        }

        return childrenList.map((child: any) => {
          if (typeof child === 'object') {
            return (
              <RNText
                key={'random_key'.uuidv4()}
                allowFontScaling={false}
                style={[stylesText as TextStyle, props.textHightLightStyle]}
              >
                {(child as any)?.text || ''}
              </RNText>
            );
          }

          return child;
        });
      }
    }
    return props.children;
  }, [
    props.textHighLight,
    props.textHightLightStyle,
    props.children,
    stylesText,
  ]);

  return (
    <RNText {...props} allowFontScaling={false} style={stylesText as TextStyle}>
      {renderChildren()}
      {props.required && (
        <RNText allowFontScaling={false} style={requiredTextStyle}>
          *
        </RNText>
      )}
    </RNText>
  );
};

export default memo(Text);
