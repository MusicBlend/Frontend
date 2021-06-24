import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import {SpotifyLogin} from "./Login/SpotifyLogin";
import {SpotifyResponse} from "./Login/SpotifyResponse";
import {Home} from "./Home/Home";
import Chat from "./Chat/Chat";
import Communities from "./Communities/Communities";
import CommChat from "./CommunityChat/CommChat"


function App() {
  return (
    <Router>  
      <Layout>    
          <Route path='/spotifylogin' component={SpotifyLogin} />
          <Route path='/communities' component={Communities} />
          <Route path='/callback' component={SpotifyResponse} />
          <Route path='/communitychat/:comm' component={SpotifyResponse} />
          <Route path='/chat' component={Chat} />
          <Route path='/CommChat/:commId/:userId' component={CommChat} />
          <Route exact path='/' component={Home} />
        </Layout>
    </Router>       
  );
}

export default App;
