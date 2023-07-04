import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'

export default function Home() {
	const {data: session} = useSession();
  return <Layout>
		<div className='text-blue-700 flex justify-between'>
			<h2>
			Hello, <b>{session?.user?.name}</b>
			</h2>
			<div className=' flex bg-gray-400  gap-1 text-black rounded-lg overflow-hidden'>
			<img src={session?.user?.image} alt='' className='w-10 h-10'></img>
			<span className='py-1 px-2'>
				{session?.user?.name}
			</span>
			</div>
		</div>
		</Layout>
}
