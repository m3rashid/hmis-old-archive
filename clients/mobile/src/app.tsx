import React from 'react';
import { RecoilRoot } from 'recoil';
import { NativeBaseProvider } from 'native-base';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView, StatusBar, Text, useColorScheme, View } from 'react-native';

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	return (
		<SafeAreaProvider>
			<RecoilRoot>
				<NativeBaseProvider>
					<NavigationContainer>
						<SafeAreaView>
							<StatusBar
								barStyle={isDarkMode ? 'light-content' : 'dark-content'}
								backgroundColor={backgroundStyle.backgroundColor}
							/>
							<View>
								<Text>Test</Text>
							</View>
						</SafeAreaView>
					</NavigationContainer>
				</NativeBaseProvider>
			</RecoilRoot>
		</SafeAreaProvider>
	);
};

export default App;
