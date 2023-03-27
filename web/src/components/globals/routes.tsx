import { TablerIconsProps, IconHome, IconDetails, IconSchool } from '@tabler/icons-react';
import { IAuth } from 'atoms/auth';
import About from 'pages/about';

import Home from 'pages/home';
import Learn from 'pages/learn';
import Modules from 'pages/learn/modules';

export interface IRoute {
	label: string;
	link: string;
	Component: React.FC;
	permissions: Array<string>;
	icon: (props: TablerIconsProps) => JSX.Element;

	props?: any;
	showInNav?: boolean;
	role?: Array<string>;
	nestedLinks?: Array<{
		label: string;
		link: string;
		Component: React.FC;
	}>;
	initiallyOpened?: boolean; // sidebar dropdown state
}

export const checkAccess = (auth: IAuth, route: IRoute) => {
	if (!auth.isLoggedIn) {
		return false;
	}

	if (!route.role || route.role.includes('*')) return true;
	if (auth.user?.userRole === 'ADMIN') return true;
	const contains = route.role.some((role) => auth.user?.permissions.includes(role));
	return contains;
};

const routes: Array<IRoute> = [
	{
		icon: IconHome,
		label: 'Home',
		link: '/',
		Component: Home,
		permissions: [],
	},
	{
		icon: IconDetails,
		label: 'About',
		link: '/about',
		Component: About,
		permissions: [],
	},
	{
		icon: IconSchool,
		label: 'Learn',
		link: '/learn',
		Component: Learn,
		permissions: [],
		nestedLinks: [
			{
				link: '/home',
				label: 'Home',
				Component: Learn,
			},
			{
				link: '/modules',
				label: 'Modules',
				Component: Modules,
			},
		],
	},
];

export default routes;
