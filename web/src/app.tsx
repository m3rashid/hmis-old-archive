import React from 'react';
import { ProConfigProvider } from '@ant-design/pro-components';
import { BrowserRouter } from 'react-router-dom';

import enUS from 'antd/lib/locale/en_US';
import { ConfigProvider } from 'antd';
import AppContainer from 'components/globals/appContainer';

const App = () => {
	return (
		<ConfigProvider locale={enUS} theme={{}}>
			<ProConfigProvider hashed={false}>
				<BrowserRouter>
					<AppContainer>
						<div>App</div>
					</AppContainer>
				</BrowserRouter>
			</ProConfigProvider>
		</ConfigProvider>
	);
};

export default App;
