import NavBar from '@/components/landing/NavBar';
import UserLoginModal from '@/components/landing/UserLoginModal';

export default function LandingPage() {
  return (
    <div className="w-screen overflow-auto flex flex-col">
      <div className="fixed top-0 left-0 w-full z-10">
        <NavBar />
      </div>
      <div className="relative w-full flex flex-col items-center">
        <div className="relative w-full">
			<img
			src="/images/landingbg.svg"
			alt="Background"
			className="w-full h-auto object-cover"
			/>
			<img
			src="/images/landingbg2.svg"
			alt="Family Reading IEPs Together"
			className="absolute left-1/2 w-1/2 p-6 sm:p-7 md:p-8 lg:p-10 top-12 sm:top-15 md:top-20 lg:top-28"
			/>
			<div className="absolute w-1/2 text-primary-content top-24 sm:top-24 md:top-38 lg:top-44 xl:top-52 pl-12 sm:pl-20 md:pl-32 lg:pl-36">
				<h1 className="">A-IEP</h1>
				<h2 className="leading-tight text-wrap pt-2 sm:pt-6 md:pt-8 lg:pt-10">
					Simplifying Individualized Education Programs (IEPs) for Parents & Caregivers
				</h2>
			</div>
        </div>
      </div>
      <div className="flex flex-col w-full px-5 sm:px-6 md:px-7 lg:px-10 items-center mt-4 sm:mt-10 md:mt-12 lg:mt-16">
        <h1 className="flex text-secondary-content">MyIEP Portal</h1>
        <div className='flex flex-col text-neutral-content py-10 sm:py-12 md:py-16 lg:py-20'>
            <h3 className='flex mb-6 sm:mb-8 md:mb-10 lg:mb-14'>MyIEP helps you navigate and understand your child&apos;s Individualized Education Program (IEP) with ease and confidence, free of charge.</h3>
            <h3 className='flex'>Whether you&apos;re new to IEPs or looking for a better way to manage educational planning, MyIEP is here to support you every step of the way. After you log into your portal, you will be able to :</h3>
        </div>
        <div className="flex justify-between px-4 sm:px-5 md:px-6 lg:px-8 py-5 sm:py-6 md:py-8 lg:py-10">
            <div className="w-1/3 flex flex-col items-center">
                <img
                src="/images/landingicon1.svg"
                alt="Phone Upload"
                className="h-32"
                />
                <h3 className="text-neutral-content text-center w-2/3 pt-2 sm:pt-3 md:pt-4 lg:pt-6">Securely Upload & Translate Your IEP</h3>
            </div>
            <div className="w-1/3 flex flex-col items-center">
                <img
                src="/images/landingicon2.svg"
                alt="IEP Document Insights"
                className="h-32"
                />
                <h3 className="text-neutral-content text-center w-2/3 pt-2 sm:pt-3 md:pt-4 lg:pt-6">Ask Questions About Your IEP</h3>
            </div>
            <div className="w-1/3 flex flex-col items-center">
                <img
                src="/images/landingicon3.svg"
                alt="Chatbot Interactions"
                className="h-32"
                />
                <h3 className="text-neutral-content text-center w-2/3 pt-2 sm:pt-3 md:pt-4 lg:pt-6">Summarize Your IEP</h3>
            </div>
        </div>
        <img
        src="/images/landingicon4.svg"
        alt="Ask Questions About Your IEP"
        className="flex w-1/4 align-middle"
        />
		<div className='flex flex-col text-neutral-content py-10 sm:py-12 md:py-16 lg:py-20'>
			<h3 className='flex mb-6 sm:mb-8 md:mb-10 lg:mb-14'>Please watch the video below on how to sign in to MyIEP Portal and use the tool:</h3>
			<UserLoginModal/>
		</div>
	</div>
		<div className='flex flex-row bg-neutral justify-between px-5 sm:px-6 md:px-7 lg:px-10 py-5 sm:py-6 md:py-8 lg:py-10'>
			<div className='flex flex-col w-2/3'>
				<h1 className='flex text-secondary-content mb-6 sm:mb-8 md:mb-10 lg:mb-14'>What is an IEP?</h1>
				<h3 className='flex text-neutral-content mb-6 sm:mb-8 md:mb-10 lg:mb-14'>An Individualized Education Program (IEP) is a document developed for each U.S. public school child who needs special education.</h3>
				<h3 className='flex text-neutral-content mb-6 sm:mb-8 md:mb-10 lg:mb-14'>An IEP outlines your child’s learning needs, the services the school will provide, and how progress will be measured. </h3>
				<h3 className='flex text-neutral-content'>Understanding every aspect of this crucial document is vital to ensuring your child receives the best education possible.</h3>
			</div>
			<div className='flex w-1/3'>
				<img
				src="/images/landingicon5.svg"
				alt="IEP Document"
				className="h-full p-2 sm:pd-3 md:pd:5 lg:p-8"
				/>
			</div>
		</div>
		<div className='flex flex-row bg-primary justify-between px-5 sm:px-6 md:px-7 lg:px-10 py-5 sm:py-6 md:py-8 lg:py-10'>
			<div className='flex flex-col w-2/3'>
				<h1 className='flex text-primary-content mb-6 sm:mb-8 md:mb-10 lg:mb-14'>Who We Are?</h1>
				<h3 className='flex text-primary-content mb-6 sm:mb-8 md:mb-10 lg:mb-14'>The AI-EP project is a collaborative work between the Burnes Center For Social change and Innovate Public school and their community of parents and caregivers.</h3>
				<h3 className='flex text-primary-content mb-6 sm:mb-8 md:mb-10 lg:mb-14'>We are a team of dedicated educators, advocates, students, and parents committed to utilizing impactful AI that enhances educational outcomes.</h3>
				<h3 className='flex text-primary-content'>We believe that empowered parents are crucial to a child&apos; s educational success, and our tool is designed to strengthen parents or caregivers&apos; ability to participate effectively in their child&apos; s educational planning.</h3>
			</div>
			<div className='flex flex-col w-1/3'>
				<img
				src="/images/landinglogo.svg"
				alt="Burnes Center for Social Change Logo"
				className="p-3 sm:p-4 md:p-5 lg:p-6"
				/>
				<img
				src="/images/landinglogo2.svg"
				alt="Innovate Public Schools Logo"
				className="p-3 sm:p-4 md:-5 lg:p-6"
				/>
			</div>
		</div>
    </div>
  );
}
