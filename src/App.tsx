import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './page/home/Home';
import NotFound from './page/notfound/NofFound';
import Login from './page/login/Login';
import Join from './page/join/Join';
import Legal from './component/legal/Legal';
import Movie from './page/movie/Movie';
import ReviewDetail from './page/reviewDetail/ReviewDetail';
import ReviewWrite from './page/reviewWrite/ReviewWrite';
import Mypage from './page/mypage/Mypage';

function AnimateRoutes(){
    const location = useLocation();
    return(
      <AnimatePresence mode='wait'>
        <Routes key={location.pathname} location={location}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/join' element={<Join/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/movie/:id' element={<Movie/>}/>
          <Route path='/review/detail/:id' element={<ReviewDetail/>}/>
          <Route path='/review/write/:id' element={<ReviewWrite/>}/>
          <Route path='/user/:code' element={<Mypage/>}/>
          <Route path='/legal' element={<Legal/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </AnimatePresence>
    )
}

function App() {
  return (
    <BrowserRouter>
      <AnimateRoutes/>
    </BrowserRouter>
  )
}

export default App
