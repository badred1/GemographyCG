import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 50,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1E8E94',
    accent: '#dfeeea',
    background: "#fff",
    text: "#fff"
  },
  fonts: {
    thin: { fontFamily: 'Raleway-Thin' },
    light: { fontFamily: 'Raleway-Light' },
    regular: { fontFamily: 'Raleway-Regular' },
    medium: { fontFamily: 'Raleway-Medium' },
  }
};

export default theme;