import Info from '../components/Info'
import TagsList from '../components/TagsList'
import { getSwagger } from '../api/axios'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

const Home = () => {
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await getSwagger()
      setData(res.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className='flex w-full min-h-screen justify-center items-center flex-col gap-4'>
        <CircularProgress size={60} />
        Loading
      </div>
    )
  }

  return (
    <div className='flex w-full h-full flex-col'>
    <Info {...data.info} />
    <div className='bg-white py-[30px]' />
    {/* @ts-ignore */}
    <TagsList tags={data.tags} paths={data.paths} />
  </div>
  )
}

export default Home