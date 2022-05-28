import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { ApiGetNoAuth } from '../../helper/API/ApiData'
import Ourslide from './Ourslide'
import Slider from "react-slick";
import { Carousel } from "react-bootstrap";
import { useSelector } from 'react-redux';


const OurCustomer = () => {

    const [customerData, setCustomerData] = useState<any>("")
    const isDark = useSelector((state: any) => state.darkMode.is_dark)


    const settings = {
        dots: false,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    useEffect(() => {
        ApiGetNoAuth('customer/get-noAuth-ourCustomer-section')
            .then((res: any) => {
                setCustomerData(res?.data)
            })
    }, [])


    return (
        <div className='main-ourcustomer-page'>
            <section className={isDark ? "ourcustomer-section dark-mode-2 bg-remove" : "ourcustomer-section"}>
                <Row className='main-choose-box'>
                    <div className="sec-title2 text-center mb-45 mb-5"  >
                        <span className="sub-text gold-color">Our Customer</span>
                        <div className="heading-line"></div>
                        {/* <h2 className="title">
                                Why Choose Codexive
                            </h2> */}
                    </div>
                </Row>
                <Row className='pc-center'>
                    <Col md={7} className='main-custom-card'>
                        <div className='main-img-sec'>
                            <img
                                src="../../img/somebg.png"
                                className="pc-main-custom-img"
                                alt=""

                            />
                            <Row>
                                <Col>
                                    <Slider {...settings}>
                                        {

                                            customerData?.customer?.map((data: any) => {
                                                return (
                                                    <>
                                                        <Col md={4} className='pc-custom-card-section'>
                                                            <div className="container"
                                                            >
                                                                <div className="card">
                                                                    <div className="slide slide1">
                                                                        <div className="content">
                                                                            <div className="icon">
                                                                                {/* <img src={data?.image} /> */}
                                                                                <img
                                                                                    src={data?.image === "" ? "../../img/stock/businessman.png" : data?.image}
                                                                                    onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/stock/businessman.png" }}
                                                                                    alt=""
                                                                                />
                                                                                <h2>{data?.name}</h2>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="slide slide2">
                                                                        <div className="content">
                                                                            <h3>
                                                                                {/* Hello there! */}
                                                                                {data?.customer_title}
                                                                            </h3>
                                                                            {/* <p>Trust yourself and keep going.</p> */}
                                                                            <p>{data?.customer_description}</p>
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </>
                                                )
                                            })
                                        }



                                    </Slider>
                                </Col>
                            </Row>
                        </div>
                    </Col>


                    <Col md={5}>
                        <div className='customer-desc' >
                            <p>{customerData?.description}</p>
                            {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p> */}
                        </div>
                    </Col>

                </Row>
            </section>
        </div >
    )
}
export default OurCustomer