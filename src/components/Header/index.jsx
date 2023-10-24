/* eslint-disable react/prop-types */
import icBack from './ic-back.svg';
import './header.css';

export function Header({title, onBack}) {
    return (
        <div className="header-container">
            <img src={icBack} alt="ic-back" className="ic-back" onClick={onBack} />
            <p className='title'>{title}</p>
        </div>
    );
}
