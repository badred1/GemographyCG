import React from "react";
import { Button } from 'react-native-paper';
import { styles } from "./Styles";
interface ButtonProps {
  icon?: any,
  label: string,
  onClick: any,
  style?: any,
  disabled?: boolean
}

const ButtonComponent: React.FC<ButtonProps> = (props) => {
  const { label, disabled, icon, onClick, style } = props;
  return (
    <Button
      theme={{
        fonts: {
          thin: { fontFamily: 'Montserrat-Thin' },
          light: { fontFamily: 'Montserrat-Light' },
          regular: { fontFamily: 'Montserrat-Regular' },
          medium: { fontFamily: 'Montserrat-Medium' },
        }
      }}
      icon={icon}
      mode="contained"
      onPress={onClick}
      style={[styles.container, style]}
      disabled={disabled}
    >
      {label}
    </Button>
  )
}

export default ButtonComponent;