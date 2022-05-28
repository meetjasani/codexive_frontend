import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ApiGetNoAuth } from '../../helper/API/ApiData'
import ReactHtmlParser from 'react-html-parser';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';


function Services() {
    const history = useHistory()
    const [services, setservices] = useState<any>();
    const [servicesData, setservicesData] = useState<any>([]);
    const isDark = useSelector((state: any) => state.darkMode.is_dark)



    useEffect(() => {
        ApiGetNoAuth('servicesDetails/get-noAuth-services-details')
            .then((res: any) => {
                setservices(res?.data)
            })
    }, [])

    useEffect(() => {
        ApiGetNoAuth('tech/getTechnologyByType')
            .then((res: any) => {
                setservicesData(res?.data?.Services)
            })
    }, [])





    return (
        <div className={isDark ? "mainservices-box dark-mode bg-remove" : "mainservices-box"}>
            <div className='bg-round'>
                <img
                    src="./img/bg-round.png"
                    alt=""

                />
            </div>
            <Container>
                <div className='services-ctn'>
                    <h2> Services </h2>
                </div>


                <section>
                    <div className="service-titlectn">
                        {/* <h2>What <span>We</span> Can Build</h2> */}
                        <h2>{services?.title}</h2>
                        <div className="service-heading-line" ></div>
                        {/* <p>We deliver expert Web and Mobile App development services to our clients ranging from Web Development to the latest Cloud Computing Services, all aimed towards building and sustaining the enterprise software backbone.</p>
                        <p>Custom Web and Mobile App development services include creating attractive SEO friendly web pages, mobile applications that ticks off all your requirements and providing you with the best solutions that will help you reach your business specific corporate objectives in this competitive market.</p>
                        <p>Our services and solutions stand a chance in this ever-changing market because of its aspects like quality, reliability and efficiency. Custom Web and Mobile App development services stand the test of time and excessive quality checks at different levels, and we assure you to provide the latest innovations available in the market.</p> */}
                        <p > {ReactHtmlParser(services?.description)}</p>
                    </div>
                </section>

                <section className="services-Card-ctn pm-card">
                    {/* <Row className="service-rowsection pm-card-row"> */}
                    <Row className='justify-content-between'>
                        {
                            servicesData?.map((data: any) => {
                                return (
                                    <>

                                        <Col md={2}>

                                            {/* <div className="box">
    <div className="imgBox">
        <img src={data?.image} alt="" />
    </div>
    <div className="content">
        <h2>  <br />
            <a href='#'>{data?.label}</a></h2>
    </div>
</div> */}


                                            <div className="all-card" >
                                                <div className="enterprise-img" onClick={() => history.push("/mainServices/" + data.label)} >
                                                    {/* <img src={data?.image} /> */}
                                                    <img
                                                        src={data?.image === "" ? "../../img/stock/Mobile_app1.png" : data?.image}
                                                        onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/stock/Mobile_app1.png" }}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="Enterprise-title" >
                                                    <p>{data?.label}</p>
                                                </div>
                                            </div>
                                        </Col>


                                    </>
                                )

                            })
                        }
                    </Row>

                    {/* <div className="container">
                        <div className="card">
                            <div className="slide slide1">
                                <div className="content">
                                    <div className="icon">
                                        <img src='../img/chatbot.png' />
                                    </div>
                                </div>
                            </div>
                            <div className="slide slide2">
                                <div className="content">
                                    <a href="#">  </a>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="col-md-6 col-lg-4 column">
                        <div className="card gr-1">
                            <div className="txt">
                                <h1>BRANDING AND <br />
                                    CORPORATE DESIGN</h1>
                                <p>Visual communication and problem-solving</p>
                            </div>
                            <a href="#">more</a>
                            <div className="ico-card">
                                <i className="fa fa-rebel"></i>
                            </div>
                        </div>
                    </div> */}
                    {/* <Col md={2}>
                            <div className="all-card">
                                <div className="enterprise-img">
                                    <img src="../img/chatbot.png" />
                                </div>
                                <div className="Enterprise-title">
                                    <p>Enterprise Development</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="all-card">
                                <div className="Mobiledev-img">
                                    <img src="../img/applications.png" alt="" />
                                </div>
                                <div className="mobiledev-title">
                                    <p>MobileAppDevelopment</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="all-card">
                                <div className="web-devimg">
                                    <img src="../img/software.png" alt="" />
                                </div>
                                <div className="web-devtitle">
                                    <p>Web Development</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="all-card">
                                <div className="micro-img">
                                    <img src="../img/web-app.png" alt="" />
                                </div>
                                <div className="micro-title">
                                    <p>Microsoft</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="all-card">
                                <div className="desing-img">
                                    <img src="../img/ux-design.png" alt="" />
                                </div>
                                <div className="desing-title">
                                    <p>Design</p>
                                </div>
                            </div>
                        </Col> */}
                    {/* </Row> */}

                    <div className="service-ctn-box">
                        {/* <p>Various software is developed for different organizations as per its sizes and needs. We cater to the needs of any organization that requires <br /> software / Mobile App -related services, be it big or small. </p> */}
                        {/* <p>We have provided our services to the best companies globally and have been appreciated for the integrated one-step Web and Mobile App development services. we come up with for your betterment. Any cutting-edge technology which is ruling the IT market is incorporated into our solutions and thus enhances <br />  your chance to emerge as a successful enterprise. </p> */}
                        <p > {ReactHtmlParser(services?.details)}</p>
                    </div>
                </section >
            </Container >
        </ div >
    )
}

export default Services
