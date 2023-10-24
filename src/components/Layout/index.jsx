/* eslint-disable react/prop-types */
import { Header } from "../Header";
import './layout.css';

export const Layout = ({ title, children, onBack, full, noHeader }) => {
    return (
        <div className="layout-container">
            {!noHeader && (
                <Header title={title} onBack={onBack} />
            )}
            <div className={`layout-content ${full && 'full'}`}>{children}</div>
        </div>
    );
}