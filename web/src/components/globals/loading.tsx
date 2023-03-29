import { Spin, SpinProps } from 'antd';
import React from 'react';

interface IProps extends SpinProps {}

const Loading: React.FC<IProps> = (props) => {
	return (
		<div className="flex items-center justify-center">
			<Spin {...props} />
		</div>
	);
};

export default Loading;
