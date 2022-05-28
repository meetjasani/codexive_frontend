import React from 'react'
import "./Sidebar.css"
import SidebarMenu from "./SidebarMenu"
import { RootStateOrAny, useSelector } from 'react-redux';
import { CSidebar, CSidebarNav, CCreateElement, CSidebarNavDivider, CSidebarNavDropdown, CSidebarNavItem, CSidebarNavTitle } from '@coreui/react'
import { Image } from 'react-bootstrap'
import AdminPic from "../../img/Filip_profile_circle.png"

function Sidebar() {

    const { is_toggleMenu } = useSelector((state: RootStateOrAny) => state.menuToggle);

    const sidebarClass = is_toggleMenu ? 'sidebar-small' : 'sidebar';


    return (
        <div id="mySidebar" className={`${sidebarClass} cx-sidebar`}>
            <div className="cx-admin-detail">
                <Image className="admin-profile-img" src={AdminPic} />
                <h4 className="cx-admin-name">Admin</h4>
            </div>
            <CSidebar show={true}>
                <CSidebarNav className="sidebar-in">
                    <CCreateElement
                        items={SidebarMenu}
                        components={{
                            CSidebarNavDivider,
                            CSidebarNavDropdown,
                            CSidebarNavItem,
                            CSidebarNavTitle,
                        }}
                    />
                </CSidebarNav>
            </CSidebar>
        </div>
    )
}

export default Sidebar
