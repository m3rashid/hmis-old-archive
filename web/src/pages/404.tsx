import { Button, Image, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

interface IProps {
	message?: string;
	buttonLabel?: string;
}

const ErrorPage: React.FC<IProps> = ({
	buttonLabel = 'Return to Home',
	message = 'Page Not found',
}) => {
	const navigate = useNavigate();

	return (
		<div className="flex justify-center items-center flex-col gap-10">
			<Image src="/error.gif" className="max-h-[60vh] h-[500px] w-auto" preview={false} />
			<div className="flex flex-col items-center">
				<Typography.Title level={3}>{message}</Typography.Title>
				<Button onClick={() => navigate('/')}>{buttonLabel}</Button>
			</div>
		</div>
	);
};

export default ErrorPage;
