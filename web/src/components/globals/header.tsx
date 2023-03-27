import React from 'react';
import { createStyles, Header, Container, Group, rem } from '@mantine/core';

export const headerHeight = rem(60);

const useStyles = createStyles((theme) => ({
	inner: {
		height: headerHeight,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	link: {
		display: 'block',
		lineHeight: 1,
		padding: `${rem(8)} ${rem(12)}`,
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,
		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		},
	},
	linkLabel: {
		marginRight: rem(5),
	},
	border: {
		borderBottom: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},
}));

const HeaderAction = () => {
	const { classes } = useStyles();

	return (
		<Header height={headerHeight} className={classes.border}>
			<Container className={classes.inner} fluid>
				<Group>Hello</Group>
				<Group spacing={5} />
				{/* somthing on right */}
			</Container>
		</Header>
	);
};

export default HeaderAction;
