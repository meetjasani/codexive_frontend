import React, { FC } from 'react'
import Footer from './footer/Footer'

import Header from './header/Header'

interface Props {
    // any props that come into the component
}


const Layout: FC<Props> = ({ children, ...props }) => {
    return (
        <>
            <div>
                {/* <Header /> */}
                <div {...props}>{children}</div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Layout
