import { Center, Loader } from '@mantine/core';
import React from 'react';

interface IProps {}

const Loading: React.FC<IProps> = () => {
	return (
		<Center style={{ height: '100%' }}>
			<Loader size={60} variant="bars" />
		</Center>
	);
};

export default Loading;
