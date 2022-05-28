import React, { FC } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux';
import Footer from './footer/Footer';
import AdminHeader from './header/AdminHeader';
import Sidebar from './sidebar/Sidebar';

interface Props {
    // any props that come into the component
}


const AdminLayout: FC<Props> = ({ children, ...props }) => {
    const { is_toggleMenu } = useSelector((state: RootStateOrAny) => state.menuToggle);
    const mainCss = is_toggleMenu ? 'main-big' : 'main'

    return (
        <div className='cx-admin'>
            <AdminHeader />
            <Sidebar />
            <div className={mainCss} {...props}>{children}</div>

        </div>
    )
}

export default AdminLayout
