import React, { useEffect } from 'react'
import { Route, Switch, useHistory, Redirect } from 'react-router'
import Layout from '../layout/Layout'
import Homepage from './homepage/Homepage'
import Portfolio from './Portfolio/Portfolio'
import Blog from './Blog/Blog'
import BlogContent from './Blog/BlogContent'
import SinglePortfolio from './Portfolio/SinglePortfolio'
import Team from './Team/Team'
import Testimonial from './Testimonial/Testimonial'
import ContactUs from './Contact/ContactUs'
import Career from './career/Career'
import Aboutus from './About us/Aboutus'
import ServicesDetail from './Service/ServicesDetail'
import Faq from './Faq/Faq';
import TermAndCondition from './TermAndCondition/TermAndCondition';

import { useLocation } from 'react-router';
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';
import Services from './Service/Services'
import MainservicesDetail from './Service/MainservicesDetail';
import Auth from '../config/Auth'
import { ApiGet, ApiGetNoAuth } from '../helper/API/ApiData'
import LogRegLayout from '../layout/LogRegLayout'
import AdminLayout from '../layout/AdminLayout'
import ProjectView from './projectview/ProjectView'
import Home from './home/Home'
import Category from './category/Category'
import AllTech from './allTech/allTech'
import AddTech from './allTech/AddTech'
import AddCategory from './category/AddCategory'
import BlogRegistration from './blogAdmin/BlogRegistration'
import UserManagement from './users/UserManagement'
import UserRegistration from './users/UserRegistration'
import PortfolioAdmin from './portfolioAdmin/Portfolio'
import AddPortfolio from './portfolioAdmin/AddPortfolio'
import TeamMember from './teammember/TeamMember'
import EditTeamMember from './teammember/EditTeamMember'
import CareerReq from './careerreq/CareerReq'
import AddCareerReq from './careerreq/AddCareerReq'
import Setting from './setting/Setting'
import FaqAdmin from './faqAdmin/Faq'
import CreateFaq from './faqAdmin/CreateFaq'
import TermsCondition from './terms and condition/TermsCondition'
import PrivacyPolicyAdmin from './privacyPolicyAdmin/PrivacyPolicy'
import AddTermsCondition from './terms and condition/AddTermsCondition'
import TestimonialAdmin from './testimonialAdmin/Testimonial'
import TestimonialManagement from './testimonialAdmin/TestimonialManagement'
import ServicesAdmin from './services/services'
import ServicesDetails from './servicesDetails/ServicesDetails'
import AddService from './services/addService'
import OurClient from './ourClient/OurClient'
import ClientList from './ourClient/ClientList'
import Dashboard from './dashboard/Dashboard'
import AddClient from './ourClient/AddClient'
import Login from './Login/Login'
import AuthStorage from '../helper/AuthStorage'
import BlogAdmin from './blogAdmin/Blog'
import Coming from './Coming'

