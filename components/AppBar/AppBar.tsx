import React from 'react';
import { styles } from './Styles';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface AppBarProps {
	onPress?: any,
	iconName?: any,
	title: any,
	style?: any,
	iconRight?: any,
	backgroundColor?: string,
	borderBottomColor?: string,
	onIconRightPress?: any
}

const AppBar: React.FC<AppBarProps> = (props) => {

	const { onPress, style, title, iconName, iconRight, onIconRightPress, backgroundColor, borderBottomColor } = props;

	return (
		<Appbar.Header style={{ backgroundColor: backgroundColor ?? "white", borderBottomColor: borderBottomColor ?? "#ccc", elevation: 0 }}>
			<Appbar.Action
				animated={false}
				style={{ marginTop: "2.5%" }}
				icon={() => <Icon
					name={iconName}
					color="white"
					size={22}
				/>}
				onPress={onPress}
			/>
			<Appbar.Content titleStyle={[styles.title, style]} title={title} />
			<Appbar.Action
				onPress={onIconRightPress}
				animated={false}
				icon={() => <Icon
					name={iconRight}
					color="white"
					size={24}
				/>}
			/>
		</Appbar.Header>
	)
}

export default AppBar;
