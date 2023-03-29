import { Layout, Menu, theme, Typography } from 'antd';
import React, { PropsWithChildren } from 'react';

import routes from 'components/globals/routes';

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	// TODO: hanlde nested routes
	const items = routes.reduce((acc: any, curr) => {
		if (!curr.showInNav) return [...acc];
		return [
			...acc,
			{
				key: curr.link,
				icon: <curr.icon />,
				label: curr.label,
			},
		];
	}, []);

	return (
		<Layout className="h-screen overflow-y-hidden">
			{/* TODO: open like drawer on mobile instead of supressing the right container  */}
			<Layout.Sider
				breakpoint="lg"
				collapsedWidth="0"
				onBreakpoint={(broken) => {
					console.log(broken);
				}}
				onCollapse={(collapsed, type) => {
					console.log(collapsed, type);
				}}
			>
				<Typography.Title level={3} style={{ color: 'white' }}>
					HMIS
				</Typography.Title>

				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['4']}
					items={
						routes.reduce((acc: any, curr) => {
							if (!curr.showInNav) return [...acc];
							return [
								...acc,
								{
									key: curr.link,
									icon: <curr.icon />,
									label: curr.label,
								},
							];
						}, []) as any
					}
				/>
			</Layout.Sider>
			<Layout>
				<Layout.Header className="p-0" style={{ background: colorBgContainer }} />
				<Layout.Content className="m-[16px] mb-0">
					<div
						className="p-[24px] min-h-[360px] h-full overflow-auto"
						style={{ background: colorBgContainer }}
					>
						{children}
					</div>
				</Layout.Content>
				<Layout.Footer className="text-center py-3">
					HMIS &copy; {new Date().getFullYear()} - All Rights Reserved
				</Layout.Footer>
			</Layout>
		</Layout>
	);
};

export default AppLayout;
