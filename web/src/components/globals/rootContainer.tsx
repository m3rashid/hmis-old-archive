import { Navbar, ScrollArea, createStyles, rem, Flex, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { PropsWithChildren } from 'react';
import HeaderAction, { headerHeight } from './header';
import LinksGroup from './helpers';
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
	childrenContainer: {
		flex: 1,
		maxHeight: `calc(100vh - ${headerHeight})`,
		overflow: 'auto',
		padding: theme.spacing.md,
	},
}));

const RootContainer: React.FC<PropsWithChildren> = ({ children }) => {
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
					</Navbar>
					<div className={classes.childrenContainer}>{children}</div>
				</Flex>
			</ModalsProvider>
		</MantineProvider>
	);
};
export default RootContainer;
