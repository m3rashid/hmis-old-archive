import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'native-base';
import React from 'react';

const AuthStack = createNativeStackNavigator();

const AuthRoutes = () => {
	const dummyRoute = () => (
		<View>
			<Text>hello</Text>
		</View>
	);

	return (
		<NavigationContainer>
			<AuthStack.Navigator initialRouteName="splash" screenOptions={{ headerShown: false }}>
				<AuthStack.Screen name="splash" component={dummyRoute} />
				<AuthStack.Screen name="login" component={dummyRoute} />
				<AuthStack.Screen name="signup" component={dummyRoute} />
				<AuthStack.Screen name="forgotPassword" component={dummyRoute} />
				<AuthStack.Screen name="resetPassword" component={dummyRoute} />
			</AuthStack.Navigator>
		</NavigationContainer>
	);
};

export default AuthRoutes;
