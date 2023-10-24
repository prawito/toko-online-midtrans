/* eslint-disable react/prop-types */
import './input.css'

export const Input = ({ label, type = 'text', ...rest }) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input type={type} {...rest} />
        </div>
    );
}