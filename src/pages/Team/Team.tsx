import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { ApiGet } from '../../helper/API/ApiData';
import { useSelector } from 'react-redux'

const Team = () => {

    const [teamData, setTeamData] = useState([])
    const isDark = useSelector((state: any) => state.darkMode.is_dark)


    const getTeamListData = () => {
        ApiGet(`team/get-team-by-user?member_type=DEVELOPER`)
            .then((res: any) => {
                console.log("****", res);
                setTeamData(res.data.team)
            })
    }

    useEffect(() => {
        getTeamListData()
    }, [])
    return (
        <div className={isDark ? "our-team-page dark-mode bg-remove" : "our-team-page"}>
            <div className='bg-round' >
                <img
                    src="./img/bg-round.png"
                    alt=""

                />
            </div>
            <Container>
                <div className='our-team-head' >
                    <h3>Team Members</h3>
                    {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
                </div>

                <div className='single-portfolio-middle-content'>
                    <Row>
                        {teamData && teamData?.map((data: any, index: number) => {
                            // {teamData && teamData.map((data: any, index: number) => {
                            return (
                                <Col md={4}>
                                    <div className="team-item-wrap">
                                        <div className="team-wrap">
                                            <div className="image-inner" >

                                                {/* <img src={data?.image} alt="" /> */}
                                                <img
                                                    src={data?.image === "" ? "../../img/stock/profile.png" : data?.image}
                                                    onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/stock/profile.png" }}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="team-content text-center">
                                            <h4 className="person-name">{data?.name}</h4>
                                            <span className="designation">{data?.skill}</span>

                                        </div>
                                    </div>
                                </Col>
                            )
                        })}


                    </Row>
                </div>

            </Container >
        </div >
    )
}

export default Team
