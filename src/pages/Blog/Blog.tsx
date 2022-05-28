import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Slider from "react-slick";
import { Link } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ApiGet, ApiGetNoAuth } from '../../helper/API/ApiData';
// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/styles.css';


function Blog(props: any) {
  const history = useHistory()
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [content, setContent] = useState([])
  const isDark = useSelector((state: any) => state.darkMode.is_dark)

  const getBlogsData = () => {

    ApiGetNoAuth('blog/get-blogs-by-user')
      .then((res: any) => {
        setContent(res.data)
      })
      .catch((error) => {

      })
  }

  useEffect(() => {
    getBlogsData()
  }, [])

  return (


    <div className={isDark ? "our-portfolio-page dark-mode bg-remove" : "our-portfolio-page"}>
      <div className='bg-round'>
        <img
          src="./img/bg-round.png"
          alt=""

        />
      </div>
      <Container>
        <div className='portfolio-head'>
          <h3 >Our Blog</h3>
          {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
        </div>
        <div className='portfolio-row'>
          {content && content.map((data: any, i: number) => {
            return (
              <div className='single-port-sec' key={"Blog" + i}>
                <Row className='align-items-center'>
                  <Col md={6}>
                    <Slider {...settings}>
                      {data.image.map((item: any) => (
                        <div className='port-slider'
                        >
                          {/* <img src={item} alt="" /> */}
                          <img
                            src={item === "" ? "../../img/shape4.png" : item}
                            onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/shape4.png" }}
                            alt=""
                          />
                        </div>
                      ))}
                    </Slider>
                  </Col>

                  <Col md={6}>
                    <div className='port-content'>
                      <h3>{data.title}</h3>
                      <h4 > <span> Technologic : </span> {data.technologies.replaceAll(",", ", ")}</h4>
                      <p >{data.details}</p>
                      <button onClick={() => history.push("/BlogContent", data)}>View More</button>
                    </div>
                  </Col>
                </Row>
              </div>
            )
          })}
        </div>
      </Container>
    </div>
  )
}

export default Blog
