import PortalMenu from '@/components/PortalMenu'
import SummaryCards from '@/components/summary/SummaryCards'

export default function SummaryPage() {
  return (
    <div className="w-screen overflow-auto flex flex-col">
        <div className="fixed top-0 left-0 w-full z-10">
            <PortalMenu />
        </div>
        <div className='mx-12 mt-44 border-b-4 border-black w-2/3'>
          <h2 className='leading-relaxed'>Summary of your IEP</h2>
          <h3 className='leading-loose'>Open each box to get summary of your IEP by section. </h3>
        </div>
        <div className="mt-5 md:mt-24 left-0 w-full z-0">
            <SummaryCards />
        </div>
    </div>
  );
}