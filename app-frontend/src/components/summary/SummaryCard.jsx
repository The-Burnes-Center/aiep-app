"use client";
import { useEffect, useState } from 'react';

export default function SummaryCard({ gradient, title, subtitle, imageSrc, subCards, isOpen }) {
  const [isCardOpen, setIsCardOpen] = useState(isOpen);

  useEffect(() => {
    subCards.forEach((subCard, index) => {
      if (subCard.percentageCurrent !== undefined && subCard.percentageCurrent !== null) {
        setCircleCompletion(subCard.percentageCurrent, `subcard-current-${index}`);
      }
      if (subCard.percentageGoal !== undefined && subCard.percentageGoal !== null) {
        setCircleCompletion(subCard.percentageGoal, `subcard-goal-${index}`);
      }
    });
  }, [subCards]);

  function setCircleCompletion(percentage, id) {
    const circle = document.getElementById(id);
    if (circle) {
      const radius = 16;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percentage / 100) * circumference;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = offset;
    }
  }

  const handleButtonClick = () => {
    setIsCardOpen(!isCardOpen);
  };

  return (
    <div className="w-full mb-4">
      <div className={`rounded-lg p-6 h-32 sm:h-64 ${gradient} relative flex items-center justify-between z-10`}>
        <div className={`p-6 w-full h-full flex flex-col justify-center relative z-10 sm:bg-none`}>
          <h2 className="text-primary-content font-bold ml-56">{title}</h2>
          <p className="text-primary-content mt-2 ml-56">{subtitle}</p>
        </div>
        <div 
          className="hidden sm:block ml-8 absolute inset-0"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto',
            zIndex: 0
          }}
        />
        <button 
          onClick={handleButtonClick} 
          className="btn btn-circle btn-outline btn-lg font-extrabold text-white z-10 text-4xl">
          {isCardOpen ? '-' : '+'}
        </button>
      </div>

      {isCardOpen && (
        <div className="p-6 bg-white shadow-lg font-black rounded-lg ml-2 flex flex-col">
          {subCards && subCards.length > 0 ? (
            subCards.map((subCard, index) => (
              <div key={index} className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{subCard.title}</h3>
                  <p className="text-gray-700">{subCard.description}</p>
                </div>
                <div className="flex items-center">
                  {subCard.percentageCurrent !== null && subCard.percentageCurrent !== undefined && (
                    <div className="flex items-center justify-center ml-4">
                      <span className="mr-2 text-black sm:inline">Current</span>
                      <svg width="40" height="40" viewBox="0 0 36 36">
                        <circle
                          cx="18" cy="18" r="16"
                          stroke="#fff" strokeWidth="4" fill="none"
                        />
                        <circle
                          id={`subcard-current-${index}`}
                          cx="18" cy="18" r="16"
                          stroke="#a00124" strokeWidth="4" fill="none"
                          strokeDasharray="100, 100" strokeDashoffset="0"
                          transform="rotate(-90 18 18)"
                        />
                        <text
                          x="18" y="20.35"
                          fill="#000"
                          fontSize="10"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {subCard.percentageCurrent}%
                        </text>
                      </svg>
                    </div>
                  )}
                  {subCard.percentageGoal !== null && subCard.percentageGoal !== undefined && (
                    <div className="flex items-center justify-center ml-4">
                      <span className="mr-2 text-black sm:inline">Goal</span>
                      <svg width="40" height="40" viewBox="0 0 36 36">
                        <circle
                          cx="18" cy="18" r="16"
                          stroke="#fff" strokeWidth="4" fill="none"
                        />
                        <circle
                          id={`subcard-goal-${index}`}
                          cx="18" cy="18" r="16"
                          stroke="#00ff69" strokeWidth="4" fill="none"
                          strokeDasharray="100, 100" strokeDashoffset="0"
                          transform="rotate(-90 18 18)"
                        />
                        <text
                          x="18" y="20.35"
                          fill="#000"
                          fontSize="10"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {subCard.percentageGoal}%
                        </text>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="mt-2 text-black-500">
              No subcards available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
