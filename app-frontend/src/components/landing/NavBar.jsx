'use client'
import LanguageSelectionModal from '@/components/LanguageSelectionModal'
import UserLoginModal from '@/components/landing/UserLoginModal'

export default function NavBar() {
  return (
    <div className="navbar bg-secondary w-screen h-10 sm:h-16 md:h-20 lg:h-24">
        <div className="flex-none h-full">
            <button className="btn btn-ghost h-full">
                <img src='/images/icon.svg' alt="Logo" className="h-full"/>
            </button>
        </div>
    	<div className="flex-grow justify-end">
    		<LanguageSelectionModal/>
        <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={() => document.getElementById('userLoginModal').showModal()}>
            <h3>MyIEP Login</h3>
        </button>
        <UserLoginModal modal_id={'userLoginModal'}/>
      </div>
    </div>
  );
}