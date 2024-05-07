import { fetchMetrics } from '@/utils'
import MetricsCard from './components/cards/MetricsCard'

const Dashboard = async() => {
  const { weaveSize, minerMetrics} = await fetchMetrics()
  console.log(minerMetrics)

  return (
    <div className='h-full w-full p-4'>
      <h2 className='text-4xl text-center mb-20'>Dashboard</h2>
      <div className='w-full flex flex-col items-center'>
        {minerMetrics?.map((metric, index) => <MetricsCard key={index} metrics={metric}/>)}
      </div>
    </div>
  )
}

export default Dashboard