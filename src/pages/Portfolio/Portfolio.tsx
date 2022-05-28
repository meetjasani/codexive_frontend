import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
// import Slider from "react-slick";
import { useHistory } from 'react-router-dom'
import PortfolioReact from './PortfolioReact';
import { IPortfolio } from '../types/protfolio'
import { ApiGetNoAuth } from '../../helper/API/ApiData';
import { TechnologieEnum } from '../../helper/Constant';
import { useSelector } from 'react-redux';


function Protfolio() {
  const history = useHistory();
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [technologyTabArr, setTechnologyTabArr] = useState<any[]>([]);
  const [portfolioData, setPortfolioData] = useState<any[]>([]);
  const isDark = useSelector((state: any) => state.darkMode.is_dark)

  const getTechnologyCategory = () => {
    ApiGetNoAuth(`category/categoryDropDownByParent/${TechnologieEnum}`)
      .then((res: any) => {

        if (res.data) {
          let arr: any[] = []
          res.data.map((da: any) => {
            arr.push({
              category: da.category,
              id: da.id
            })
          })
          setTechnologyTabArr(arr)
        }
      })
  }

  const getTabData = (tabId: any) => {
    ApiGetNoAuth(`portfolio/get-company-portfolio-by-user/${tabId}`)
      .then((res: any) => {
        setPortfolioData(res.data ? res.data : [])
      })

  }

  useEffect(() => {
    getTechnologyCategory()
    getTabData("All")
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
          <h3>Our Portfolio</h3>
          {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
        </div>

        <div className=' portfolio-tab-ctn '>
          <Tabs
            id="controlled-tab-example"
            className="mb-3 all-tab"

            onSelect={(tabID: any) => getTabData(tabID)}
          >

            <Tab eventKey="All" title="All">
              <div className='portfolio-middle-content'>
                <Row>
                  <PortfolioReact portfolio={portfolioData} filter='All' />
                </Row>
              </div>
            </Tab>

            {technologyTabArr && technologyTabArr.map((da: any) =>
              <Tab eventKey={da.id} title={da.category}  >
                <div className='portfolio-middle-content' >
                  <Row>
                    <PortfolioReact portfolio={portfolioData} filter='ReactJs' />
                  </Row>
                </div>
              </Tab>

            )}

          </Tabs>


        </div>
      </Container>
    </div>
  )
}

export default Protfolio
