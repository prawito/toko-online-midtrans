/* eslint-disable react/prop-types */
export const Item = ({ label, value }) => {
    return (
        <div className="item">
            <p className="label">{label}</p>
            <p className="value">{value}</p>
        </div>
    );
}