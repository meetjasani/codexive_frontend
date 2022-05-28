
import { Route, Switch } from 'react-router'
import Layout from '../layout/Layout'
import Pages from "../pages";

const Routes = () => {

  return (
    <Switch>
      {/* <Route path="/error" component={Error} /> */}

      {/* <Layout> */}
      <Pages />
      {/* </Layout> */}
    </Switch>
  )
}

export default Routes

