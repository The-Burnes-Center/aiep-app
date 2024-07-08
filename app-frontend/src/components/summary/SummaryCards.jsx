import SummaryCard from '@/components/summary/SummaryCard';

export default function SummaryCards() {
    const cardData = [
        {
          gradient: "bg-gradient-to-r from-blue-900 to-blue-400",
          title: "Statewide Assessment",
          subtitle: "How your child will participate in district or state assessments.",
          imageSrc: "/images/assessment.png",
          subCards: [
            {
              title: "Smarter Balanced Assessment Consortium (SBAC)",
              description: "Assessment areas include English/Language Arts and Math. English/Language Arts - Reading: Not specified, Writing: Not specified, Speaking and Listening: Not specified, Research/Inquiry: Above Standard. Math - Concepts and Procedures: Not specified, Problem Solving and Data Analysis: Not specified, Communication Reasoning: Not specified.",
              percentageCurrent: null,
              percentageGoal: null
            },
            {
              title: "California Alternate Assessments (CAA)",
              description: "Assessment areas include English/Language Arts, Math, and Science. All areas: Not Applicable.",
              percentageCurrent: null,
              percentageGoal: null
            },
            {
              title: "English Language Proficiency Assessments of California (ELPAC)",
              description: "Overall Score: 1, Overall Performance Level: 274, Oral Language Score/Level: 1, Written Language Score/Level: 1",
              percentageCurrent: null,
              percentageGoal: null
            },
            {
              title: "California Assessment of Student Performance and Progress (CAASPP)",
              description: "English Language Arts - Grades 3-8, 11: SBAC with Designated Supports Non-embedded, Read Aloud, Scribe, Separate Setting (i.e., most beneficial time, special lighting or acoustics, adaptive furniture), Simplified Test Directions, Translated Test Directions Spanish. Math - Grades 3-8, 11: SBAC with Designated Supports Non-embedded, Noise Buffers, Read Aloud Items, Scribe, Separate Setting (i.e., most beneficial time, special lighting or acoustics, adaptive furniture), Simplified Test Directions, Translated Test Directions Spanish. Science - Grades 5, 8, High School: Not to Participate (Outside Testing Group or Plan Type 200). Physical Fitness Test (Grades 5, 7 & 9): Out of testing range.",
              percentageCurrent: null,
              percentageGoal: null
            }
          ]
        },
        {
          gradient: "bg-gradient-to-r from-teal-800 to-teal-400",
          title: "Special Factors",
          subtitle: "What your child's unique needs are and the tools needed to help them learn better.",
          imageSrc: "/images/performance.png",
          subCards: [
            {
              title: "Assistive Technology",
              description: "[Student] requires access to a tablet and communication app with features like voice output, dynamic display, picture/symbols/words, and core and fringe vocabulary. [Student] should also have access to low tech supports (e.g., communication boards, picture icons) to supplement their language comprehension and in case their AAC device is not available or not functioning.",
              percentageCurrent: null,
              percentageGoal: null
            },
            {
              title: "Primary Language Support",
              description: "[Student] needs oral clarification of directions and ottheir supports in their primary language.",
              percentageCurrent: null,
              percentageGoal: null
            },
            {
              title: "Low Incidence Disability",
              description: "No specific low incidence services, equipment, or materials are needed to meet [Student]'s educational goals.",
              percentageCurrent: null,
              percentageGoal: null
            },
            {
              title: "Blind or Visually Impaired Considerations",
              description: "[Student] is not blind or visually impaired and does not require specific considerations related to this disability.",
              percentageCurrent: null,
              percentageGoal: null
            },
            {
              title: "Deaf or Hard of Hearing Considerations",
              description: "[Student] is not deaf or hard of hearing and does not require specific considerations related to this disability.",
              percentageCurrent: null,
              percentageGoal: null
            },
            {
              title: "Designated ELD",
              description: "Specific details about wtheire [Student] will receive Designated ELD have not been specified.",
              percentageCurrent: null,
              percentageGoal: null
            },
            {
              title: "Behavioral Impediments",
              description: "[Student]'s behavior does not impede their own learning or the learning of ottheirs.",
              percentageCurrent: null,
              percentageGoal: null
            }
          ]
        },
        {
          gradient: "bg-gradient-to-r from-orange-600 to-orange-300",
          title: "Annual Goals and Objectives",
          subtitle: "Wtheire your child is expected to be in a year.",
          imageSrc: "/images/goals.png",
          subCards: [
            {
              title: "Speech/Language",
              description: "Continue speech/language ttheirapy to address deficits in areas like articulation, phonology, semantics, syntax, morphology, and pragmatics. Support furttheir development of AAC operational, linguistic, social, and strategic competencies.",
              percentageCurrent: null,
              percentageGoal: 70
            },
            {
              title: "Self-care Skills",
              description: "[Student] can put on and take off slip on shoes and manage velcro straps with minimal to no cues. [Student] can also put on and take off an open jacket with prompts and adjust their sweater/jacket. [Student] unfastens and fastens 1/2-inch buttons with minimal difficulty and can take off lids of easy food containers, though it may take their longer.",
              percentageCurrent: 95,
              percentageGoal: 100
            },
            {
              title: "Fine Motor Skills",
              description: "[Student] continues to use a functional tripod grasp on writing instruments, writing in uppercase, lowercase, and numbers 1 through 30 with 95% correct orientation. [Student] is learning to write lowercase letters (e.g., g, p, y, j) and copy paragraphs and shapes with good legibility and accuracy.",
              percentageCurrent: 95,
              percentageGoal: 100
            },
            {
              title: "Comprehension",
              description: "By 08/28/2024, [Student] will be able to use active reading skills like highlighting subjects, places, or times, in order to respond to literal questions about an independent level text with 80% accuracy.",
              percentageCurrent: null,
              percentageGoal: 80
            },
            {
              title: "Writing Composition",
              description: "By 08/28/2024, [Student] will be able to use a word bank of temporal words like first, then, and next, as well as a bank of descriptive words, in order to complete a 1 paragraph piece that cotheirently describes a familiar process like their morning routine with 75% accuracy across 4/5 trials, as measured by teactheir charted records and student work samples.",
              percentageCurrent: 25,
              percentageGoal: 75
            },
            {
              title: "Applied Math",
              description: "By 08/28/2024, when given a set of single step word problems with addition and subtraction within 100 at their independent reading level, [Student] will follow four steps: (1) read the problem and restate the story, (2) identify the relevant quantities, (3) set up the equation, and (4) perform the necessary calculations accurately completing 3/4 steps or 75% of the process across 5 problems.",
              percentageCurrent: null,
              percentageGoal: 75
            },
            {
              title: "Articulation/Phonology",
              description: "By 8/28/2024, during structured ttheirapy activities, [Student] will improve their speech intelligibility at the sentence level to 70% accuracy in spontaneous conversation. When the listener indicates that he/[Student] doesn't understand, [Student] will use their AAC device and/or rephrase their utterance, in 4/5 opportunities.",
              percentageCurrent: null,
              percentageGoal: 70
            },
            {
              title: "Expressive Language",
              description: "By 8/28/2024, during structured ttheirapy activities, [Student] will produce sentences with correct Subject+Verb+Object order, with appropriate modifiers (articles, adjectives, adverbs) and necessary conjunctions and/or prepositions, utilizing correct verb tenses, in 4/5 opportunities across 4 data collection sessions.",
              percentageCurrent: null,
              percentageGoal: 80
            }
          ]
        },
        {
          gradient: "bg-gradient-to-r from-purple-800 to-purple-400",
          title: "Offer of FAPE ‐ Services",
          subtitle: "Explains exactly what help/services will be available to your child.",
          imageSrc: "/images/fape1.png",
          subCards: [
            {
              title: "Specialized Academic Instruction",
              description: "300 min x 1, totaling 300 min weekly in regular classroom/public day school.",
              percentageCurrent: null,
              percentageGoal: null
            },
            {
              title: "Language and Speech",
              description: "100 min weekly, with sessions being 3 25-minute individual and one 25-minute group session.",
              percentageCurrent: null,
              percentageGoal: null
            },
            {
              title: "Occupational Ttheirapy",
              description: "30 min weekly in a small group with at most 2 ottheir peers with similar goals.",
              percentageCurrent: null,
              percentageGoal: null
            },
            {
              title: "Adapted PE",
              description: "100 min weekly, with sessions being 3 25-minute individual and one 25-minute group session.",
              percentageCurrent: null,
              percentageGoal: null
            }
          ]
        },
    {
        gradient: "bg-gradient-to-r from-blue-900 to-blue-400",
        title: "Emergency Circumstances Program",
        subtitle: "Adaptations for IEP during emergencies.",
        imageSrc: "/images/emergency.png",
        subCards: [
          {
            title: "Implementation during emergencies",
            description: "In case of prolonged school closures or ottheir emergencies, [Student]'s IEP will be adapted to ensure continuity of services. Options include remote learning, modified assignments, and regular check-ins via online platforms.",
            percentageCurrent: null,
            percentageGoal: null
          }
        ]
      },
  ];

  return (
    <div className="p-4">
      {cardData.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  );
}
