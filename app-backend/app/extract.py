from openai import OpenAI
from pydantic import BaseModel, Field
from typing import List, Optional, Union, Literal, Dict, Type
import re

def extract_from_iep(base64_images: list[str]):
    api_key = os.getenv('OPENAI_API_KEY')
    client = OpenAI(api_key=api_key)

    IEP_SECTION_TYPES = [
        "IEPInformationAndEligibility", 
        "CurrentAcademicAndFunctionalLevels", 
        "AnnualGoalsAndObjectives", 
        "FAPEServiceOffer", 
        "EducationalSettingOffer",
        "EmergencyInstructionalProgram", 
        "AssessmentPlan"
    ]

    # Updated IEPPage model
    class IEPPage(BaseModel):
        section_type: Literal[*IEP_SECTION_TYPES] = Field(None, description="An IEP section that can be any of the defined sections")
        full_text: str = Field(None, description="All extracted full text from the page, ordered in a logical order")

    class IEPInformationAndEligibility(BaseModel):
        student_details: Optional[str] = Field(None, description="Name and Grade of the student")
        iep_meeting_information: Optional[dict] = Field(None, description="Dates related to IEP and evaluations")
        meeting_purpose: Optional[str] = Field(None, description="Purpose of the IEP meeting")
        disability_identification: Optional[dict] = Field(None, description="Primary and Secondary disabilities")
        language_proficiency: Optional[dict] = Field(None, description="Language information including EL status")
        special_education_entry_information: Optional[dict] = Field(None, description="Details about initial entry into special education")

    class FunctionalArea(BaseModel):
        area_name: Optional[str] = Field(None, description="Name of the functional area, e.g., Reading, Math, Communication")
        current_level: Optional[str] = Field(None, description="Description of the student's current level of performance in this area")
        strengths: Optional[List[str]] = Field(None, description="Student's strengths in this area")
        concerns: Optional[List[str]] = Field(None, description="Parent or teacher concerns related to this area")

    class CurrentAcademicAndFunctionalLevels(BaseModel):
        functional_areas: Optional[List[FunctionalArea]] = Field(
            None, description="List of different academic and functional areas with their details"
        )

    class ShortTermObjective(BaseModel):
        objective: Optional[str] = Field(None, description="Short-term objective description")
        progress_percentage: Optional[float] = Field(None, description="Optional percentage representation of progress")

    class AnnualGoal(BaseModel):
        focus_area: Optional[str] = Field(None, description="Specific area like Reading, Math, Communication, etc.")
        baseline_performance: Optional[str] = Field(None, description="Current level of performance in the focus area")
        annual_goal: Optional[str] = Field(None, description="Description of the annual goal")
        progress_percentage: Optional[float] = Field(None, description="Optional percentage representation of goal progress")
        short_term_objectives: Optional[List[ShortTermObjective]] = Field(
            None, description="List of short-term objectives for achieving the annual goal"
        )

    class AnnualGoalsAndObjectives(BaseModel):
        goals_and_objectives: Optional[List[AnnualGoal]] = Field(
            None, description="List of annual goals and corresponding objectives"
        )

    class FAPEServiceOffer(BaseModel):
        services_considered: Optional[List[str]] = Field(None, description="Overview of service options considered")
        least_restrictive_environment: Optional[str] = Field(None, description="Consideration of the least restrictive environment")
        classroom_accommodations: Optional[List[str]] = Field(None, description="Supports provided in the general education setting")
        modifications: Optional[List[str]] = Field(None, description="Modifications to curriculum or instruction")
        support_for_school_personnel: Optional[List[str]] = Field(None, description="Training or consultation for school staff")

    class EducationalSettingOffer(BaseModel):
        placement_details: Optional[str] = Field(None, description="Type of classroom setting")
        time_in_general_education: Optional[int] = Field(None, description="Percentage of time in general education")
        reasons_for_specialized_instruction: Optional[str] = Field(None, description="Rationale for specialized instruction")
        promotion_criteria: Optional[str] = Field(None, description="Criteria for grade advancement")
        transition_planning: Optional[str] = Field(None, description="Plans for educational transitions")

    class EmergencyInstructionalProgram(BaseModel):
        service_delivery_methods: Optional[List[str]] = Field(None, description="How services will be delivered during emergencies")
        iep_goals_during_emergencies: Optional[List[str]] = Field(None, description="IEP goals to be focused on during emergencies")
        frequency_and_duration_of_services: Optional[dict] = Field(None, description="Frequency and duration of services during emergencies")
        transition_back_to_regular_services: Optional[str] = Field(None, description="Plan for transitioning back to regular services")

    class AssessmentDetail(BaseModel):
        assessment_type: Optional[str] = Field(None, description="Type of assessment, e.g., Cognitive, Behavioral, Academic")
        purpose: Optional[str] = Field(None, description="Purpose of the assessment")
        method: Optional[str] = Field(None, description="Method of assessment, e.g., Standardized Test, Observation")
        timeline: Optional[str] = Field(None, description="Timeline for when the assessment will be conducted")
        assessor: Optional[str] = Field(None, description="Person or role responsible for conducting the assessment")

    class AssessmentPlan(BaseModel):
        assessments: Optional[List[AssessmentDetail]] = Field(
            None, description="List of all assessments planned for the student"
        )

    IEP_SECTION_MODEL_MAP: Dict[str, Type[BaseModel]] = {
        "IEPInformationAndEligibility": IEPInformationAndEligibility,
        "CurrentAcademicAndFunctionalLevels": CurrentAcademicAndFunctionalLevels,
        "AnnualGoalsAndObjectives": AnnualGoalsAndObjectives,
        "FAPEServiceOffer": FAPEServiceOffer,
        "EducationalSettingOffer": EducationalSettingOffer,
        "EmergencyInstructionalProgram": EmergencyInstructionalProgram,
        "AssessmentPlan": AssessmentPlan
    }

    # Create a dictionary with each section type mapped to an empty string
    section_text_dict = {section_type: "" for section_type in IEP_SECTION_TYPES}
    # Slowly populate dictionary with extracted raw text per section
    for page_image in base64_images:
        page_extract = client.beta.chat.completions.parse(
            model="gpt-4o-2024-08-06",
            messages=[
                {
                    "role": "system",
                    "content": "Given an image of a page of the IEP, identify which section the page belongs under and attempt to extract the full content in logical order."    
                    },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/png;base64,{page_image}"
                            }
                        }
                    ],
                }
            ],
            response_format=IEPPage
        )
        page_info = page_extract.choices[0].message.parsed
        section_text_dict[page_info.section_type] += page_info.full_text

    # Extract more structured data once data in organized per section instead of per page
    section_info_dict = {}
    for section_type in section_text_dict:
        section_full_text = section_text_dict[section_type]
        if section_full_text:
            section_data = client.beta.chat.completions.parse(
                model="gpt-4o-2024-08-06",
                messages=[
                    {"role": "system", "content": f"You are given a full view of all the content under the Section '{section_type}' on a IEP. Extract key points and organize this information into the target model. Use simple language equivalent to a 5th grade reading level. Limit field values to under 3 sentences."},
                    {"role": "user", "content": f'Aggregate Text: {section_full_text}'},
                ],
                    response_format=IEP_SECTION_MODEL_MAP[section_type],
            )
            section_info_dict[section_type]= section_data.choices[0].message.parsed.model_dump()

    def normalize_spaces(text: str) -> str:
        """
        Replace multiple spaces with a single space.
        """
        return re.sub(r'\s+', ' ', text).strip()

    def split_into_sentences(text: str) -> List[str]:
        """
        Splits text into sentences using a regular expression.
        """
        sentence_endings = re.compile(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s')
        sentences = sentence_endings.split(text)
        return [normalize_spaces(sentence.strip()) for sentence in sentences if sentence.strip()]

    def chunk_text(sentences: List[str], max_chunk_size: int = 200, overlap: int = 2) -> List[str]:
        """
        Splits sentences into chunks of specified maximum size.
        
        :param sentences: List of sentences to be chunked.
        :param max_chunk_size: The maximum number of words per chunk.
        :param overlap: The number of overlapping sentences between consecutive chunks.
        :return: List of text chunks.
        """
        chunks = []
        current_chunk = []
        current_length = 0
        
        for sentence in sentences:
            sentence_length = len(sentence.split())
            if current_length + sentence_length > max_chunk_size:
                chunks.append(' '.join(current_chunk))
                current_chunk = current_chunk[-overlap:]  # Keep the last `overlap` sentences for context
                current_length = sum(len(s.split()) for s in current_chunk)
            
            current_chunk.append(sentence)
            current_length += sentence_length
        
        # Add the last chunk
        if current_chunk:
            chunks.append(' '.join(current_chunk))
        
        return chunks

    def chunk_full_text_sections(section_text_dict: Dict[str, str], max_chunk_size: int = 100) -> Dict[str, str]:
        """
        Chunk the full text of each section in the section text dictionary.
        
        :param section_text_dict: Dictionary where keys are section types and values are full text.
        :param max_chunk_size: The maximum number of words per chunk.
        :return: Dictionary with section type and order combined as keys and text chunks as values.
        """
        chunked_sections = {}
        for section_type, full_text in section_text_dict.items():
            normalized_text = normalize_spaces(full_text)
            sentences = split_into_sentences(normalized_text)
            chunks = chunk_text(sentences, max_chunk_size=max_chunk_size)
            for i, chunk in enumerate(chunks):
                chunk_id = f"{section_type}_{i + 1}"
                chunked_sections[chunk_id] = chunk
        
        return chunked_sections

    chunked_sections = chunk_full_text_sections(section_text_dict, max_chunk_size=200)
    return section_info_dict, chunked_sections