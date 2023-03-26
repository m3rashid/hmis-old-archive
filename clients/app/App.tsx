import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RecoilRoot} from 'recoil';

function App(): JSX.Element {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	return (
		<NativeBaseProvider>
			<RecoilRoot>
				<SafeAreaView>
					<StatusBar
						barStyle={isDarkMode ? 'light-content' : 'dark-content'}
						backgroundColor={backgroundStyle.backgroundColor}
					/>
				</SafeAreaView>
			</RecoilRoot>
		</NativeBaseProvider>
	);
}

export default App;
