import { useState } from 'react';
import {
	Group,
	Box,
	Collapse,
	ThemeIcon,
	Text,
	UnstyledButton,
	createStyles,
	rem,
	Avatar,
	Flex,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { IRoute } from './routes';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
	control: {
		fontWeight: 500,
		display: 'block',
		width: '100%',
		padding: `${theme.spacing.xs} ${theme.spacing.md}`,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		fontSize: theme.fontSizes.sm,
		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		},
	},
	link: {
		fontWeight: 500,
		display: 'block',
		textDecoration: 'none',
		padding: `${theme.spacing.xs} ${theme.spacing.xs}`,
		paddingLeft: rem(30),
		marginLeft: rem(30),
		fontSize: theme.fontSizes.sm,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
		borderLeft: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		},
	},
	chevron: {
		transition: 'transform 200ms ease',
	},
	buttonStyle: {
		width: '100%',
		overflowX: 'hidden',
		marginTop: 15,
	},
}));

const LinksGroup: React.FC<IRoute> = ({
	icon: Icon,
	nestedLinks: links,
	label,
	initiallyOpened,
	link,
}) => {
	const { classes, theme } = useStyles();
	const hasLinks = Array.isArray(links);
	const [opened, setOpened] = useState(initiallyOpened || false);
	const navigate = useNavigate();
	const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;

	return (
		<>
			<UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
				<Group position="apart" spacing={0} onClick={() => !hasLinks && navigate(link)}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<ThemeIcon variant="light" size={30}>
							<Icon size="1.1rem" />
						</ThemeIcon>
						<Box ml="sm">{label}</Box>
					</Box>
					{hasLinks && (
						<ChevronIcon
							className={classes.chevron}
							size="1rem"
							stroke={1.5}
							style={{
								transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
							}}
						/>
					)}
				</Group>
			</UnstyledButton>
			{hasLinks ? (
				<Collapse in={opened}>
					{(links || []).map((route) => {
						return (
							<Text<'a'>
								component="a"
								className={classes.link}
								href={`${link}${route.link}`}
								key={route.label}
								onClick={(e) => {
									e.preventDefault();
									navigate(`${link}${route.link}`);
								}}
							>
								{route.label}
							</Text>
						);
					})}
				</Collapse>
			) : null}
		</>
	);
};

interface IProps {
	name: string;
	email: string;
	image: string;
}

export const UserButton: React.FC<IProps> = ({ email, image, name }) => {
	const { classes } = useStyles();

	return (
		<UnstyledButton className={classes.buttonStyle}>
			<Flex gap={10}>
				<Avatar size={40} color="blue" src={image}>
					{name.split(' ').map((t) => t[0])}
				</Avatar>
				<div>
					<Text>{name}</Text>
					<Text size="xs" color="dimmed">
						{email}
					</Text>
				</div>
			</Flex>
		</UnstyledButton>
	);
};

export default LinksGroup;
