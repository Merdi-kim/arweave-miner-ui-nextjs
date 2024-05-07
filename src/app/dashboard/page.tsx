import { fetchMetrics } from '@/utils'

const Dashboard = async() => {
  const { dataUnpacked, dataPacked, storageAvailable, hashRate, arweaveSize, minerMetrics} = await fetchMetrics()
  console.log(minerMetrics)

  return (
    <div className="text-black pt-20 flex flex-col items-center">
      <h2 className='text-4xl text-center mb-20'>Dashboard</h2>
      <table className='w-[1024px]'>
        <thead>
          <tr className='flex'>
            <th className='w-1/3 text-start'>Partition</th>
            <th className='w-1/3 text-start'>Data Size</th>
            <th className='w-1/3 text-start'>% of Max</th>
          </tr>
        </thead>
        <tbody>
          {minerMetrics?.map(metric =>(
          <tr className='flex'>
            <td className='w-1/3'>{metric.labels.partition_number}</td>
            <td className='w-1/3'>{Number(metric.labels.storage_module_size) / 1000000000000} TiB</td>
            <td className='w-1/3'>{((Number(metric.labels.storage_module_size) / arweaveSize!) * 100).toFixed(2)} %</td>
          </tr>
          ))}
        </tbody>
        </table>
    </div>
  )
}

export default Dashboard