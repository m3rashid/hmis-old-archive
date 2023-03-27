import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'native-base';
import React from 'react';

const MainStack = createNativeStackNavigator();

const AuthRoutes = () => {
	const dummyRoute = () => (
		<View>
			<Text>hello</Text>
		</View>
	);

	return (
		<NavigationContainer>
			<MainStack.Navigator initialRouteName="splash" screenOptions={{ headerShown: false }}>
				<MainStack.Screen name="splash" component={dummyRoute} />
			</MainStack.Navigator>
		</NavigationContainer>
	);
};

export default AuthRoutes;
