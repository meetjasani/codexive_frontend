import React from 'react'
import AboutUs from '../homepage/AboutUs'
import Team from '../Team/Team'
import { useSelector } from 'react-redux'

function Aboutus() {
    const isDark = useSelector((state: any) => state.darkMode.is_dark)
    return (
        <div className={isDark ? "about-page-content about-page-content-dark dark-mode" : "about-page-content"}>
            <AboutUs />
        </div>
    )
}

export default Aboutus
