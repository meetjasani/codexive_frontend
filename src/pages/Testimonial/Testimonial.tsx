import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { ApiGetNoAuth } from '../../helper/API/ApiData';
import { useSelector } from 'react-redux'



function Testimonial() {
    const isDark = useSelector((state: any) => state.darkMode.is_dark)
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
        <div className={isDark ? "testimonial-page dark-mode bg-remove" : "testimonial-page"}>
            <div className='bg-round'>
                <img
                    src="./img/bg-round.png"
                    alt=""

                />
            </div>
            <Container>
                <div className='testimonial-head' >
                    <h3>Testimonial</h3>
                </div>

                <div className='single-portfolio-middle-content'>
                    <Row>
                        {content && content.length > 0 && content.map((item: any) =>
                            <Col md={6}>
                                <div className="testi-item" >
                                    <div className="testimonial-content">
                                        <div className="author-img" >
                                            {/* <img src={item?.image} alt="" /> */}
                                            <img
                                                src={item?.image === "" ? "../../img/333.jpg" : item?.image}
                                                onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/333.jpg" }}
                                                alt=""
                                            />
                                        </div>
                                        <div className="author-part" >
                                            <p className="name" >{item?.name}</p>
                                            <span className="designation">{item?.position}</span>
                                        </div>
                                    </div>
                                    <div className="author-desc">
                                        <div className="desc" >
                                            <p >{item?.testimonial}</p>
                                            <img className="quote" src="./img/quote.png" alt="" />
                                        </div>
                                    </div>

                                </div>
                            </Col>
                        )}
                    </Row>
                </div>



            </Container>
        </div>
    )
}

export default Testimonial
