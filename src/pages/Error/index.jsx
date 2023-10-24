import { useRouteError } from 'react-router-dom';
import './error.css';

function Error() {
    const error = useRouteError();

    return (
        <div className='error-container'>
            <h1 className='error-title'>Oops!</h1>
            <p className='error-message'>Sorry, an unexpected error has occurred.</p>
            <p className='error-details'>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default Error;