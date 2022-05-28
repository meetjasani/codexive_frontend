import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Slider from "react-slick";
import { ApiGetNoAuth } from '../../helper/API/ApiData';
import { useSelector } from 'react-redux'


function BlogContent() {
    const isDark = useSelector((state: any) => state.darkMode.is_dark)
    const location = useLocation()
    const settings = {
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const [content, setContent] = useState<any>()
    const [recentPost, setRecentPost] = useState<any>()


    const getBlogsData = () => {
        ApiGetNoAuth('blog/get-blogs-by-user')
            .then((res: any) => {
                setRecentPost(res.data &&
                    res.data.map((da: any, index: number) => {
                        if (index <= 3) {
                            return da
                        } else {
                            return
                        }
                    })
                )
            })
            .catch((error) => {

            })
    }

    useEffect(() => {
        setContent(location.state)
        getBlogsData()
    }, [location])


    return (
        <div className={isDark ? "our-portfolio-page dark-mode bg-remove" : "our-portfolio-page"}>
            <div className='bg-round'>
                <img
                    src="./img/round.png"
                    alt=""

                />
            </div>
            <Container>
                <div className='portfolio-head'>
                    <h3>Our Blog title</h3>
                    {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
                </div>
                {/* {console.log("co", content)} */}
                <div className='blogcontent-middle-content'>

                    <Row className='Blog-mainctn'>
                        <Col md={8} className='blogcontent-silder'>

                            <Slider {...settings}>
                                {content && content.image.map((data: any) => (
                                    <div className='blog-slider' >
                                        {/* <img src={data} /> */}
                                        <img
                                            src={data === "" ? "../../img/shape4.png" : data}
                                            onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/shape4.png" }}
                                            alt=""
                                        />
                                    </div>
                                ))}
                            </Slider>

                            <div className='blog-content'>
                                <h3 >{content && content?.title}</h3>
                                <h4 > <span> Technologic : </span> {content && content?.technologies}</h4>
                                <p >{content && content?.details}</p>
                            </div>

                        </Col>
                        <Col md={4} className='blogctn-details'>
                            <div className='blog-recentpost-ctn'>
                                <span className='recent-title'> Recent Post </span>
                            </div>
                            <div className='blogrecent-details'>
                                {recentPost && recentPost.map((item: any) => (
                                    < div className='blogContent-recent-ctn' >
                                        <ul>
                                            <li>
                                                <a href='#'>
                                                    {/* <img src={item.image[0]} /> */}
                                                    <img
                                                        src={item.image[0] === "" ? "../../img/shape4.png" : item.image[0]}
                                                        onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/shape4.png" }}
                                                        alt=""
                                                    />
                                                    <div className='blogctn'>
                                                        <span className='recent-ctn' >{item?.title}</span>
                                                        <span className='recent-date'>{item?.create_date}</span>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                ))
                                }

                            </div>
                            <div className='blog-post-categories' >
                                <span className='post-title'> Post Categories </span>
                            </div>
                            <div className='blog-postcategories-link'>
                                <ul>
                                    <li ><a href='#' className='digital-blog'><span>Digital Marketing (5)</span> </a></li>
                                    <li ><a href='#' className='digital-blog'><span>Ecommerce (3) </span></a></li>
                                    <li ><a href='#' className='digital-blog'><span>General  (10)</span></a></li>
                                    <li ><a href='#' className='digital-blog'><span>Mobile Application (6)</span></a></li>
                                    <li ><a href='#' className='digital-blog'><span>Web Development (1)</span></a></li>
                                    <li ><a href='#' className='digital-blog'><span>Web Scraping (8)</span></a></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </div>



            </Container >
        </div >
    )
}

export default BlogContent
