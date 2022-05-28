import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Testimonial from './Testimonial';
import { ApiGet } from '../../helper/API/ApiData';
import { useSelector } from 'react-redux';


const Ceoexpert = () => {
    const [ceoData, setCeoData] = useState([])
    const isDark = useSelector((state: any) => state.darkMode.is_dark)

    const getCeoListData = () => {
        ApiGet(`team/get-team-by-user?member_type=CEO`)
            .then((res: any) => {
                setCeoData(res.data.team)
            })
    }

    useEffect(() => {
        getCeoListData()
    }, [])


    return (
        <div className='main-ceoexpert-page'>
            <section className={isDark ? "ceoexpert-section dark-mode-2 bg-remove" : "ceoexpert-section"} >
                <Container className='main-choose-box'>
                    <div className="sec-title2 text-center mb-45 mb-5"  >
                        <span className="sub-text gold-color">Expert IT Consultants</span>
                        <div className="heading-line"></div>
                        {/* <h2 className="title">
                                Why Choose Codexive
                            </h2> */}
                    </div>
                    <Row>
                        {ceoData && ceoData.map((data: any, index: number) => {
                            return (

                                <Col md={4} >
                                    <div className="team-item-wrap">
                                        <div className="team-wrap">
                                            <div className="image-inner">
                                                {/* <img src={data.image} alt="" /> */}
                                                <img
                                                    src={data?.image === "" ? "../../img/stock/profile.png" : data?.image}
                                                    onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/stock/profile.png" }}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="team-content text-center">
                                            <h4 className="person-name">{data.name}</h4>
                                            <span className="designation">{data.skill}</span>

                                        </div>
                                    </div>
                                </Col>


                            )
                        })}
                    </Row>
                </Container>

            </section>


        </div>
    )
}

export default Ceoexpert
