import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { faFacebookF, faTwitter, faPinterestP, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faMapMarkerAlt, faPhoneVolume, faClock, faPhoneAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useHistory } from 'react-router-dom';
import { ApiGetNoAuth } from '../../helper/API/ApiData';
import { isValidUrl } from '../../helper/utils';
import { useSelector } from 'react-redux';



function Footer() {
    const [footerData, setFooterData] = useState<any>()
    const [headerItem, setHeaderItem] = useState<string[]>([])
    const isDark = useSelector((state: any) => state.darkMode.is_dark)

    const history = useHistory();
    const [getTechData, setGetTechData] = useState({
        Category: [],
        Services: []
    })

    useEffect(() => {
        getHeaderMenuData()
        getTechnologyCall()
        ApiGetNoAuth('home/get-allHome-section')
            .then((res: any) => {
                setFooterData(res?.data?.footerSection)
            })
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


    return (
        <div className='main-footer-page'>
            <section className={isDark ? "footer-section dark-mode footer-dark-image" : "footer-section"}>
                {/* <div className='bg-round' >
                    <img src="./img/Untitled-444444444444444-01.png" alt="" />
                </div> */}
                <Container className='pc-index-box'>
                    <Row>
                        <Col md={3} className='pc-index-box'>
                            <div className="footer-logo mb-30" >
                                <img src="./img/fina````l- tagline-01.svg" alt="" />
                            </div>
                            <div className="textwidget mb-30">
                                <p >{footerData?.description}</p>


                                {/* <p>Sedut perspiciatis unde omnis iste natus error sitlutem acc usantium doloremque denounce with illo inventore veritatis</p> */}
                            </div>
                            <div className="footer-social md-mb-30">

                                <ul>

                                    <li >
                                        <a href={`${isValidUrl(footerData?.socialIcon?.facebook) ? footerData?.socialIcon?.facebook : "http://" + footerData?.socialIcon?.facebook}`} target="_blank"><i><FontAwesomeIcon icon={faFacebookF} className="fafaicons" /></i></a>
                                    </li>
                                    <li >
                                        <a href={`${isValidUrl(footerData?.socialIcon?.twitter) ? footerData?.socialIcon?.twitter : "http://" + footerData?.socialIcon?.twitter}`} target="_blank"><i><FontAwesomeIcon icon={faTwitter} className="fafaicons" /></i></a>
                                    </li>

                                    <li >
                                        <a href={`${isValidUrl(footerData?.socialIcon?.linkedIn) ? footerData?.socialIcon?.linkedIn : "http://" + footerData?.socialIcon?.linkedIn}`} target="_blank"><i><FontAwesomeIcon icon={faLinkedinIn} className="fafaicons" /></i></a>
                                    </li>
                                    <li >
                                        <a href={`${isValidUrl(footerData?.socialIcon?.instagram) ? footerData?.socialIcon?.instagram : "http://" + footerData?.socialIcon?.instagram}`} target="_blank"><i><FontAwesomeIcon icon={faInstagram} className="fafaicons" /></i></a>
                                    </li>
                                </ul>
                            </div>


                        </Col>
                        <Col md={3}>
                            {headerItem.includes('Services') &&
                                <div className=" pl-45 ">
                                    <h3 className="widget-title">IT Services</h3>
                                    <div className="site-map">
                                        <ul>
                                            {getTechData && getTechData.Services.length > 0 && getTechData.Services.map((service: any) => (
                                                <Link to={`/mainServices/${service.label}`} >{service.label}</Link>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            }
                        </Col>
                        <Col md={3}>
                            {headerItem.includes('Contact_Us') &&
                                <div className="md-mb-30 pl-45  "  >
                                    <h3 className="widget-title">Contact Info</h3>
                                    <div className="address-widget">
                                        <ul>
                                            <li>
                                                <i><FontAwesomeIcon icon={faMapMarkerAlt} className="fafaicons" /> </i>
                                                <div className="desc">{footerData?.contactInfo?.location}</div>
                                            </li>
                                            <li>
                                                <i><FontAwesomeIcon icon={faPhoneAlt} className="fafaicons" /></i>
                                                <div className="desc">
                                                    <a>{footerData?.contactInfo?.contact_no}</a>
                                                </div>
                                            </li>
                                            <li>
                                                <i><FontAwesomeIcon icon={faEnvelope} className="fafaicons" /></i>
                                                <div className="desc">
                                                    <a>{footerData?.contactInfo?.email}</a>
                                                </div>
                                            </li>
                                            <li>
                                                <i><FontAwesomeIcon icon={faClock} className="fafaicons" /></i>
                                                <div className="desc">
                                                    {footerData?.contactInfo?.opening_time}


                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            }
                        </Col>
                        <Col md={3} className='pc-index-box'>
                            <div className=" pl-45 " >
                                <h3 className="widget-title">Sort Link</h3>
                                <div className="site-map">
                                    <ul>
                                        <Link to='/faq'>FAQ</Link>
                                        <Link to='/termAndCondition' >Term And Condition</Link>
                                        <Link to='/privacyPolicy' >Privacy Policy</Link>
                                        <Link to='/blog'>Blog</Link>
                                        <Link to='/team'>Team</Link>
                                        <Link to='/testimonial'>Testimonial</Link>


                                    </ul>
                                </div>
                            </div>
                        </Col>

                        {/* <h3 className="widget-title">Newsletter</h3>
                                <p className="widget-desc">We denounce with righteous and in and dislike men who are so beguiled and demo realized.</p>
                                <p>
                                    <input type="email" name="EMAIL" placeholder="Your email address" />
                                    <div className="paper-plane">
                                        <input type="submit" value="Sign up" />
                                        <i><FontAwesomeIcon icon={faPaperPlane} className="fafaicons" /></i>
                                    </div>

                                </p> */}


                    </Row>
                </Container>

            </section >
            {/* Topbar Area Start  */}
            {/* <div className="full header">
                <div className="pc-main-header">
                    <div className="topbar-area">
                        <div className="content-box">
                            <div className="pc-row ">
                                <div className="call-content">
                                    <div className='d-flex'>
                                         <div className="">
                                            <ul>
                                                <li>
                                                    <i><FontAwesomeIcon icon={faEnvelope} className="fafaicons" /></i>
                                                    <a href="mailto:support@rstheme.com">support@rstheme.com</a>
                                                </li>
                                                <li>
                                                    <i><FontAwesomeIcon icon={faPhoneVolume} className="fafaicons" /></i>
                                                    <a href="tel:++1(990)999–5554"> +1 (990) 999–5554</a>
                                                </li>
                                                <li>
                                                    <i><FontAwesomeIcon icon={faMapMarkerAlt} className="fafaicons" /> </i>
                                                    <a href=""> 05 kandi BR. New York</a>
                                                </li>
                                            </ul>
                                        </div> 

                                      
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  */}
            {/* Topbar Area end  */}
            <div className={isDark ? "mx-auto pc-copy-box pc-index-box dark-mode bg-remove text-color" : "mx-auto pc-copy-box pc-index-box"} >

                <p>{footerData?.copyRight}</p>

            </div>

        </div >
    )
}

export default Footer
