import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { ApiGetNoAuth } from '../../helper/API/ApiData';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux'


const ServicesDetail = () => {
    const { id } = useParams<{ id?: string }>();
    const isDark = useSelector((state: any) => state.darkMode.is_dark);
    const [serviceData, setServiceData] = useState({
        description: "",
        description_second: "",
        id: "",
        image: { displayImage: "", image: "" },
        image_second: { displayImage: "", image: "" },
        main_service: "",
        sub_services: "",
        title: "",
        title_second: ""
    })

    useEffect(() => {
        if (id != null && id != undefined) {
            getServiceDetailById()
        }
    }, [id])

    const getServiceDetailById = () => {
        ApiGetNoAuth(`service/getAllServiceBySubId/${id}`)
            .then((res: any) => {
                if (Object.keys(res.data).length === 0) {
                    setServiceData({
                        description: "",
                        description_second: "",
                        id: "",
                        image: { displayImage: "", image: "" },
                        image_second: { displayImage: "", image: "" },
                        main_service: "",
                        sub_services: "",
                        title: "",
                        title_second: ""
                    })
                } else {
                    setServiceData(res.data)
                }
            })
    }


    return (
        <div className={isDark ? "main-service-page ml-service-page dark-mode bg-remove" : "main-service-page ml-service-page "}>
            <div className='bg-round'>
                <img
                    src="../../img/bg-round.png"
                    alt=""

                />
            </div>
            <Container>
                <div
                    className='portfolio-head'

                >
                    <h3>{serviceData?.sub_services}</h3>
                </div>

                <div className='service-row'>

                    <section className='service-type-ml-top-sec'>


                        <Row>
                            <Col md={6}>

                                <div className='service-type-sec-content'>
                                    <h2 className="service-type-sec-title" >
                                        {serviceData?.title}
                                    </h2>
                                    <p >
                                        {ReactHtmlParser(serviceData?.description)}
                                    </p>

                                </div>
                            </Col>

                            <Col md={6}>
                                <div className='port-slider'>
                                    {/* <img
                                        src={serviceData?.image?.displayImage}
                                        alt=""
                                        
                                    /> */}
                                    <img
                                        src={serviceData?.image?.displayImage === "" ? "../../img/stock/Mobile_app1.png" : serviceData?.image?.displayImage}
                                        onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/stock/Mobile_app1.png" }}
                                        alt=""
                                    />
                                </div>
                            </Col>
                        </Row>
                    </section>


                    <section className='service-type-ml-top-sec'>
                        <Row>
                            <Col md={6}>

                                <div className='service-type-sec-content'>
                                    <h2
                                        className="service-type-sec-title"

                                    >
                                        {serviceData?.title_second}
                                    </h2>
                                    <p>
                                        {ReactHtmlParser(serviceData?.description_second)}
                                    </p>

                                </div>
                            </Col>

                            <Col md={6}>
                                <div className='port-slider'>
                                    {/* <img
                                        src={serviceData?.image_second?.displayImage}
                                        alt=""
                                      
                                    /> */}
                                    <img
                                        src={serviceData?.image_second?.displayImage === "" ? "../../img/stock/Laravel.png" : serviceData?.image_second?.displayImage}
                                        onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/stock/Laravel.png" }}
                                        alt=""
                                    />
                                </div>
                            </Col>
                        </Row>
                    </section>


                </div>

            </Container >


        </div >
    )
}

export default ServicesDetail;
