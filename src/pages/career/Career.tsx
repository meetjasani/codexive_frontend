import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap'
import { faCheckCircle, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';


interface Career {
    discription: string,
    key_point: [],
    let_s_talk: string,
}

interface Contect {
    location: string,
    contact_no: string,
    email: string,
    opening_time: string
}

const Career = () => {
    const isDark = useSelector((state: any) => state.darkMode.is_dark)
    const [careerDataList, setCareerDataList] = useState([])
    const [selectedFile, setSelectedFile] = useState<File>();
    const [imgSrc, setImgSrc] = useState("");
    const [appointmentData, setAppointmentData] = useState({
        id: "",
        first_name: "",
        last_name: "",
        career_requirement: "",
        experiance: "",
        current_company: "",
        resume: ""
    })
    const [careerData, setCareerData] = useState<Career>({
        discription: "",
        key_point: [],
        let_s_talk: ""
    })
    const [contectDetail, setContectDetail] = useState<Contect>({
        location: "",
        contact_no: "",
        email: "",
        opening_time: ""
    })

    const getDataById = () => {
        ApiGet(`general/get-career-setting`)
            .then((res: any) => {
                if (Object.keys(res.data).length === 0) {
                    setCareerData({
                        discription: "",
                        key_point: [],
                        let_s_talk: ""
                    })
                } else {
                    setCareerData(res.data)
                }
            })
    }

    const getContectData = () => {
        ApiGet(`home/get-footer-section`)
            .then((res: any) => {
                console.log("res", res);

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

    useEffect(() => {
        getDataById()
        getContectData()
    }, [])

    const getCareerListData = () => {
        ApiGet(`career/get-career-requirement-by-user`)
            .then((res: any) => {
                setCareerDataList(res?.data?.careerRequirement)
            })
    }

    useEffect(() => {
        getCareerListData()
    }, [])

    const handleChange = (e: any) => {
        setAppointmentData({
            ...appointmentData,
            [e.target.name]: e.target.value
        })
    }

    const SaveResume = () => {
        const body = {
            first_name: appointmentData.first_name,
            last_name: appointmentData.last_name,
            career_requirement: appointmentData.career_requirement,
            experiance: appointmentData.experiance,
            current_company: appointmentData.current_company,
            resume: appointmentData.resume
        }
        ApiPost(`career/add-career-request`, body)
            .then((res: any) => {
                console.log("111", res);
                setAppointmentData({
                    id: "",
                    first_name: "",
                    last_name: "",
                    career_requirement: "",
                    experiance: "",
                    current_company: "",
                    resume: ""
                })
            })
    }

    // useEffect(() => {
    //     if (!selectedFile) {
    //         return;
    //     }
    //     const objectUrl = URL.createObjectURL(selectedFile);
    //     setImageName(objectUrl);
    //     setAppointmentData({ ...appointmentData, resume: selectedFile.name })
    //     // appointmentData.resume = objectUrl;

    //     return () => URL.revokeObjectURL(objectUrl);
    // }, [selectedFile]);


    // const uploadImage = () => {
    //     let formData = new FormData();

    //     if (selectedFile) {
    //         formData.append('image', selectedFile);
    //         ApiPost("file-and-image-upload", formData)
    //             .then((res: any) => {
    //                 setImgSrc(res.display_url)
    //                 setAppointmentData({ ...appointmentData, resume: res.url })
    //                 // setSelectedFile(undefined)
    //             }).catch((error) => {
    //                 console.log("error", error);
    //             })
    //     }
    // }

    const uploadImage = () => {
        let formData = new FormData();

        if (selectedFile) {
            formData.append('image', selectedFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    setImgSrc(res.display_url)
                    setAppointmentData({ ...appointmentData, resume: res.url })
                }).catch((error) => {
                    console.log("error", error);
                })
        }
    }

    useEffect(() => {
        if (selectedFile) {
            uploadImage()
        }
    }, [selectedFile])

    const attechImage = (type: string) => {
        document.getElementById("attechImage")?.click();
    };


    return (
        <div className={isDark ? "main-career-page dark-mode bg-remove" : "main-career-page"} >
            <section className='career-section'>
                <div className='bg-round'>
                    <img
                        src="./img/bg-round.png"
                        alt=""

                    />
                </div>
                <Container>
                    <div className='portfolio-head' >
                        <h3>Our Career</h3>
                    </div>
                    <Row>
                        <Col md={6}>

                            <div className="career-img" >
                                <img src='./img/New Projectaa.png' />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="sec-title mb-30">

                                <h2 className="title " >
                                    Benefit to Join Our Team
                                </h2>
                                <div className="desc ">
                                    {careerData && careerData?.discription}
                                </div>
                                <div className='benefit-text'
                                >
                                    <ul>
                                        {careerData && careerData?.key_point.map((key: string, index: number) => (
                                            <li>
                                                <i><FontAwesomeIcon icon={faCheckCircle} className="fafaicons" /></i>
                                                <span>{key}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className={isDark ? "pc-tab-section our-req-sec dark-mode-2 bg-remove" : "pc-tab-section our-req-sec"}>
                <div className="sec-title2 text-center mb-45" >
                    <h2 className="title our-req-title" >
                        Our Requirment
                    </h2>
                </div>
                <Container >

                    <Row className='req-header' >

                        <Col md={3} className='tab-header'>

                            <h5>Position</h5>

                        </Col>
                        <Col md={3} className='tab-header'>
                            <h5>Experiance</h5>

                        </Col>
                        <Col md={3} className='tab-header'>
                            <h5>Requirement</h5>

                        </Col>
                        <Col md={3} className='tab-header text-center '>
                            <h5>Apply Now</h5>

                        </Col>

                    </Row>

                    {careerDataList && careerDataList?.map((data: any, index: number) => {
                        return (
                            <div className='main-content-table'>
                                <Row className='pt-2 pb-2 tab-content-border align-items-center'>


                                    <Col md={3} className='req-tab-content'>
                                        <h5>{data?.position}</h5>

                                    </Col>
                                    <Col md={3} className='req-tab-content  align-items-center'>
                                        <h5>{data?.experience}</h5>

                                    </Col>
                                    <Col md={3} className='req-tab-content align-items-center'>
                                        <h5>{data?.requirement}</h5>

                                    </Col>
                                    <Col md={3} className='req-tab-content text-center align-items-center'>
                                        <a href='#formapply' className='pc-apply-now' >Apply</a>
                                        {/* <a className="action-link see-details-link" onClick={() => { history.push(`/addcareerreq?id=${row.id}`) }}> Edit</a>
                                        <Button className="pc-apply-now" onClick={apply}>Apply</Button> */}
                                    </Col>

                                </Row>

                            </div>
                        )
                    })}
                </Container>
            </section>

            <section className="pc-margin-section pc-tab">
                <Container>
                    <Row>
                        <Col md={6} className='pc-main-row-section'>
                            <div className="pc-sec-title mb-40">
                                <div className="sub-text">Let's Talk</div>
                                <h2 className="title">
                                    Speak With Expert Engineers.
                                </h2>
                                <div className="desc">
                                    {ReactHtmlParser(careerData && careerData?.let_s_talk)}
                                </div>
                            </div>

                            <div className="services-wrap mb-25">
                                <div className="services-icon" >
                                    <img src="./img/style2/1.png" alt="" />
                                </div>
                                <div className="services-text">
                                    <h3 className="title"><a href="#">Email</a></h3>
                                    <p className="services-txt">{contectDetail?.email}</p>
                                </div>
                            </div>

                            <div className="services-wrap mb-25">
                                <div className="services-icon" >
                                    <img src="./img/style2/2.png" alt="" />
                                </div>
                                <div className="services-text" >
                                    <h3 className="title"><a href="#">Call Us</a></h3>
                                    <p className="services-txt"> {contectDetail?.contact_no}</p>
                                </div>
                            </div>

                            <div className="services-wrap mb-25">
                                <div className="services-icon" >
                                    <img src="./img/style2/3.png" alt="" />
                                </div>
                                <div className="services-text" >
                                    <h3 className="title"><a href="#">Office Address</a></h3>
                                    <p className="services-txt">{contectDetail?.location}</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='pc-contact-form ' id="formapply">
                                <div className="contact-wrap">
                                    <div className="content-part mb-25">
                                        <h2 className="title mb-15">Schedule Appointment</h2>
                                    </div>
                                    <div id="form-messages"></div>

                                    <form id="contact-form" method="post" action="">
                                        <fieldset>
                                            <Row>
                                                <Col md={6}>
                                                    <input
                                                        className="from-control pc-form-control-sec"
                                                        type="text"
                                                        name="first_name"
                                                        placeholder="First-Name"
                                                        value={appointmentData.first_name}
                                                        onChange={(e) => handleChange(e)}
                                                    />

                                                </Col>
                                                <Col md={6}>
                                                    <input
                                                        className="from-control"
                                                        type="text"
                                                        name="last_name"
                                                        placeholder="last-Name"
                                                        value={appointmentData.last_name}
                                                        onChange={(e) => handleChange(e)}
                                                    />

                                                </Col>
                                            </Row>
                                            {/* <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    Position
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className='pc-dropdown-menu'>
                                                    <Dropdown.Item href="#/action-1">React.js Frontend Developer </Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Node.js Frontend Developer</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Web Designer and Graphics Designer</Dropdown.Item>
                                                </Dropdown.Menu>
                                               
                                            </Dropdown> */}
                                            <Dropdown className='w-100'>
                                                <Dropdown.Toggle variant="success " id="dropdown-basic">
                                                    <select
                                                        id="team"
                                                        className='pmselect-input'
                                                        name="member_type"
                                                        value={appointmentData.career_requirement}
                                                        onChange={(e) => setAppointmentData({
                                                            ...appointmentData,
                                                            career_requirement: e.target.value
                                                        })}>
                                                        <option value="">Select</option>
                                                        {careerDataList && careerDataList.map((x: any) => {
                                                            return (
                                                                <option value={x.id}>{x.position}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </Dropdown.Toggle>
                                            </Dropdown>
                                            <Row className='pc-mt-30'>
                                                <Col md={6}>
                                                    <input
                                                        className="from-control pc-form-control-sec"
                                                        type="text"
                                                        name="experiance"
                                                        placeholder="Experience"
                                                        value={appointmentData.experiance}
                                                        onChange={(e) => handleChange(e)}
                                                    />

                                                </Col>
                                                <Col md={6}>
                                                    <input className="from-control"
                                                        type="text"
                                                        name="current_company"
                                                        placeholder="Current Company"
                                                        value={appointmentData.current_company}
                                                        onChange={(e) => handleChange(e)}
                                                    />

                                                </Col>
                                            </Row>

                                            {/* <Form.Group controlId="formFileLg" className="mb-3">
                                                <Form.Label>Upload Resume</Form.Label>
                                                <Form.Control type="file" size="lg" />
                                            </Form.Group> */}
                                            <Form.Group controlId="formFileLg" className="mb-3  input-back">
                                                <Form.Label onClick={() => attechImage("image")}>Upload Resume</Form.Label>
                                                <Row className='pc-mt-0'>
                                                    <Col md={6} className='p-0'>
                                                        <input
                                                            id="attechImage"
                                                            type="file"
                                                            // hidden
                                                            // src={imageName}
                                                            src={imgSrc}
                                                            onChange={(e: any) => {
                                                                if (!e.target.files || e.target.files.length === 0) {
                                                                    setSelectedFile(undefined);
                                                                    return;
                                                                }
                                                                setSelectedFile(e.target.files[0]);
                                                                // setAppointmentData(e.target.files[0]);
                                                            }}
                                                            alt="img"
                                                            accept="*"
                                                            className="login-input"
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <Button className="pc-main-btn-resume" onClick={SaveResume}>Submit Resume</Button>

                                        </fieldset>
                                    </form>

                                </div>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </section>
        </div >
    )
}

export default Career
