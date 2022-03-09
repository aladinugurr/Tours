import {React,useEffect,useState} from 'react';
import './App.css';
import Loading from './Loading';
import Tours from './Tours';

function App() {

   const [loading,setLoading] = useState(true);
   const [tours,setTours] = useState([]);



    const getTours = async () =>{
      const url = 'https://course-api.com/react-tours-project';
      setLoading(true);
         try {
          const response = await fetch(url)  
          const tours = await response.json();
          console.log(tours)
          setLoading(false);
          setTours(tours);
         }
         catch(error){
          setLoading(false)
            console.log(error)
             
        }       
          
    }
    const removeTour = (id) => {
    const newTours = tours.filter((tour)=>tour.id !==id) 
       setTours(newTours);
    }
    useEffect(()=>{
       getTours();
    },[])

  if(loading)
    return(
      <main>
        <Loading />
      </main>
    )
  if(tours.length===0){
    return (
      <main>
        <div className='title'>
          <h2>No tours left</h2>
          <button className='btn' onClick={()=> getTours()} >Refresh</button>
          </div>
      </main>
    )
  }
    

  return (

   <>   
     <Tours tours={tours} removeTour={removeTour} />
   </>
  );
}

export default App;
