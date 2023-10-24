/* eslint-disable react/prop-types */
import './button.css';

export const Button = ({ children, onClick }) => {
    return (
        <button className="btn" onClick={onClick}>
            {children}
        </button>
    );
}