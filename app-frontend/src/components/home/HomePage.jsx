import PortalMenu from '@/components/PortalMenu'
import TaskCards from '@/components/home/TaskCards'

export default function HomePage() {
  return (
    <div className="w-screen overflow-auto flex flex-col h-screen">
        <div className="fixed top-0 left-0 w-full z-10">
            <PortalMenu />
        </div>
        <div className='mx-5 md:mx-20 h-auto'>
            <div className='mt-20 mb-5 lg:mt-36 h-20 lg:h-44 rounded-lg bg-gradient-to-r from-blue-900 to-blue-400 relative flex-col items-center justify-between z-0'>
                <div className='p-6 w-full h-full flex flex-1 flex-col justify-center relative z-10 sm:bg-none'>
                    <h2 className="text-primary-content font-bold">Hello!</h2>
                    <p className="text-primary-content mt-2">Welcome to the AIEP Portal!</p>
                </div>
                <div 
                className="hidden sm:block absolute inset-0"
                style={{
                    backgroundImage: `url(/images/summary_card_bg.png)`,
                    backgroundPosition: 'right center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto',
                    zIndex: 0}}/>
            </div>
            <div className='w-full h-auto'>
                <h3 className='relative x-0 y-0 my-2'>Quick Links</h3>
                <TaskCards/>
            </div>
        </div>
      </div>
  );
}
