import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import { ApiGetNoAuth } from '../../helper/API/ApiData'
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux'


interface Services {
    id: string,
    main_service: string,
    sub_services_id: string,
    sub_services: string,
    title: string,
    description: string,
    image: { displayImage: string, image: string },
    title_second: string,
    description_second: string,
    image_second: string,
}

const MainservicesDetail = () => {
    const history = useHistory()
    const { name } = useParams<{ name?: string }>()
    const [serviceData, setServiceData] = useState([])
    const isDark = useSelector((state: any) => state.darkMode.is_dark);


    useEffect(() => {
        if (name != null && name != undefined) {
            getServiceDetailById()
            console.log(name)
        }
    }, [name])

    const getServiceDetailById = () => {
        ApiGetNoAuth(`service/getAllServicesByName/${name}`)
            .then((res: any) => {
                setServiceData(res.data)
            })
    }


    return (
        <div className={isDark ? "main-enterprice-ctn dark-mode bg-remove" : "main-enterprice-ctn"}>
            <div className='bg-round'><img src="./img/bg-round.png" alt="" /></div>
            <Container>
                <section className="enterpricedev-ctn">
                    <div className="enterprice-title">
                        <h2> {name && name} </h2>
                    </div>
                    {/* <div className="enterprice-description">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, quod amet? Reiciendis rerum, totam provident sunt repellat quo at deleniti! Iusto soluta officia, praesentium fugiat distinctio quos non. Ex, ullam.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente vel quidem delectus repellat maiores sint aspernatur minus accusamus cum molestiae rem, sequi velit nulla esse sed facere cumque doloribus obcaecati!</p>
                    </div> */}
                </section>

                <section className="enterprice-section">
                    <Row className='align-items-center'>
                        {serviceData && serviceData.length > 0 && serviceData.map((service: any, index: number) => (
                            <>
                                {index % 2 == 1 ?
                                    <>
                                        <Col md={6} className="enterprice-col">
                                            <div className="enterprice-mainsection">
                                                <div className="enterprice-sectiontitle" >
                                                    <h2> {service?.title} </h2>
                                                    <div className="section-heading"></div>
                                                </div>
                                                <div className="enterprice-sectiondescription" >
                                                    <p>{ReactHtmlParser(service?.description)}</p>
                                                </div>
                                                <button
                                                    onClick={() => history.push(`../services/${service?.sub_services}`)}
                                                > Read More </button>
                                            </div>
                                        </Col>
                                        <Col md={6} className="enterprice-col">
                                            <div className="enterprice-img" >
                                                {/* <img src={service?.image?.displayImage} alt="image" /> */}
                                                <img
                                                    src={service?.image?.displayImage === "" ? "../../img/stock/Mobile_app1.png" : service?.image?.displayImage}
                                                    onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/stock/Mobile_app1.png" }}
                                                    alt=""
                                                />
                                            </div>
                                        </Col>
                                    </>
                                    :
                                    <>
                                        <Col md={6} className="enterprice-col">
                                            <div className="arsection-img">
                                                {/* <img src={service?.image?.displayImage} alt="image" /> */}
                                                <img
                                                    src={service?.image?.displayImage === "" ? "../../img/stock/Mobile_app1.png" : service?.image?.displayImage}
                                                    onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/stock/Mobile_app1.png" }}
                                                    alt=""
                                                />
                                            </div>
                                        </Col>
                                        <Col md={6} className="enterprice-col">
                                            <div className="enterprice-mainsection">
                                                <div className="enterprice-sectiontitle">
                                                    <h2>{service?.title}  </h2>
                                                    <div className="section-heading"></div>
                                                </div>
                                                <div className="enterprice-sectiondescription" >
                                                    <p>{ReactHtmlParser(service?.description)}</p>
                                                </div>
                                                <button
                                                    onClick={() => history.push(`../services/${service?.sub_services}`)}

                                                > Read More </button>
                                            </div>
                                        </Col>
                                    </>
                                }
                            </>
                        ))}
                    </Row>
                </section>
            </Container>
        </div>
    )
}

export default MainservicesDetail
