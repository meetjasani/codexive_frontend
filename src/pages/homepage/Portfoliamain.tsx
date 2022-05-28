import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Slider from "react-slick";
import Ceoexpert from './Ceoexpert'
import { ApiGetNoAuth } from '../../helper/API/ApiData';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Portfoliamain = () => {

    const [homeData, setHomeData] = useState<any>()
    const isDark = useSelector((state: any) => state.darkMode.is_dark)

    useEffect(() => {
        getTabData("All")
        ApiGetNoAuth('home/get-allHome-section')
            .then((res: any) => {
                setHomeData(res?.data)
            })
    }, [])
    const settings = {
        dots: false,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 1,
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
    const [portfolioData, setPortfolioData] = useState<any[]>([]);

    // console.log('portfolioData', portfolioData);
    const history = useHistory();

    const getTabData = (tabId: any) => {
        debugger;
        ApiGetNoAuth(`portfolio/get-company-portfolio-by-user/${tabId}`)
            .then((res: any) => {
                console.log("res****", res);

                setPortfolioData(res.data ? res.data : [])
            })

    }

    return (
        <div className='main-portfolia-page'>
            <section className={isDark ? "portfolia-section dark-mode bg-remove" : "portfolia-section"}>

                <Row className='margin-0 align-item-center'>
                    <Col md={4} className='padding-0' >
                        <div className="case-study bg12 mod">
                            <div className="sec-title2 mb-30">
                                <div className="sub-text " >Portfolio</div>
                                <h2 className="title testi-title white-color pb-20" >
                                    {/* How Codexive assist your business */}
                                    {homeData?.portfolioSection?.title}
                                </h2>
                                <div className="desc-big" >
                                    {homeData?.portfolioSection?.description}
                                    {/* Bring to the table win-win survival strategies to dotted proactive domination. At the end of the going forward, a new normal that has evolved generation. */}
                                </div>
                            </div>
                        </div>

                    </Col>

                    <Col md={8} className="pc-project-box px-0"
                    >

                        <Slider {...settings}>

                            {
                                portfolioData?.slice(0, 5).map((data: any) => {

                                    return (
                                        <>
                                            <div className='project-item' >
                                                <div className='port-slider at-img-height'>
                                                    {/* <img src={data.main_image.displayImage} alt="" /> */}
                                                    <img
                                                        src={data?.main_image?.displayImage === "" ? "../../img/slider-1.jpg" : data?.main_image?.displayImage}
                                                        onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/slider-1.jpg" }}
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="project-content" onClick={() => history.push("/portfoliodetails", data)} >
                                                    <div className="portfolio-inner">
                                                        <h3 className="title"><a>{data?.name}</a></h3>
                                                        <span className="category"><a >{data?.technical_overview}</a></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })

                            }




                            {/* <div className='project-item'>
                                <div className='port-slider'>
                                    <img src="./img/slider-2.jpg" alt="" />

                                </div>
                                <div className="project-content">
                                    <div className="portfolio-inner">
                                        <h3 className="title"><a href="case-studies-style1.html">Growth Strategies</a></h3>
                                        <span className="category"><a href="case-studies-style1.html">IT Technology</a></span>
                                    </div>
                                </div>
                            </div>
                            <div className='project-item'>
                                <div className='port-slider'>
                                    <img src="./img/slider-3.jpg" alt="" />

                                </div>
                                <div className="project-content">
                                    <div className="portfolio-inner">
                                        <h3 className="title"><a href="case-studies-style1.html">latform Integration</a></h3>
                                        <span className="category"><a href="case-studies-style1.html">IT Technology</a></span>
                                    </div>
                                </div>
                            </div>
                            <div className='project-item'>
                                <div className='port-slider'>
                                    <img src="./img/slider-1.jpg" alt="" />

                                </div>
                                <div className="project-content">
                                    <div className="portfolio-inner">
                                        <h3 className="title"><a href="case-studies-style1.html">Innovative Interfaces</a></h3>
                                        <span className="category"><a href="case-studies-style1.html">IT Technology</a></span>
                                    </div>
                                </div>
                            </div>
                            <div className='project-item'>
                                <div className='port-slider'>
                                    <img src="./img/slider-2.jpg" alt="" />

                                </div>
                                <div className="project-content">
                                    <div className="portfolio-inner">
                                        <h3 className="title"><a href="case-studies-style1.html">Product Engineering</a></h3>
                                        <span className="category"><a href="case-studies-style1.html">IT Technology</a></span>
                                    </div>
                                </div>
                            </div>
                            <div className='project-item'>
                                <div className='port-slider'>
                                    <img src="./img/slider-3.jpg" alt="" />

                                </div>
                                <div className="project-content">
                                    <div className="portfolio-inner">
                                        <h3 className="title"><a href="case-studies-style1.html">Analytic Solutions</a></h3>
                                        <span className="category"><a href="case-studies-style1.html">IT Technology</a></span>
                                    </div>
                                </div>
                            </div> */}

                        </Slider>
                    </Col>

                </Row>



            </section>


        </div>
    )
}

export default Portfoliamain
