import ErrorPage from 'pages/404';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Catch = (component: any) => {
	return class extends React.Component {
		state = {
			error: undefined,
		};

		static getDerivedStateFromError(error: any) {
			return { error };
		}

		removeError() {
			this.setState({ error: undefined });
		}

		componentDidCatch(error: any, info: any) {
			console.log(error, info);
		}

		render() {
			return component(this.props, this.state.error, this.removeError.bind(this));
		}
	};
};

interface IProps {
	removeError: any;
}

const ErrorHandlerFallback: React.FC<IProps> = ({ removeError }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [currentPath, setCurrentpath] = useState('');

	useEffect(() => {
		setCurrentpath(pathname);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!currentPath) return;
		if (currentPath !== pathname) {
			removeError();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return <ErrorPage />;
};

const ErrorBoundary = Catch((props: any, error: any, removeError: any) => {
	if (error) {
		return <ErrorHandlerFallback removeError={removeError} />;
	} else {
		return <React.Fragment>{props.children}</React.Fragment>;
	}
});

export default ErrorBoundary;
