import { Navbar, ScrollArea, createStyles, rem, Flex, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { PropsWithChildren } from 'react';
import HeaderAction, { headerHeight } from './header';
import LinksGroup, { UserButton } from './helpers';
import routes from './routes';

const useStyles = createStyles((theme) => ({
	navbar: {
		paddingBottom: 0,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
	},
	links: {
		marginLeft: `calc(${theme.spacing.xs} * -1)`,
		marginRight: `calc(${theme.spacing.xs} * -1)`,
	},
	footer: {
		borderTop: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},
}));

const NavbarNested: React.FC<PropsWithChildren> = ({ children }) => {
	const { classes } = useStyles();

	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				primaryShade: 6,
				primaryColor: 'cyan',
				loader: 'bars',
			}}
		>
			<NavigationProgress />
			<Notifications />
			<HeaderAction />

			<ModalsProvider>
				<Flex>
					<Navbar
						height={`calc(100vh - ${headerHeight})`}
						width={{ sm: 230 }}
						p="sm"
						className={classes.navbar}
					>
						<Navbar.Section grow className={classes.links} component={ScrollArea}>
							{routes.map((item) => (
								<LinksGroup {...item} />
							))}
						</Navbar.Section>

						<Navbar.Section className={classes.footer}>
							<UserButton
								image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
								name="Ann Nullpointer"
								email="anullpointasddkffjasdfkhasdfkasdhfkjer@yahoo.com"
							/>
						</Navbar.Section>
					</Navbar>
					<div style={{ flex: 1, maxHeight: `calc(100vh - ${headerHeight})`, overflow: 'auto' }}>
						{children}
					</div>
				</Flex>
			</ModalsProvider>
		</MantineProvider>
	);
};
export default NavbarNested;