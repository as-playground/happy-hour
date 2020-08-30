import React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router';
import { useSessionState } from '../context/session';

export const ProtectedRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
    const state = useSessionState();

    const renderComponent = (props: RouteComponentProps) =>
        !!state.currentSession && !!Component ? <Component {...rest} {...props} /> : <Redirect to="/create-session" />;

    return <Route {...rest} render={renderComponent} />;
};
