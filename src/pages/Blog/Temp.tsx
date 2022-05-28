import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'

function Temp() {

    return (
        <div>
            {/* Blog content */}
            <section className='blog-position'>
                <div className='blog-background'></div>
                <div className='blog-heading'>
                    <div className='bloging-ctn-border'></div>
                    <div className='bloging-mainctn'>
                        <h1>Our Blog</h1>
                        <ul>
                            <li>
                                <a href='#'>Home</a>
                            </li>
                            <li>
                                <a href='#'>Blog</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <Container>
                    <Row>
                        <Col md={4}>
                            <div className='card'>
                                <div className='content'>
                                    <div className='blogimg-ctn'>
                                        <img src='https://thumbs.dreamstime.com/b/businessman-sits-workplace-modern-cozy-office-looking-laptop-screen-feels-satisfied-proud-done-work-young-caucasian-men-168835714.jpg' />
                                    </div>
                                    <div className='blogctn-details'>
                                        <h3>card One</h3>
                                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        <a href='#'>Read More</a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className='card'>
                                <div className='content'>
                                    <div className='blogimg-ctn'>
                                        <img src='https://thumbs.dreamstime.com/b/businessman-sits-workplace-modern-cozy-office-looking-laptop-screen-feels-satisfied-proud-done-work-young-caucasian-men-168835714.jpg' />
                                    </div>
                                    <div className='blogctn-details'>
                                        <h3>card One</h3>
                                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        <a href='#'>Read More</a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className='card'>
                                <div className='content'>
                                    <div className='blogimg-ctn'>
                                        <img src='https://thumbs.dreamstime.com/b/businessman-sits-workplace-modern-cozy-office-looking-laptop-screen-feels-satisfied-proud-done-work-young-caucasian-men-168835714.jpg' />
                                    </div>
                                    <div className='blogctn-details'>
                                        <h3>card One</h3>
                                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        <a href='#'>Read More</a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div >
    )
}

export default Temp
