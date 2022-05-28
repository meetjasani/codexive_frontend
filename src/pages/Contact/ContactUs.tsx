import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPhoneAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { ApiGet, ApiPost } from '../../helper/API/ApiData'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'



interface Contect {
    location: string,
    contact_no: string,
    email: string,
    opening_time: string
}

const ContactUs = () => {
    const history = useHistory();
    const isDark = useSelector((state: any) => state.darkMode.is_dark);
    const [contactusData, setContactusData] = useState({
        id: "",
        first_name: "",
        email: "",
        phone_no: "",
        website: "",
        message: ""
    })
    const [contectDetail, setContectDetail] = useState<Contect>({
        location: "",
        contact_no: "",
        email: "",
        opening_time: ""
    })

    useEffect(() => {
        getContectData()
    }, [])

    const getContectData = () => {
        ApiGet(`home/get-footer-section`)
            .then((res: any) => {
                if (Object.keys(res.data).length === 0) {
                    setContectDetail({
                        location: "",
                        contact_no: "",
                        email: "",
                        opening_time: ""
                    })
                } else {
                    setContectDetail(res.data?.contactInfo)
                }
            })
    }

    const handleChange = (e: any) => {
        setContactusData({
            ...contactusData,
            [e.target.name]: e.target.value
        })
    }

    const Save = (e: any) => {
        e.preventDefault();
        const body = {
            first_name: contactusData.first_name,
            email: contactusData.email,
            phone_no: contactusData.phone_no,
            website: contactusData.website,
            message: contactusData.message
        }
        ApiPost(`general/add-contect-us`, body)
            .then((res: any) => {
                
                console.log("contactus", res);
                setContactusData({
                id: "",
                first_name: "",
                email: "",
                phone_no: "",
                website: "",
                message: ""
            })
                // setContactusData();
                // history.push('/contactus')
            })
    }
    return (
        <div className={isDark ? "our-portfolio-page dark-mode bg-remove" : "our-portfolio-page"}>
            <div className='bg-round'>
                <img
                    src="./img/round.png"
                    alt=""

                />
            </div>
            <Container className='comain-content'>
                <div className='portfolio-head' >
                    <h3>Contact Us</h3>
                    {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
                </div>

                <div className='corow-content'>
                    <Row>
                        <Col md={4}  >
                            <div className='Contact-sour' >
                                <div
                                    className='contact-details-box'
                                >
                                    <span> Let's Talk </span>
                                    <h2 className='contact-detail-title'>Speak With Expert Engineers.</h2>
                                </div>
                                <br/>
                                <div className='main-contact-ctn'>
                                    <div className='cus-contact'>
                                        <div className='main-home-contact'>
                                            <div className='home'
                                            >
                                                <FontAwesomeIcon icon={faHome} className='contact-home' />
                                            </div>
                                            <div className='contact-email-ctn' >
                                                <span> email : </span>
                                                <a href='#' className='email-box'> {contectDetail?.email} </a>
                                            </div>
                                        </div>
                                        <div className='main-contact-phonealt'>
                                            <div className='phonealt' >
                                                <FontAwesomeIcon icon={faPhoneAlt} className='contact-phonealt' />
                                            </div>
                                            <div className='contact-phone-ctn' >
                                                <span> Phone : </span>
                                                <a href='#'> {contectDetail?.contact_no} </a>
                                            </div>
                                        </div>
                                        <div className='main-location-ctn'>
                                            <div className='mapmarker' >
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className='contact-mapmarker' />
                                            </div>
                                            <div className='contact-mapmarker-ctn' >
                                                <span> Address : </span>
                                                <p> {contectDetail?.location} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={8} >
                            <Form className="contact-form">
                                <h1

                                > Fil The Form Below </h1>
                                <div className='row contact-ctn'>
                                    <div className='col' >
                                        <input
                                            name="first_name"
                                            type="text"
                                            className="form-control"
                                            placeholder="First name"
                                            aria-label="First name"
                                            value={contactusData.first_name}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='col'>
                                        <input
                                            name="email"
                                            type="text"
                                            className="form-control"
                                            placeholder="Your Email"
                                            value={contactusData.email}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className='row contact-ctn'>
                                    <div className='col' >
                                        <input
                                            name="phone_no"
                                            type="phone"
                                            className="form-control"
                                            placeholder="Your Phone"
                                            value={contactusData.phone_no}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='col'>
                                        <input
                                            name="website"
                                            type="text"
                                            className="form-control"
                                            placeholder="Your Website"
                                            value={contactusData.website}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className='contact-ctn' >
                                    <textarea
                                        name="message"
                                        className="form-control"
                                        placeholder='Type Your Message'
                                        value={contactusData.message}
                                    onChange={(e) => handleChange(e)}
                                    ></textarea>
                                </div>
                                <div className='contact-btn contact-ctn' >
                                    <Button type='submit' className='con-submitbtn' onClick={Save}> Submit </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>

            </Container>
            <div >
                <iframe
                    className='pc-iframe-sec'
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.5487497853105!2d72.84745375076416!3d21.210077686869756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f2fd3e0c681%3A0x6e91a2940224bd39!2sCodexive%20Solutions!5e0!3m2!1sen!2sin!4v1640067435984!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}

                />
            </div>
        </div>
    )
}
export default ContactUs
