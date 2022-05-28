import React from 'react'
import AdminAuthHeader from './header/AdminAuthHeader';


interface Props {
    children?: React.ReactNode;

}


const LogRegLayout: React.FC<Props> = ({
    children,
}) => {
    return (
        <div className="loginreg-bg">
            <AdminAuthHeader />
            {children}
        </div>
    )
}

export default LogRegLayout;
