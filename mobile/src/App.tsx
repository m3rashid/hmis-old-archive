import React, { PropsWithChildren } from 'react';
import { RecoilRoot } from 'recoil';
import { NativeBaseProvider } from 'native-base';

const App: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<RecoilRoot>
			<NativeBaseProvider>{children}</NativeBaseProvider>
		</RecoilRoot>
	);
};

export default App;
