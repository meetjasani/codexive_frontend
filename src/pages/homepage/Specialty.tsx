import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ApiGetNoAuth } from '../../helper/API/ApiData'
import Howwork from './Howwork'
import { useSelector } from 'react-redux'


const Specialty = () => {
    const [homeData, setHomeData] = useState<any>()
    const isDark = useSelector((state: any) => state.darkMode.is_dark)

    useEffect(() => {
        ApiGetNoAuth('home/get-allHome-section')
            .then((res: any) => {
                setHomeData(res?.data)
            })
    }, [])

    return (
        <div className='main-specialty-page'>
            <section className={isDark ? "specialty-section dark-mode" : "specialty-section"} >
                <Container>
                    <Row>
                        <Col md={6} >
                            <Row>
                                {
                                    homeData?.specialitySection?.left_menu?.map((data: any, index: any) => {
                                        return (
                                            <>
                                                {
                                                    index % 2 == 0 ?
                                                        <Col md={6} className='pc-top-section'   >
                                                            <div className="icon-box-area mb-20" style={{ background: `linear-gradient(90deg, ${data.gradientColor}  41%, ${data.color} 100%)` }}>
                                                                <div className="box-inner">
                                                                    <div className="icon-area">
                                                                        <a href="#">
                                                                            <img src={data.image} alt="" />
                                                                            <img
                                                                                src={data?.image === "" ? "../../img/1.png" : data?.image}
                                                                                onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/1.png" }}
                                                                                alt=""
                                                                            />
                                                                        </a>
                                                                    </div>
                                                                    <div className="content-part">
                                                                        <h4 className="title"><a href="#">{data?.title}</a></h4>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Col>

                                                        :
                                                        <Col md={6} >
                                                            {/* </div> > */}
                                                            <div className="icon-box-area" style={{ background: `linear-gradient(90deg, ${data.gradientColor}  41%, ${data.color} 100%)` }}>
                                                                <div className="box-inner">
                                                                    <div className="icon-area" >
                                                                        <a href="#">
                                                                            {/* <img src={data.image} alt="" /> */}
                                                                            <img
                                                                                src={data?.image === "" ? "../../img/2.png" : data?.image}
                                                                                onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/2.png" }}
                                                                                alt=""
                                                                            />
                                                                        </a>
                                                                    </div>
                                                                    <div className="content-part">
                                                                        <h4 className="title"><a href="#">{data?.title}</a></h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>

                                                }

                                            </>
                                        )
                                    })
                                }
                            </Row>


                        </Col>

                        <Col md={6} className="pl-55"  >
                            <div className="sec-title6 mb-30">

                                <h2 className="title pb-20" >
                                    {homeData?.specialitySection?.main_title}
                                </h2>
                                <div className="desc">
                                    {homeData?.specialitySection?.details}
                                </div>
                            </div>

                            <div className="rs-skillbar style1 modify3" >
                                <div className="cl-skill-bar">

                                    {
                                        homeData?.specialitySection?.right_menu?.map((data: any) => {
                                            return (
                                                <>
                                                    <span className="skillbar-title">{data?.statistics}</span>
                                                    <div className="skillbar" data-percent={data.percentage} style={{ borderColor: data.color }}>
                                                        <p className="skillbar-bar" style={{ width: `${data.percentage}%`, background: data.color }} ></p>
                                                        <span className="skill-bar-percent">{data?.percentage}%</span>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </section >


        </div >
    )
}

export default Specialty
