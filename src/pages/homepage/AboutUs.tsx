import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { ApiGetNoAuth } from '../../helper/API/ApiData'
import Specialty from './Specialty'
import { useSelector } from 'react-redux'
const AboutUs = () => {
    const isDark = useSelector((state: any) => state.darkMode.is_dark)
    const [homeData, setHomeData] = useState<any>()

    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    useEffect(() => {
        ApiGetNoAuth('home/get-allHome-section')
            .then((res: any) => {
                setHomeData(res?.data)
            })
    }, [])

    const observer = useRef<any>()
    const lastCardElementRef = useCallback((node) => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting) {
                counter()
            }
        })
        if (node) observer.current.observe(node)
    }, [])


    const counter = () => {
        const counters = document.querySelectorAll('.counter-count');
        const speed = 1000; // The lower the slower
        counters.forEach((counter: any) => {
            counter.innerText = Math.ceil(0);
        })

        counters.forEach((counter: any) => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                // Lower inc to slow and higher to slow
                const inc = target / speed;

                // Check if target is reached
                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = Math.ceil(target);
                }
            };

            updateCount();
        });
    }

    // useEffect(() => {
    //     if (id === "2012") {
    //         window.scrollTo(0, 1400);
    //     }
    // }, []);

    return (
        
        <div className='main-about-page pt-5'>
            <section className="about-section" >
                <Container className='main-choose-box '>
                    <div className="sec-title2 text-center">
                        <div className=''>
                            <span className="sub-text gold-color ">{homeData?.aboutSection?.main_title}</span>
                        </div>
                        <div className="heading-line"></div>
                        {/* <h2 className="title">
                                Why Choose Codexive
                            </h2> */}
                    </div>
                    <Row >
                        <Col md={6} >
                            <div className="rs-animation-image">
                                <div className="pattern-img"  >
                                    <img
                                        src={homeData?.aboutSection?.image === "" ? "./img/round 111111111111.png" : homeData?.aboutSection?.image}
                                        onError={(e: any) => { e.target.onerror = null; e.target.src = "./img/round 111111111111.png" }}
                                        alt=""
                                    />
                                </div>
                                {/* <div className="middle-img" data-aos="fade-left">
                                    <img className="dance3" src='./img/about1.png' />
                                </div> */}
                            </div>


                        </Col>
                        <Col md={6} className='pc-content-box' >

                            <div className="sec-title mb-30 pc-about-content">

                                <h2 className="title ">
                                    {homeData?.aboutSection?.title}
                                </h2>
                                <div className="desc ">
                                    {homeData?.aboutSection?.description}
                                </div>
                                {/* <Button className="readon started pm-aboutus">Learn More</Button> */}
                            </div>

                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Counter Section Start */}
            <div className={isDark ? "counter-box dark-mode" : "counter-box"} ref={lastCardElementRef} >
                <Container className='main-choose-box'>
                    <div className="sec-title2 text-center mb-45 mb-5"  >
                        <span className="sub-text gold-color">{homeData?.counterSection?.main_title}</span>

                        <div className="heading-line"></div>
                        {/* <h2 className="title">
                                Why Choose Codexive
                            </h2> */}
                    </div>
                    <div className={isDark ? "counter-top-area counter-top-area-black" : "counter-top-area"}>
                        <Row >

                            {
                                homeData?.counterSection?.counterData?.map((data: any) => {
                                    const style = { "--my-color": data?.secondColor } as React.CSSProperties
                                    const styleFirst = { "--my-colorIcon": data?.firstColor, background: data?.thirdColor } as React.CSSProperties

                                    return (
                                        <>
                                            <div className="col-md-3 col-sm-6" >
                                                <div className="counter" style={style} >
                                                    <div className="counter-icon"  >
                                                        {/* <img src={data?.image} /> */}
                                                        <img
                                                            src={data?.image === "" ? "../../img/web-dev.png" : data?.image}
                                                            onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/web-dev.png" }}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="counter-content">
                                                        <h3>{data?.title}</h3>
                                                        <div className='d-flex justify-content-center'>
                                                            <div className="counter-count counter-value ml-auto" data-target={data?.number_input}>0</div>
                                                            <div className=" counter-value">{data?.symbol}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }

                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    )
}



export default AboutUs
