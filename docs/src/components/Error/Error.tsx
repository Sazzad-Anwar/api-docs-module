import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

export default function Error(): JSX.Element {
    const navigate = useNavigate();
    const error = useRouteError();

    return (
        <div className="flex justify-center items-center">
            <pre className="prose">{error!.toString()}</pre>
        </div>
    );
}
