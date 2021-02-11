import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5)

  let history = useHistory()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)
    // redirect once countis equal to zero
    count === 0 && history.push('/')
    // cleanup
    return () => clearInterval[interval]
  }, [count])

  return (
    <div className='container p-5 text-center' >
      <p>Redirecting you in {count} secs</p>      
    </div>
  );
};

export default LoadingToRedirect;