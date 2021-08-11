import React from "react";
import { View, ActivityIndicator } from "react-native";
import { styles } from "./Style"

interface SpinnerProps {
	color?: any,
	style?: any
}

const Spinner: React.FC<SpinnerProps> = (props) => {
	const { color,style } = props;
	return (
		<View style={[styles.container, styles.horizontal, style]}>
			<ActivityIndicator size="large" color={color ? color : "black"} />
		</View>
	)
}

export default Spinner;