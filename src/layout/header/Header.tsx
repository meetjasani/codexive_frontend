
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faPinterestP, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhoneVolume, faMapMarkerAlt, faClock, faSearch, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown, Dropdown, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { useLocation, Link, useHistory } from "react-router-dom";
import { ApiGetNoAuth } from "../../helper/API/ApiData";
import Homepage from "../../pages/homepage/Homepage";
import { setReduxDarkMode } from "../../redux/actions/toggleMenuAction";
import { useDispatch } from "react-redux";

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()
    const [getTechData, setGetTechData] = useState({
        Category: [],
        Services: []
    })
    const [getCategoryData, setGetCategoryData] = useState([])
    const [headerItem, setHeaderItem] = useState<string[]>([])

    const location = useLocation();

    useEffect(() => {
        getCategoryCall()
        getTechnologyCall()
        getHeaderMenuData()
    }, [])

    const getHeaderMenuData = () => {
        ApiGetNoAuth(`general/get-menu-setting`)
            .then((res: any) => {
                let tempData = [...res.data?.setting]
                if (tempData.length > 0) {
                    tempData = tempData.filter((x: any) => x.is_active == "false")
                    tempData = tempData.map((x: any) => x.form_name)
                    setHeaderItem(tempData)
                } else {
                    setHeaderItem([])
                }
            })
    }


    const getTechnologyCall = () => {
        ApiGetNoAuth(`tech/getTechnologyByType`)
            .then((res: any) => {
                setGetTechData(res.data)
            })
    }

    const getCategoryCall = () => {
        ApiGetNoAuth(`category/categoryDropDown`)
            .then((res: any) => {
                setGetCategoryData(res.data)
            })
    }

    return (
        <div>
            {/* menu Area start  */}
            <div className='main-menu-box'>
                <div className="pc-sticky">
                    <Navbar expand="lg" className={darkMode ? "dark-mode header-shadow" : "bg-light"}>
                        <Container fluid>
                            <Navbar.Brand href="/">
                                <img src='./img/fina````l- tagline-01.svg' />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav
                                    className="my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    {headerItem.includes('Home') &&
                                        <Nav.Link className={location.pathname === "/" ? "link-active" : ""} >
                                            <Link to="/" className={location.pathname === "/" ? "active-link" : "deactive-link"}> Home </Link>
                                        </Nav.Link>
                                    }
                                    {headerItem.includes('About_Us') &&
                                        <Nav.Link className={location.pathname === "/aboutus" ? "link-active" : ""} >
                                            <Link to="/aboutus" className={location.pathname === "/aboutus" ? "active-link" : "deactive-link"}> About Us </Link>
                                        </Nav.Link>
                                    }
                                    {headerItem.includes('Career') &&
                                        <Nav.Link className={location.pathname === "/career" ? "link-active" : ""} >
                                            <Link to="/career" className={location.pathname === "/career" ? "active-link" : "deactive-link"}>Career</Link>
                                        </Nav.Link>
                                    }
                                    {headerItem.includes('Services') &&
                                        <Nav.Link className="dropdown">
                                            <button className="service-btn" onClick={() => history.push("/services")}>Services</button>
                                            <div className="dropdown-content">
                                                <div className="mega-menu">
                                                    {getTechData && getTechData.Services.length > 0 && getTechData.Services.map((service: any) => (
                                                        <div className="main-servicelink" >
                                                            <Link to={`/mainServices/${service.label}`}>
                                                                <a href="#" className="service-link">
                                                                    {service.label}
                                                                </a>
                                                                <div className="Enterprise-link">
                                                                    {getCategoryData && getCategoryData.length > 0 && getCategoryData.filter((data: any) => data.parent_category_id == service.label).map((service: any) => (
                                                                        <Link to={`/services/${service?.id}`} >{service?.category}</Link>
                                                                    ))}
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </Nav.Link>
                                    }
                                    {headerItem.includes('Portfolio') &&
                                        <Nav.Link className={location.pathname === "/portfolio" ? "link-active" : ""}>
                                            <Link to="/portfolio" className={location.pathname === "/portfolio" ? "active-link" : "deactive-link"} >Portfolio</Link>
                                        </Nav.Link>
                                    }

                                    {headerItem.includes('Contact_Us') &&
                                        <Nav.Link className={location.pathname === "/contactus" ? "link-active" : ""}>
                                            <Link to="/contactus" className={location.pathname === "/contactus" ? "active-link" : "deactive-link"} >Contact Us</Link>
                                        </Nav.Link>
                                    }

                                    <div className="toggle-box">
                                        <button
                                            className="Dark-mode-btn"
                                            onClick={() => {
                                                setDarkMode(!darkMode);
                                                dispatch(setReduxDarkMode(!darkMode));
                                            }}
                                        >
                                            {darkMode ?  <FontAwesomeIcon icon={faSun} className="dark-icon" /> : <FontAwesomeIcon icon={faMoon} className="light-icon " />}
                                        </button>
                                        {/* <label className="switch">
                                            <input type="checkbox" onChange={() => {
                                                setDarkMode(!darkMode);
                                                dispatch(setReduxDarkMode(!darkMode));
                                            }} />

                                            <span className="slider round"></span>
                                        </label> */}
                                    </div>
                                </Nav>
                                <div className="d-flex">

                                    {headerItem.includes('Get_Quote') && <Button variant="outline-success">Get a Quote</Button>}
                                </div>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>

            </div>
            {/* menu Area end  */}
        </div >
    )
}

export default Header
