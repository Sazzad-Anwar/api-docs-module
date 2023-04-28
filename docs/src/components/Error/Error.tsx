import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

export default function Error({ message }: { message?: string }): JSX.Element {
    const navigate = useNavigate();
    const error = useRouteError();

    return (
        <div className="flex justify-center items-center">
            {message ? (
                <pre className="prose">{message}</pre>
            ) : (
                <pre className="prose">{error!.toString()}</pre>
            )}
        </div>
    );
}
