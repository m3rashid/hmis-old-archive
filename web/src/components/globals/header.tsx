import React from 'react';
import { createStyles, Header, Container, Group, rem } from '@mantine/core';

export const headerHeight = rem(50);

const useStyles = createStyles((theme) => ({
	inner: {
		height: headerHeight,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	header: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
	},
}));

const HeaderAction = () => {
	const { classes } = useStyles();

	return (
		<Header height={headerHeight} className={classes.header}>
			<Container className={classes.inner} fluid>
				<Group>Hello</Group>
				<Group spacing={5} />
				{/* somthing on right */}
			</Container>
		</Header>
	);
};

export default HeaderAction;