const Index = () => {
    const location = useLocation()

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [location])

    const history = useHistory();

    useEffect(() => {
        if (location.pathname.split("/")[1] == "admin") {
            if (Auth.isUserAuthenticated()) {
                ApiGet('admin/validate')
                    .then((res) => {
                        // history.push("/dashboard");
                    })
                    .catch((error) => {
                        history.push("/admin")
                    })
            } else {
                history.push("/admin");
            }
        } else {
            ApiGetNoAuth(`general/get-maintenance`)
                .then((res: any) => {
                    if (res.data.maintenance) {
                        history.push("/coming");

                    } else {
                        history.push("/");

                    }
                })
        }

    }, [])

    return (
        <>
            <Switch>
                <Route
                    exact
                    path={[
                        "/",
                        "/coming",
                        "/portfolio",
                        "/blog",
                        "/blogcontent",
                        "/portfoliodetails",
                        "/team",
                        "/testimonial",
                        "/contactus",
                        "/career",
                        "/aboutus",
                        "/services/:id",
                        "/services",
                        "/mainServices/:name",
                        "/faq",
                        "/termAndCondition",
                        "/privacyPolicy"
                    ]}
                >
                    <Switch>
                        <RouteWrapper exact={true} path="/coming" component={Coming} layout={Layout} isPrivateRoute={false} />
                        <RouteWrapper exact={true} path="/" component={Homepage} layout={Layout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/portfolio" component={Portfolio} layout={Layout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/blog" component={Blog} layout={Layout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/blogcontent" component={BlogContent} layout={Layout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/portfoliodetails" component={SinglePortfolio} layout={Layout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/team" component={Team} layout={Layout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/testimonial" component={Testimonial} layout={Layout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/contactus" component={ContactUs} layout={Layout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/career" component={Career} layout={Layout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/aboutus" component={Aboutus} layout={Layout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/services/:id" component={ServicesDetail} layout={Layout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/services" component={Services} layout={Layout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/mainServices/:name" component={MainservicesDetail} layout={Layout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/faq" component={Faq} layout={Layout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/termAndCondition" component={TermAndCondition} layout={Layout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/privacyPolicy" component={PrivacyPolicy} layout={Layout} isPrivateRoute={true} />
                    </Switch>
                </Route>



                <Route
                    exact
                    path={[
                        "/admin",
                        "/admin/projectreq",
                        "/admin/home",
                        "/admin/category_list",
                        "/admin/tech_list",
                        "/admin/add_tech",
                        "/admin/add_category",
                        "/admin/blog",
                        "/admin/blog_registration",
                        "/admin/users_list",
                        "/admin/user",
                        "/admin/portfolio",
                        "/admin/add_portfolio",
                        "/admin/teammembers",
                        "/admin/editteammember",
                        "/admin/careereq",
                        "/admin/addcareerreq",
                        "/admin/setting",
                        "/admin/faq",
                        "/admin/create_faq",
                        "/admin/terms",
                        "/admin/policy",
                        "/admin/addtermscondition",
                        "/admin/addtermscondition",
                        "/admin/testimonial",
                        "/admin/testimonial_registration",
                        "/admin/services",
                        "/admin/servicesDetail",
                        "/admin/add_services",
                        "/admin/client",
                        "/admin/clientList",
                        "/admin/add_client",
                    ]}
                >
                    <Switch>
                        <RouteWrapper exact={true} path="/admin/projectreq" component={ProjectView} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/home" component={Home} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/category_list" component={Category} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/tech_list" component={AllTech} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/add_tech" component={AddTech} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/add_category" component={AddCategory} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/blog" component={BlogAdmin} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/blog_registration" component={BlogRegistration} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/users_list" component={UserManagement} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/user" component={UserRegistration} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/portfolio" component={PortfolioAdmin} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/add_portfolio" component={AddPortfolio} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/teammembers" component={TeamMember} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/editteammember" component={EditTeamMember} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/careereq" component={CareerReq} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/addcareerreq" component={AddCareerReq} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/setting" component={Setting} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/faq" component={FaqAdmin} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/create_faq" component={CreateFaq} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/terms" component={TermsCondition} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/policy" component={PrivacyPolicyAdmin} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/addtermscondition" component={AddTermsCondition} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/testimonial" component={TestimonialAdmin} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/testimonial_registration" component={TestimonialManagement} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/services" component={ServicesAdmin} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/servicesDetail" component={ServicesDetails} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/add_services" component={AddService} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/client" component={OurClient} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/clientList" component={ClientList} layout={AdminLayout} isPrivateRoute={true} />
                        <RouteWrapper exact={true} path="/admin/add_client" component={AddClient} layout={AdminLayout} isPrivateRoute={true} />

                        {Auth.isUserAuthenticated() ?
                            <div>
                                <RouteWrapper exact={true} path="/admin" component={Home} layout={AdminLayout} isPrivateRoute={true} />
                            </div>
                            :
                            <RouteWrapper exact={true} path="/admin" component={Login} layout={LogRegLayout} isPrivateRoute={false} />
                        }

                    </Switch>
                </Route>

            </Switch>

        </>
    )
}

export default Index


interface RouteWrapperProps {
    component: any;
    layout: any;
    exact: boolean;
    path: string;
    isPrivateRoute: boolean;
}

function RouteWrapper({
    component: Component,
    layout: Layout,
    isPrivateRoute,
    ...rest
}: RouteWrapperProps) {
    const history = useHistory();
    const isAuthenticated: boolean = isPrivateRoute
        ? AuthStorage.isUserAuthenticated()
        : true;
    // return (
    //     <>
    //         {isAuthenticated ? (
    //             <Route {...rest} render={(props) => <Layout> <Component {...props} />  </Layout>} />
    //         ) : (
    //             history.push("/")
    //         )}
    //     </>
    // );

    return (
        <>
            <Route {...rest} render={(props) =>
                <Layout>
                    <Component {...props} />
                </Layout>
            } />
        </>
    );
}

// import React, { useEffect } from 'react'
// import { Route, Switch, useHistory, Redirect } from 'react-router'
// import Auth from '../config/Auth'
// import { ApiGet } from '../helper/API/ApiData'
// import Layouts from '../layouts/Layouts'
// import LogRegLayout from '../layouts/LogRegLayout'

// import Dashboard from './dashboard/Dashboard'
// import Login from './Login/Login'

// const Index = () => {
//     const history = useHistory();

//     useEffect(() => {
//         if (Auth.isUserAuthenticated()) {
//             ApiGet('admin/validate')
//                 .then((res) => {
//                     // history.push("/dashboard");
//                 })
//                 .catch((error) => {
//                     history.push("/")
//                 })
//         } else {
//             history.push("/");
//         }
//     }, [])

//     return (
//         <>
//             <Switch>
//
//                 {Auth.isUserAuthenticated() ?
//                     <RouteWrapper exact={true} path="/" component={Dashboard} layout={Layouts} isPrivateRoute={true} />
//                     :
//                     <RouteWrapper exact={true} path="/" component={Login} layout={LogRegLayout} isPrivateRoute={false} />
//                 }

//                 <Redirect from="*" to="/" />
//             </Switch>

//         </>
//     )
// }

// export default Index;

// interface RouteWrapperProps {
//     component: any;
//     layout: any;
//     exact: boolean;
//     path: string;
//     isPrivateRoute: boolean;
// }

// function RouteWrapper({
//     component: Component,
//     layout: Layout,
//     isPrivateRoute,
//     ...rest
// }: RouteWrapperProps) {

//     const isAuthenticated: boolean = isPrivateRoute ? Auth.isUserAuthenticated() : true;
//     return (
//         <>
//             {isAuthenticated ?
//                 (
//                     <Route {...rest} render={(props) =>
//                         <Layout>

//                                 <Component {...props} />

//                         </Layout>
//                     } />
//                 )
//                 : null
//             }
//         </>
//     );
// }