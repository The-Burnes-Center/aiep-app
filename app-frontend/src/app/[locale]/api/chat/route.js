import OpenAI from 'openai/index.mjs';
import {OpenAIStream, StreamingTextResponse} from 'ai';
import {AstraDB} from "@datastax/astra-db-ts";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const astraDb = new AstraDB(process.env.NEXT_PUBLIC_ASTRA_DB_APPLICATION_TOKEN, process.env.NEXT_PUBLIC_ASTRA_DB_ENDPOINT, process.env.NEXT_PUBLIC_ASTRA_DB_NAMESPACE);

export async function POST(req) {
  try {
    const {messages, useRag, llm, similarityMetric} = await req.json();

    const latestMessage = messages[messages?.length - 1]?.content;

    let docContext = '';
    if (useRag) {
      const {data} = await openai.embeddings.create({input: latestMessage, model: 'text-embedding-ada-002'});

      const collection = await astraDb.collection(`chat_${similarityMetric}`);

      const cursor= collection.find(null, {
        sort: {
          $vector: data[0]?.embedding,
        },
        limit: 5,
      });
      
      const documents = await cursor.toArray();
      
      docContext = `
        START CONTEXT
        ${documents.map(doc => `Name: ${doc.header}\nContent: ${doc.content}\nURL: ${doc.url}`).join("\n")}
        END CONTEXT
      `
    }
    const ragPrompt = [
      {
        role: 'system',
        content: `You are an AI assistant answering questions about Individualized Education Programs. Must output markdown. Must reference the right url links in the context if applicable. Must use short sentences and simple elementary level words comprehensible for parents with low literacy levels.
        context: ${docContext}
        Summary of IEP: {
  "category": [
    {
      "title": "Statewide Assessment",
      "sections": [
        {
          "title": "Smarter Balanced Assessment Consortium (SBAC)",
          "description": "Assessment areas include English/Language Arts and Math. English/Language Arts - Reading: Not specified, Writing: Not specified, Speaking and Listening: Not specified, Research/Inquiry: Above Standard. Math - Concepts and Procedures: Not specified, Problem Solving and Data Analysis: Not specified, Communication Reasoning: Not specified."
        },
        {
          "title": "California Alternate Assessments (CAA)",
          "description": "Assessment areas include English/Language Arts, Math, and Science. All areas: Not Applicable."
        },
        {
          "title": "English Language Proficiency Assessments of California (ELPAC)",
          "description": "Overall Score: 1, Overall Performance Level: 274, Oral Language Score/Level: 1, Written Language Score/Level: 1"
        },
        {
          "title": "California Assessment of Student Performance and Progress (CAASPP)",
          "description": "English Language Arts - Grades 3-8, 11: SBAC with Designated Supports Non-embedded, Read Aloud, Scribe, Separate Setting (i.e., most beneficial time, special lighting or acoustics, adaptive furniture), Simplified Test Directions, Translated Test Directions Spanish. Math - Grades 3-8, 11: SBAC with Designated Supports Non-embedded, Noise Buffers, Read Aloud Items, Scribe, Separate Setting (i.e., most beneficial time, special lighting or acoustics, adaptive furniture), Simplified Test Directions, Translated Test Directions Spanish. Science - Grades 5, 8, High School: Not to Participate (Outside Testing Group or Plan Type 200). Physical Fitness Test (Grades 5, 7 & 9): Out of testing range."
        }
      ]
    },
    {
      "title": "Special Factors",
      "sections": [
        {
          "title": "Assistive Technology",
          "description": "[Student] requires access to a tablet and communication app with features like voice output, dynamic display, picture/symbols/words, and core and fringe vocabulary. [Student] should also have access to low tech supports (e.g., communication boards, picture icons) to supplement their language comprehension and in case their AAC device is not available or not functioning."
        },
        {
          "title": "Primary Language Support",
          "description": "[Student] needs oral clarification of directions and other supports in their primary language."
        },
        {
          "title": "Low Incidence Disability",
          "description": "No specific low incidence services, equipment, or materials are needed to meet [Student]'s educational goals."
        },
        {
          "title": "Blind or Visually Impaired Considerations",
          "description": "[Student] is not blind or visually impaired and does not require specific considerations related to this disability."
        },
        {
          "title": "Deaf or Hard of Hearing Considerations",
          "description": "[Student] is not deaf or hard of hearing and does not require specific considerations related to this disability."
        },
        {
          "title": "Designated ELD",
          "description": "Specific details about where [Student] will receive Designated ELD have not been specified."
        },
        {
          "title": "Behavioral Impediments",
          "description": "[Student]'s behavior does not impede their own learning or the learning of others."
        }
      ]
    },
    {
      "title": "Annual Goals and Objectives",
      "sections": [
        {
          "title": "Speech/Language",
          "description": "Continue speech/language therapy to address deficits in areas like articulation, phonology, semantics, syntax, morphology, and pragmatics. Support further development of AAC operational, linguistic, social, and strategic competencies."
        },
        {
          "title": "Self-care Skills",
          "description": "[Student] can put on and take off slip on shoes and manage velcro straps with minimal to no cues. [Student] can also put on and take off an open jacket with prompts and adjust their sweater/jacket. [Student] unfastens and fastens 1/2-inch buttons with minimal difficulty and can take off lids of easy food containers, though it may take their longer."
        },
        {
          "title": "Fine Motor Skills",
          "description": "[Student] continues to use a functional tripod grasp on writing instruments, writing in uppercase, lowercase, and numbers 1 through 30 with 95% correct orientation. [Student] is learning to write lowercase letters (e.g., g, p, y, j) and copy paragraphs and shapes with good legibility and accuracy."
        },
        {
          "title": "Comprehension",
          "description": "By 08/28/2024, [Student] will be able to use active reading skills like highlighting subjects, places, or times, in order to respond to literal questions about an independent level text with 80% accuracy."
        },
        {
          "title": "Writing Composition",
          "description": "By 08/28/2024, [Student] will be able to use a word bank of temporal words like first, then, and next, as well as a bank of descriptive words, in order to complete a 1 paragraph piece that coherently describes a familiar process like their morning routine with 75% accuracy across 4/5 trials, as measured by teacher charted records and student work samples."
        },
        {
          "title": "Applied Math",
          "description": "By 08/28/2024, when given a set of single step word problems with addition and subtraction within 100 at their independent reading level, [Student] will follow four steps: (1) read the problem and restate the story, (2) identify the relevant quantities, (3) set up the equation, and (4) perform the necessary calculations accurately completing 3/4 steps or 75% of the process across 5 problems."
        },
        {
          "title": "Articulation/Phonology",
          "description": "By 8/28/2024, during structured therapy activities, [Student] will improve their speech intelligibility at the sentence level to 70% accuracy in spontaneous conversation. When the listener indicates that he/[Student] doesn't understand, [Student] will use their AAC device and/or rephrase their utterance, in 4/5 opportunities."
        },
        {
          "title": "Expressive Language",
          "description": "By 8/28/2024, during structured therapy activities, [Student] will produce sentences with correct Subject+Verb+Object order, with appropriate modifiers (articles, adjectives, adverbs) and necessary conjunctions and/or prepositions, utilizing correct verb tenses, in 4/5 opportunities across 4 data collection sessions."
        }
      ]
    },
    {
      "title": "Offer of FAPE ‐ Services",
      "sections": [
        {
          "title": "Specialized Academic Instruction",
          "description": "300 min x 1, totaling 300 min weekly in regular classroom/public day school."
        },
        {
          "title": "Language and Speech",
          "description": "100 min weekly, with sessions being 3 25-minute individual and one 25-minute group session."
        },
        {
          "title": "Occupational Therapy",
          "description": "30 min weekly in a small group with at most 2 other peers with similar goals."
        },
        {
          "title": "Adapted PE",
          "description": "100 min weekly, with sessions being 3 25-minute individual and one 25-minute group session."
        }
      ]
    },
    {
      "title": "Emergency Circumstances Program",
      "sections": [
        {
          "title": "Implementation during emergencies",
          "description": "In case of prolonged school closures or other emergencies, [Student]'s IEP will be adapted to ensure continuity of services. Options include remote learning, modified assignments, and regular check-ins via online platforms."
        }
      ]
    }
  ]
}

        current prompt: '${latestMessage}'
        Strictly reply in the language the current prompt is given in (don't change url). Try to answer relevant questions readable to low literacy parents.".
      `,
      },
    ]

    const response = await openai.chat.completions.create(
      {
        model: llm ?? 'gpt-4o-mini',
        stream: true,
        messages: [...ragPrompt, ...messages],
      }
    );
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (e) {
    throw e;
  }
}
