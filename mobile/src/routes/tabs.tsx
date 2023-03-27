import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from 'constants/colors';
import { Text, View } from 'native-base';
import React from 'react';

const TabNav = createBottomTabNavigator();

const BottomTabs = ({}) => {
	const dummyRoute = () => (
		<View>
			<Text>hello</Text>
		</View>
	);

	return (
		<TabNav.Navigator
			screenOptions={({ route }) => ({
				tabBarHideOnKeyboard: true,
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: colors.primary,
				tabBarStyle: {
					display: 'flex',
					borderTopLeftRadius: 15,
					borderTopRightRadius: 15,
					backgroundColor: colors.white,
					elevation: 2,
				},
				// tabBarIcon: ({ focused }) => {},
			})}
		>
			<TabNav.Screen name="home" component={dummyRoute} />
		</TabNav.Navigator>
	);
};

export default BottomTabs;
