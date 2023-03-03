import { useRecoilValue } from 'recoil';
import React, { PropsWithChildren } from 'react';
import type { ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProConfigProvider, ProLayout } from '@ant-design/pro-components';

import userAtom from 'atoms/user';
import configAtom from 'atoms/config';
import { Link } from 'react-router-dom';
import UserTop from './userTop';

export interface IProps extends PropsWithChildren {}

const AppContainer: React.FC<IProps> = ({ children }) => {
	const user = useRecoilValue(userAtom);
	const config = useRecoilValue(configAtom);

	const settings: Partial<ProSettings> = {
		fixSiderbar: true,
		layout: 'mix',
		splitMenus: true,
	};

	return (
		<div style={{ height: '100vh' }}>
			<ProConfigProvider hashed={false}>
				<ProLayout
					disableMobile
					logo={config.appLogo}
					locale="en-US"
					siderMenuType="group"
					collapsedButtonRender={false}
					avatarProps={UserTop(user)}
					headerTitleRender={() => {
						return (
							<Link to="/">
								<img src={config.appLogo} alt="applogo" />
								<h1>{config.appName}</h1>
							</Link>
						);
					}}
					hasSiderMenu={false}
					{...settings}
					actionsRender={() => []}
					// {...defaultProps}
					{...settings}
				>
					<PageContainer>
						<ProCard style={{ height: '85vh', minHeight: 500 }}>{children}</ProCard>
					</PageContainer>
				</ProLayout>
			</ProConfigProvider>
		</div>
	);
};

export default AppContainer;
