// import HomePage from '@containers/HomePage';
import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('@containers/HomePage'), { ssr: false })

const homepage = () => {
  return (
    <HomePage />
  )
}

export default homepage;