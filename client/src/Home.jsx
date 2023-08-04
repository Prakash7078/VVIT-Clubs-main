import Spliders from './Components/Spliders'
import Categories from './Components/Categories'
import Overview from './Components/Overview'
import Footer from './Components/Footer'
import Contact from './Components/Contact'
import Testimonial from './Components/Testimonials'
import Brand from './Components/Brand'

function Home() {
  return (
    <div>
        <Brand/>
        <Spliders/>
        <Categories/>
        <Overview/>
        <Testimonial/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Home