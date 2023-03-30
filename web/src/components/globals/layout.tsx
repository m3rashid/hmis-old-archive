import enUs from 'antd/locale/en_US';
import { useRecoilState, useRecoilValue } from 'recoil';
import React, { PropsWithChildren, useState } from 'react';
import { ConfigProvider, Layout, Menu, MenuProps, Typography } from 'antd';

import configAtom from 'atoms/config';
import routes from 'components/globals/routes';
import uiAtom from 'atoms/ui';
import { useNavigate } from 'react-router-dom';
import UserTop from 'components/globals/userTop';

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const navigate = useNavigate();
	const config = useRecoilValue(configAtom);
	const [ui, setUi] = useRecoilState(uiAtom);
	const [currentMenuItem, setCurrentMenuItem] = useState('');

	const handleMenuChange = ({ key }: { key: string }) => {
		setCurrentMenuItem(key);
		navigate(key);
	};

	const sidebarRoutes: MenuProps['items'] = routes.reduce((acc: any, route) => {
		if (route.showInNav === false) return [...acc];
		return [
			...acc,
			...[
				{
					key: route.link,
					icon: route.icon,
					label: config.sidebarStringMap[route.label] || route.label,
					style: {
						color: config.appLightForeground,
						...(currentMenuItem === route.link && {
							background: config.appThemeColor,
						}),
					},
					...(!!route.nestedLinks && {
						children: route.nestedLinks?.map((nestedRoute) => ({
							label: config.sidebarStringMap[nestedRoute.label] || nestedRoute.label,
							key: `${route.link}${nestedRoute.link}`,
							icon: nestedRoute.icon,
							style: {
								color: config.appLightForeground,
								...(currentMenuItem === `${route.link}${nestedRoute.link}` && {
									background: config.appThemeColor,
								}),
							},
						})),
					}),
				},
				...(route.dividerBottom
					? [
							{
								type: 'divider',
								style: {
									background: config.appLightForeground,
									opacity: 0.3,
									width: '90%',
									margin: '0 auto',
								},
							},
					  ]
					: []),
			],
		];
	}, []);

	const defaultOpenKeys = routes.reduce((acc: any, route) => {
		if (route.initiallyOpened) return [...acc, route.link];
		if (!route.nestedLinks || !route.showInNav) return [...acc];
		return [...acc];
	}, []);

	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: 'Poppins, sans-serif',
					colorPrimary: config.appThemeColor,
					colorBgTextHover: config.appThemeColor,
					colorFill: config.appThemeColor,
					controlOutline: 'none',
				},
			}}
			locale={enUs}
		>
			<Layout className="h-screen overflow-y-hidden">
				{/* TODO: open like drawer on mobile instead of supressing the right container  */}
				<Layout.Sider
					breakpoint="lg"
					collapsedWidth="0"
					onBreakpoint={(broken) => {
						// console.log({broken});
						setUi((prev) => ({ ...prev, isMobile: broken }));
					}}
					onCollapse={(collapsed, type) => {
						// console.log({collapsed, type});
						setUi((prev) => ({ ...prev, sidebarCollapsed: collapsed }));
					}}
					zeroWidthTriggerStyle={{
						background: config.appSidebarColor,
						opacity: 1,
						marginTop: '64px',
					}}
					style={{
						background: config.appSidebarColor,
						...(ui.isMobile && {
							position: 'fixed',
							zIndex: 5,
							height: '100%',
							bottom: 0,
						}),
					}}
				>
					<div className="h-[64px]">
						<Typography.Title
							level={3}
							style={{ color: 'white' }}
							className={`h-full flex items-center ${ui.isMobile ? 'pl-2' : 'justify-center'}`}
						>
							{config.appName}
						</Typography.Title>
					</div>

					<Menu
						mode="inline"
						defaultOpenKeys={defaultOpenKeys}
						style={{ background: config.appDarkColor }}
						items={sidebarRoutes}
						onClick={handleMenuChange}
					/>
				</Layout.Sider>
				<Layout style={{ backgroundColor: config.appLightBackground }}>
					<Layout.Header
						className="p-0"
						style={{
							background: config.appHeaderColor,
							...(!(ui.isMobile || ui.sidebarCollapsed) ? { paddingRight: '20px' } : {}),
						}}
					>
						<div className="h-[64px] flex items-center justify-center gap-5 flex-row px-2 m-0">
							{ui.isMobile || ui.sidebarCollapsed ? (
								<>
									<Typography.Title level={3} style={{ color: 'white' }} className="flex-1 mt-3">
										{config.appName}
									</Typography.Title>
									<div>hello world</div>
								</>
							) : (
								<>
									<div className="flex-1" />
									<UserTop />
								</>
							)}
						</div>
					</Layout.Header>
					<Layout.Content className={`${ui.isMobile ? 'm-[8px]' : 'm-[12px]'} mb-0 rounded-md`}>
						<div
							className={`${
								ui.isMobile ? 'p-[8px]' : 'p-[12px]'
							} min-h-[360px] h-full overflow-auto`}
							style={{ background: config.appLightForeground }}
						>
							{children}
						</div>
					</Layout.Content>
					<Layout.Footer
						style={{ backgroundColor: config.appLightBackground }}
						className="text-center py-3"
					>
						{config.appName} &copy; {new Date().getFullYear()} - All Rights Reserved
					</Layout.Footer>
				</Layout>
			</Layout>
		</ConfigProvider>
	);
};

export default AppLayout;
