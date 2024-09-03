'use client'
import LanguageSelectionModal from '@/components/LanguageSelectionModal'
import { useRouter } from '@/navigation';
import { logout } from '@/lib/UserAuthentication';

export default function PortalMenu() {
  const router = useRouter();

  async function userLogout() {
    const response = await logout();
    router.push('/')
  }

  function routeToHome() {
    router.push('/portal/home')
  }

  function routeToSummary() {
    router.push('/portal/summary')
  }

  function routeToChatbot() {
    router.push('/portal/chatbot')
  }

  return (
    <div className="navbar bg-gray-300 w-screen h-10 sm:h-16 md:h-20 lg:h-24">
        <div className="flex-none h-full">
            <button className="btn btn-ghost h-full" onClick={routeToHome}>
                <img src='/images/icon.svg' alt="Logo" className="h-full"/>
            </button>
        </div>
    	<div className="flex-grow justify-end">
        <div className="hidden xl:block">
          <button className="btn bg-transparent btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={routeToHome}>
              <p>Portal Home</p>
          </button>
          <button className="btn bg-transparent btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={routeToSummary}>
              <p>Get Summary</p>
          </button>
          <button className="btn bg-transparent btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={routeToChatbot}>
              <p>Ask Questions</p>
          </button>
        </div>
        <div className="block xl:hidden dropdown dropdown-bottom">
          <div tabIndex={0} role="btn bg-transparent btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-lg" className="btn m-1">Menu</div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={routeToHome}>Portal Home</a></li>
            <li><a onClick={routeToSummary}>Get Summary</a></li>
            <li><a onClick={routeToChatbot}>Ask Questions</a></li>
          </ul>
        </div>
        <LanguageSelectionModal/>
        <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={userLogout}>
            <h3>Logout</h3>
        </button>
        
      </div>
    </div>
  );
}