import React, { useState } from 'react'
import { IPortfolio } from '../types/protfolio'
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import Slider from 'react-slick';




interface IProps {
    portfolio: IPortfolio[],
    filter: string
}

function PortfolioReact(props: IProps) {
    const history = useHistory();

    const settings = {
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,

    };

    return (
        <>
            {props.portfolio.map((item: any, i: number) => (
                <Col md={4} key={i}>
                    <div className='card'>
                        <div className='content pc-main-box-content-sec' >

                            <div className='blogimg-ctn'>
                                <Slider {...settings}>
                                    <div>
                                        {/* <img src={item.main_image.displayImage} /> */}
                                        <img
                                            src={item?.main_image?.displayImage === "" ? "../../img/slider-3.jpg" : item?.main_image?.displayImage}
                                            onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/slider-3.jpg" }}
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        {/* <img src={item.main_image.displayImage} /> */}
                                        <img
                                            src={item?.main_image?.displayImage === "" ? "../../img/slider-3.jpg.png" : item?.main_image?.displayImage}
                                            onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/slider-3.jpg" }}
                                            alt=""
                                        />
                                    </div>
                                </Slider>
                            </div>

                            <div className='blogctn-details'>
                                <h3>{item.name}</h3>
                                <p>{item.introduction}</p>
                                <a onClick={() => history.push("/portfoliodetails", item)}>Read More</a>
                            </div>
                        </div>
                    </div>
                </Col>
            ))}
        </>
    )
}

export default PortfolioReact
