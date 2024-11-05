import {
    Dimensions,
  } from 'react-native';
  const { width: ScreenWidth } = Dimensions.get('screen');


  export const _textInputStyle = (borderColor: any) => ({
    height: 50,
    width: ScreenWidth * 0.9,
    borderWidth: 1,
    paddingLeft: 16,
    borderRadius: 8,
    paddingRight: 16,
    borderColor: borderColor,
    justifyContent: 'center',
    backgroundColor: '#eceef5',
    color: '#000',
  });

  export default ({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainerStyle: {
      right: 16,
      position: 'absolute',
    },
    iconImageStyle: {
      height: 20,
      width: 20,
      tintColor: '#b5b9bb',
    },
  });
