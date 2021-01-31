import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'

import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import { AuthProvider } from './context/auth'
import AuthRoute from './util/AuthRoute'

function App () {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
