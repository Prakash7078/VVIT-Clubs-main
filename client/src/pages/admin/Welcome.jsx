import Sidebar from '../../Components/Sidebar'
import { BsRocket } from 'react-icons/bs'
import PieCharts from './PieCharts';
import BarCharts from './BarCharts';

function Welcome() {
  //pie chart
  
  //bar chart
  

  return (
    <div>
        <Sidebar/>
        <div className='pt-10 lg:pl-80'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-10 items-center justify-between gap-3 lg:gap-5'>
            <div className='h-60'>
              <PieCharts/>
            </div>
            <div className="box cursor-pointer transition ease-in-out delay-150 md:hover:-translate-y-1 md:hover:scale-105 flex justify-center items-center flex-col bg-brown-200 h-48 rounded-lg lg:h-40 ">
              <BsRocket className='scale-150'/>
              <span className='pt-6 flex flex-col gap-3'>
                <h1>Clubs</h1>
                <p>Count</p>
              </span>
            </div>
            <div className="box cursor-pointer transition ease-in-out delay-150 md:hover:-translate-y-1 md:hover:scale-105 flex justify-center items-center flex-col bg-brown-200 h-48 rounded-lg lg:h-40 ">
              <BsRocket className='scale-150'/>
              <span className='pt-6 flex flex-col gap-3'>
                <h1>Clubs</h1>
                <p>Count</p>
              </span>
            </div>
            <div className="box cursor-pointer transition ease-in-out delay-150 md:hover:-translate-y-1 md:hover:scale-105 flex justify-center items-center flex-col bg-brown-200 h-48 rounded-lg lg:h-40 ">
              <BsRocket className='scale-150'/>
              <span className='pt-6 flex flex-col gap-3'>
                <h1>Clubs</h1>
                <p>Count</p>
              </span>
            </div>
          </div>
          <div className='mt-10 flex justify-center'>
            <BarCharts/>
          </div>
        </div>
    </div>
  )
}

export default Welcome