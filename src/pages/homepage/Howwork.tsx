import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ApiGetNoAuth } from '../../helper/API/ApiData'
import Portfoliamain from './Portfoliamain'
import { useSelector } from 'react-redux';


const Howwork = () => {
    const [homeData, setHomeData] = useState<any>()
    const isDark = useSelector((state: any) => state.darkMode.is_dark)

    useEffect(() => {
        ApiGetNoAuth('home/get-allHome-section')
            .then((res: any) => {
                setHomeData(res?.data)
            })
    }, [])


    return (
        <div className='main-howwork-page'>
            <section className={isDark ? "howwork-section dark-mode why-bg-remove" : "howwork-section"}>
                <Container className='main-choose-box'>
                    <div className="sec-title2 text-center mb-45 mb-5"  >
                        <span className="sub-text gold-color">{homeData?.workSection?.main_title}</span>


                        <div className="heading-line"></div>
                        {/* <h2 className="title">
                                Why Choose Codexive
                            </h2> */}
                    </div>

                    <Row className='pc-how-work'>

                        {
                            homeData?.workSection?.workSection?.map((data: any) => {
                                return (
                                    <>
                                        <Col md={4} className='mb-20 position-relative' >
                                            <div className='single-how-we-work'>
                                                <div className="services-item">
                                                    <div className="services-icon"  >
                                                        {/* <img src={data?.image} alt="" /> */}
                                                        <img
                                                            src={data?.image === "" ? "../../img/333333333.png" : data?.image}
                                                            onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/333333333.png" }}
                                                            alt=""
                                                        />
                                                    </div>

                                                </div>
                                                <div className="services-content ">
                                                    <div className="pcititle">

                                                        <h2>{data?.title}</h2>
                                                        {/* <div className="number-area">
                                             01
                                                         </div> */}
                                                    </div>
                                                    <p className="desc">
                                                        {data?.details}
                                                        {/* We denounce with rightous indig nationand dislike men who are so beguiled demoralized */}
                                                    </p>

                                                </div>
                                            </div>
                                        </Col>
                                    </>
                                )
                            })
                        }


                        {/* <Col md={4}>
                            <div className="services-item">
                                <div className="services-icon">
                                    <img src="./img/22222222222.png" alt="" />
                                </div>
                                <div className="services-content ">
                                    <div className="pcititle">
                                        <h2 className="title "><a href="web-development.htmcase-studies-style1.html">IT Management</a></h2>
                                       
                                    </div>
                                    <p className="desc">
                                        We denounce with rightous indig nationand dislike men who are so beguiled demoralized
                                    </p>
                                    <div className="services-btn2">

                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="services-item">
                                <div className="services-icon">
                                    <img src="./img/333333333.png" alt="" />
                                </div>
                                <div className="services-content ">
                                    <div className="pcititle">
                                        <h2 className="title "><a href="web-development.htmcase-studies-style1.html">IT Management</a></h2>
                                       
                                    </div>
                                    <p className="desc">
                                        We denounce with rightous indig nationand dislike men who are so beguiled demoralized
                                    </p>
                                    <div className="services-btn2">

                                    </div>
                                </div>
                            </div>
                        </Col> */}
                        {/* <Row>
                            <Col md={4}>
                                <div className="services-item">
                                    <div className="services-icon">
                                        <img src="./img/44444444444.png" alt="" />
                                    </div>
                                    <div className="services-content ">
                                        <div className="pcititle">
                                            <h2 className="title "><a href="web-development.htmcase-studies-style1.html">IT Management</a></h2>

                                        </div>
                                        <p className="desc">
                                            We denounce with rightous indig nationand dislike men who are so beguiled demoralized
                                        </p>
                                        <div className="services-btn2">

                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="services-item">
                                    <div className="services-icon">
                                        <img src="./img/5555555555.png" alt="" />
                                    </div>
                                    <div className="services-content ">
                                        <div className="pcititle">
                                            <h2 className="title "><a href="web-development.htmcase-studies-style1.html">IT Management</a></h2>

                                        </div>
                                        <p className="desc">
                                            We denounce with rightous indig nationand dislike men who are so beguiled demoralized
                                        </p>
                                        <div className="services-btn2">

                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="services-item">
                                    <div className="services-icon">
                                        <img src="./img/6666666.png" alt="" />
                                    </div>
                                    <div className="services-content ">
                                        <div className="pcititle">
                                            <h2 className="title "><a href="web-development.htmcase-studies-style1.html">IT Management</a></h2>

                                        </div>
                                        <p className="desc">
                                            We denounce with rightous indig nationand dislike men who are so beguiled demoralized
                                        </p>
                                        <div className="services-btn2">

                                        </div>
                                    </div>
                                </div>
                            </Col>

                        </Row> */}

                    </Row>
                </Container>

            </section>

        </div>
    )
}

export default Howwork
