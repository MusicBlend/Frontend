import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import {SpotifyLogin} from "./Login/SpotifyLogin";
import {SpotifyResponse} from "./Login/SpotifyResponse";
import {Home} from "./Home/Home";


function App() {
  return (
    <Layout>
      <Router>
          <Route exact path='/' component={Home} />
          <Route exact path='/spotifylogin' component={SpotifyLogin} />
          <Route exact path='/callback' component={SpotifyResponse} />
      </Router>    
    </Layout>
  );
}

export default App;
