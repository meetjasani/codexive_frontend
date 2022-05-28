import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Slider from "react-slick";
import { ApiGetNoAuth } from '../../helper/API/ApiData';
import OurCustomer from './OurCustomer';
;

const Testimonial = () => {

    const Testicard = {
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const [content, setContent] = useState<any>()
    const getTestimonialsData = () => {
        ApiGetNoAuth('testimonial/get-testimonial-by-user')
            .then((res: any) => {
                setContent(res.data ? res.data : [])
            })
            .catch((error) => {

            })
    }

    useEffect(() => {
        getTestimonialsData()
    }, [])

 
    return (
        <div className='main-testimain-page'>
            <section className='testimain-section' >
                <Container >
                    <Row>
                        <Col md={6}>
                            <div className="testi-image" >
                                <img src="./img/testimonial-4.png" alt="" />
                            </div>
                        </Col>
                        <Col md={6} className='pl-50'>
                            <div className="sec-title mb-50" >
                                <div className="sub-text style4-bg left testi">Testimonials</div>
                                <h2 className="title pb-20">
                                    What Customer Saying
                                </h2>
                                <div className="desc">
                                    Over 25 years working in IT services developing software applications and mobile apps for clients all over the world.
                                </div>
                            </div>

                            <Slider {...Testicard}>
                                {content && content.length > 0 && content.map((item: any) =>
                                    <div className="testi-item"  >
                                        <div className="author-desc"  >
                                            <div className="testimonial-content-1">
                                                <div className="author-img" >
                                                    {/* <img src={item?.image} alt="" /> */}
                                                    <img
                                                        src={item?.image === "" ? "../../img/333.jpg" : item?.image}
                                                        onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/333.jpg" }}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="author-part">
                                                    <a className="name">{item?.name}</a>
                                                    <span className="designation">{item?.position}</span>
                                                </div>
                                            </div>
                                            <div className="testimonial-content" >
                                                <div className="desc">
                                                    <p>{item?.testimonial}</p>
                                                    <img className="quote" src="./img/quote.png" alt="" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )}

                            </Slider>
                        </Col>
                    </Row>

                </Container>


            </section>

        </div>
    )
}

export default Testimonial
