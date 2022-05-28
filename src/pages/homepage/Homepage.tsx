import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { ApiGet, ApiGetNoAuth } from '../../helper/API/ApiData'
import ReactHtmlParser from 'react-html-parser';
import AboutUs from './AboutUs';
import Specialty from './Specialty';
import Howwork from './Howwork';
import Portfoliamain from './Portfoliamain';
import Ceoexpert from './Ceoexpert';
import OurCustomer from './OurCustomer';
import Ourslide from './Ourslide';
import Testimonial from './Testimonial';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import WhyChoose from './WhyChoose';



const Homepage = () => {

    const [homeData, setHomeData] = useState<any>()
    const [headerItem, setHeaderItem] = useState<string[]>([])
    const isDark = useSelector((state: any) => state.darkMode.is_dark)

    const history = useHistory();
    useEffect(() => {
        getHeaderMenuData()
        ApiGetNoAuth('home/get-allHome-section')
            .then((res: any) => {
                setHomeData(res?.data)
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

    const contactus = () => {
        history.push("/contactus")
    }

    return (
        <div className={isDark ? " main-home-page dark-mode bg-remove" : "main-home-page"}>
            <div className='pc-position' >
                {headerItem.includes('Homepage') &&
                    <Container>
                        <Row>
                            <Col md={6}>
                                <div className="banner-content z-index-1" >
                                    <span className="sub-text">{homeData?.heroSection?.title}</span>

                                    <p className='custom-text-only'> {ReactHtmlParser(homeData?.heroSection?.details)}</p>
                                    {/* <h1 className="title">Digital <span className="blue-color">Technology,  </span><br></br>
                                    <span className="pink-color"> It Solutions </span>
                                    & Services Around the World</h1>
                                <p className="desc">
                                    We are leading technology solutions proving company all over
                                    the world doing over 40 years.
                                </p> */}

                                    <Button className="readon started" onClick={contactus}>Get Started</Button>
                                </div>

                            </Col>
                            <div className="banner-animation">
                                <div className="bnr-animate one">
                                    <img className="rotate" src="./img/React.js_logo-512.png" alt="" />
                                </div>

                                <div className="bnr-animate three">
                                    <img className="horizontal" src="./img/1764882.png" alt="" />
                                </div>
                                <div className="bnr-animate four">
                                    <img className="vertical" src="./img/CORE-PHP-BASICS-20210817.png" alt="" />
                                </div>
                                <div className="bnr-animate five">
                                    <img className="rotate" src="./img/laravel-mark-red-type-black_w1280 .png" alt="" />
                                </div>
                                <div className="bnr-animate six">
                                    <img className="rotate" src="./img/javascript-logo-transparent-logo-javascript-images-3.png" alt="" />
                                </div>
                                <div className="bnr-animate seven">
                                    <img className="vertical" src="./img/485-4850258_bootstrap-logo-png-image-free-download-searchpng-logos.png" alt="" />
                                </div>
                                <div className="bnr-animate eight">
                                    <img className="vertical" src="./img/shape7.png" alt="" />
                                </div>
                                <div className="bnr-animate nine">
                                    <img className="rotate" src="./img/240px-Apple-logo.png" alt="" />
                                </div>
                                <div className="bnr-animate ten">
                                    <img className="horizontal" src="./img/702308.png" alt="" />
                                </div>
                                <div className="bnr-animate eleven">
                                    <img className="FramesOne" src="./img/shape4.png" alt="" />
                                </div>

                            </div>
                            <Col md={6}>
                                <div className="images-part" >
                                    {/* <img src={homeData?.heroSection?.image} /> */}
                                    <img
                                        src={homeData?.heroSection?.image === "" ? "../../img/homepage-main-image.png" : homeData?.heroSection?.image}
                                        onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/homepage-main-image.png" }}
                                        alt=""
                                    />
                                </div>
                            </Col>

                        </Row>
                    </Container>
                }
                {headerItem.includes('WhyChoose') &&
                    // <div id='1234'>
                    <WhyChoose />
                    // </div>
                }
                {headerItem.includes('AboutUs') && <AboutUs />}
                {headerItem.includes('Specialty') && <Specialty />}
                {headerItem.includes('Howwork') && <Howwork />}
                {headerItem.includes('Portfoliamain') && <Portfoliamain />}
                {headerItem.includes('Ceoexpert') && <Ceoexpert />}
                {headerItem.includes('Testimonial') && <Testimonial />}
                {headerItem.includes('OurCustomer') && <OurCustomer />}
                {headerItem.includes('Ourslide') && <Ourslide />}

            </div>
        </div>
    )
}

export default Homepage