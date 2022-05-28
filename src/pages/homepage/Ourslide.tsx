import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { ApiGetNoAuth } from '../../helper/API/ApiData'
import Slider from "react-slick";


const Ourslide = () => {


    const [technologydata, setTechnology] = useState<any>({
        main_title: "",
        technology: []
    })
    useEffect(() => {
        ApiGetNoAuth('technology/get-noAuth-supported-technology')
            .then((res: any) => {
                setTechnology({ ...technologydata, main_title: res?.data?.main_title, technology: res?.data?.technology })
            })
    }, [])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
    };







    return (
        <div className='main-ourslide-page'>
            <section className='ourslide-section'>
                <Container className='main-choose-box'>
                    <div className="sec-title2 text-center mb-45 mb-5"  >
                        <span className="sub-text gold-color">{technologydata.main_title}</span>

                        <div className="heading-line"></div>
                        {/* <h2 className="title">
                                Why Choose Codexive
                            </h2> */}
                    </div>
                    <Row className='align-items-center'>
                        {
                            technologydata?.technology.map((data: any) => {
                                return (
                                    <>
                                        <Col md={2} className='text-center'>
                                            <div className='main-image-slide'>
                                                <img
                                                    src={data?.image === "" ? "../../img/stock/Tlogo-nodejs.png" : data?.image}
                                                    onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/stock/Tlogo-nodejs.png" }}
                                                    alt=""
                                                />
                                            </div>
                                        </Col>
                                    </>
                                )
                            })
                        }

                        {/* <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>
                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>
                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>
                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>
                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>


                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>
                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>
                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>
                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>
                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>
                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>


                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>
                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>
                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>
                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>
                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col>
                        <Col md={2} className='text-center'>
                            <div className='main-image-slide'>
                                <img src="./img/logo/aws.png" alt="" />

                            </div>
                        </Col> */}

                    </Row>

                    <Row className='pc-logo-main-slider'>
                        <Slider {...settings}>
                            <div>
                                <div className='pc-main-image-slide'>
                                <img src="https://codexivesolutions.com:5004/images/image-1644388654915.png" alt=""/>
                                </div>
                            </div>
                            <div>
                                <div className='pc-main-image-slide'>
                                <img src="https://codexivesolutions.com:5004/images/image-1644388661422.png" alt=""/>
                                </div>
                            </div>
                            <div>
                                <div className='pc-main-image-slide'>
                                    <img src="../../img/stock/Tlogo-nodejs.png" />
                                </div>
                            </div>
                            <div>
                                <div className='pc-main-image-slide'>
                                <img src="https://codexivesolutions.com:5004/images/image-1644388672162.png" alt=""/>
                                </div>
                            </div>
                            <div>
                                <div className='pc-main-image-slide'>
                                <img src="https://codexivesolutions.com:5004/images/image-1644388676905.png" alt=""/>
                                </div>
                            </div>
                            <div>
                                <div className='pc-main-image-slide'>
                                <img src="https://codexivesolutions.com:5004/images/image-1644388681334.png" alt=""/>
                                </div>
                            </div>
                        </Slider>

                    </Row>



                </Container>

            </section>


        </div>
    )
}

export default Ourslide

