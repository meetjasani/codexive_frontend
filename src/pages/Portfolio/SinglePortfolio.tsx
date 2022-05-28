import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { useSelector } from 'react-redux'


function SinglePortfolio() {
    const location = useLocation()
    const [portfolioData, setPortfolioData] = useState<any>();
    const isDark = useSelector((state: any) => state.darkMode.is_dark);

    const settings = {
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        setPortfolioData(location.state)
    }, [location])


    return (
        <div className={isDark ? "our-single-portfolio-page dark-mode bg-remove" : "our-single-portfolio-page"}>
            <div className='bg-round'>
                <img
                    src="./img/bg-round.png"
                    alt=""

                />
            </div>
            <Container>
                <div className='single-portfolio-head'>
                    <h3>{portfolioData?.name}</h3>
                </div>

                <div className='single-portfolio-middle-content'>
                    <Row>
                        <Col md={8}>
                            <div >
                                <Slider {...settings}>
                                    <div className='single-port-slider'>
                                        {/* <img src={portfolioData?.main_image?.displayImage} alt="" /> */}
                                        <img
                                            src={portfolioData?.main_image?.displayImage === "" ? "../../img/slider-3.jpg.png" : portfolioData?.main_image?.displayImage}
                                            onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/slider-3.jpg" }}
                                            alt=""
                                        />
                                    </div>

                                    {portfolioData && portfolioData.image && portfolioData.image.map((item: any) =>
                                        <div className='single-port-slider'>
                                            {/* <img src={item?.displayImage} alt="" /> */}
                                            <img
                                                src={item?.displayImage === "" ? "../../img/slider-3.jpg.png" : item?.displayImage}
                                                onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/slider-3.jpg" }}
                                                alt=""
                                            />
                                        </div>
                                    )}

                                </Slider>
                            </div>
                            <div className='content-slider'>
                                {portfolioData?.introduction}
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className='single-project-sidebar' >
                                <h3 >Key Feature</h3>
                                {portfolioData?.key_features && portfolioData?.key_features.split(',').map((item: any) =>
                                    <div className='key-feature-content'>
                                        <div className='dot-leyfeature'>
                                            <FontAwesomeIcon icon={faCircle} />
                                        </div>
                                        <div className='content-dot' >
                                            <p >
                                                {item}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>


                            <div className='single-project-sidebar mt-4' >
                                <h3  >Technology</h3>
                                {portfolioData?.technical_overview && portfolioData?.technical_overview.split(',').map((item: any) =>
                                    <div className='key-feature-content'>
                                        <div className='dot-leyfeature'>
                                            <FontAwesomeIcon icon={faCircle} />
                                        </div>
                                        <div className='content-dot'>
                                            <p>
                                                {item}
                                            </p>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </Col>
                    </Row>
                </div>
            </Container >
        </div >
    )
}

export default SinglePortfolio
