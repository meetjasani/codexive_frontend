import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { ApiGetNoAuth } from '../../helper/API/ApiData'
import AboutUs from './AboutUs'
import Slider from "react-slick";
import { useSelector } from 'react-redux';


const WhyChoose = () => {
    const [homeData, setHomeData] = useState<any>()
    const isDark = useSelector((state: any) => state.darkMode.is_dark)

    const settings = {
        dots: false,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 1000,
                    autoplay: false
                }
            },
        ]
    };


    useEffect(() => {
        ApiGetNoAuth('home/get-allHome-section')
            .then((res: any) => {
                setHomeData(res?.data)
            })
    }, [])

    // useEffect(() => {
    //     if (id === "1234") {
    //         window.scrollTo(0, 750);
    //     }
    // }, []);




    return (
        <div className="main-choose-box"  >
            <section  >
                <div className={isDark ? "pc-color-section dark-mode  why-bg-remove" : "pc-color-section "}>
                    <Container>
                        <div className="sec-title2 text-center mb-45 mb-5"  >
                            <span className="sub-text gold-color">{homeData?.whyChooseSection?.main_title}</span>
                            <div className="heading-line"></div>

                            {/* <h2 className="title">
                                Why Choose Codexive
                            </h2> */}
                        </div>
                        <Row>
                            <Slider {...settings}>
                                {homeData?.whyChooseSection?.section?.map((data: any) => {
                                    return (
                                        <>
                                            <Col md={4} className='pc-front-box-sec'>
                                                <div className="front-part">
                                                    <div className="front-content-part purple-bg">
                                                        <div className="front-icon-part">
                                                            <div className="icon-part">

                                                                <img
                                                                    src={data?.image === "" ? "../../img/why-choose.png" : data?.image}
                                                                    onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/why-choose.png" }}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="front-title-part">
                                                            <h3 className="title" ><a href="web-development.html">{data?.title}</a></h3>
                                                        </div>
                                                        <div className="front-desc-part">
                                                            <p>
                                                                {data?.description}
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </Col>
                                        </>
                                    )
                                })}
                            </Slider>



                            {/* <Col md={4}>
                                <div className="front-part">
                                    <div className="front-content-part purple-bg">
                                        <div className="front-icon-part">
                                            <div className="icon-part">
                                                <img src='./img/project-management.png' />
                                            </div>
                                        </div>
                                        <div className="front-title-part">
                                            <h3 className="title"><a href="web-development.html">Business Intelligence</a></h3>
                                        </div>
                                        <div className="front-desc-part">
                                            <p>
                                                We denounce with righteous indignation and dislike men who are so beguiled and demo ralized your data.
                                            </p>
                                        </div>
                                        <Button className="readon-started-1">View More</Button>

                                    </div>
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="front-part">
                                    <div className="front-content-part purple-bg">
                                        <div className="front-icon-part">
                                            <div className="icon-part">
                                                <img src='./img/computer.png' />
                                            </div>
                                        </div>
                                        <div className="front-title-part">
                                            <h3 className="title"><a href="web-development.html">Business Intelligence</a></h3>
                                        </div>
                                        <div className="front-desc-part">
                                            <p>
                                                We denounce with righteous indignation and dislike men who are so beguiled and demo ralized your data.
                                            </p>
                                        </div>
                                        <Button className="readon-started-1">View More</Button>

                                    </div>
                                </div>
                            </Col> */}

                        </Row>
                    </Container>

                </div>

            </section>


        </div>
    )
}

export default WhyChoose
