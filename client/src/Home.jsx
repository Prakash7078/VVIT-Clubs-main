import Spliders from './Components/Spliders'
import Categories from './Components/Categories'
import Overview from './Components/Overview'
import Footer from './Components/Footer'
import Contact from './Components/Contact'
import Testimonial from './Components/Testimonials'
import Brand from './Components/Brand'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Tutorials from './Components/Tutorials'
import EventList from './Components/EventList'
function Home() {
  const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  return (
    <div>
        <Brand/>
        <Spliders/>
        <Categories/>
        <Overview/>
        <Testimonial/>
        <Tutorials value={"home"}/>
        <EventList/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Home