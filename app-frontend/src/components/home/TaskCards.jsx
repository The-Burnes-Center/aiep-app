'use client'
import { useRouter } from "@/navigation"

export default function TaskCards() {
    const router = useRouter();
    const taskData = [
        {
            title: "Upload & Translate",
            bgRef: "/images/landingicon1.svg",
            onClick: () => router.push("/portal/jobs")
        },
        {
            title: "Get Summary",
            bgRef: "/images/landingicon2.svg",
            onClick: () => router.push("/portal/summary")
        },
        {
            title: "Ask Questions",
            bgRef: "/images/landingicon3.svg",
            onClick: () => router.push("/portal/chatbot")
        },
    ];

    return (
        <div className="p-4 rounded-xl w-full h-full outline-dotted">
            <div className="flex flex-col lg:flex-row align-middle items-center justify-between md:m-5 md:mx-16">
                {taskData.map((task, index) => (
                    <div key={index} className="card w-52 h-44 md:w-52 md:h-48 outline p-2 md:p-5 shadow-xl">
                        <img
                            src={task.bgRef}
                            alt="Background"
                            className="h-16 align-top mb-3"
                        />
                        <div className="card-body btn btn-primary" onClick={task.onClick}>
                            <h2 className="card-title">{task.title}</h2>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    )
}