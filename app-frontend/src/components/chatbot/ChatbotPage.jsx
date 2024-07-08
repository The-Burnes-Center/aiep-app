"use client";
import {useEffect, useRef} from 'react';
import Bubble from './Bubble'
import { useChat } from 'ai/react';
import PromptSuggestionRow from './PromptSuggestionsRow';
import PortalMenu from '@/components/PortalMenu';

export default function Chatbot() {
  const { append, messages, input, handleInputChange, handleSubmit } = useChat();

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    handleSubmit(e, { options: { body: { useRag: true, llm: 'gpt-3.5-turbo', similarityMetric: 'cosine'}}});
  }

  const handlePrompt = (promptText) => {
    const msg = { id: crypto.randomUUID(),  content: promptText, role: 'user' };
    append(msg, { options: { body: {useRag: true, llm: 'gpt-3.5-turbo', similarityMetric: 'cosine'}}});
    console.log(msg)
  };

  return (
    <div className="w-screen overflow-auto flex flex-col h-screen">
        <div className="fixed top-0 left-0 w-full z-10">
            <PortalMenu />
        </div>
        <div className='mx-12 mt-44 border-b-4 border-black w-2/3'>
          <h2 className='leading-relaxed'>Ask MyIEP</h2>
          <h3 className='leading-loose'>Type a question below to find out more about your child IEP</h3>
        </div>
        <div className="mt-4 md:mt-6 left-0 w-full h-full z-0 p-3 md:p-6">
          <main className="flex bg-secondary w-full h-full flex-col items-center justify-center">
            <section className='flex flex-col w-full h-full rounded-md p-2 md:p-6 pb-5 md:pb-8'>
              <div className='flex-1 relative overflow-y-auto my-4 md:my-6 w-full'>
                <div className='absolute w-full'>
                  {messages.map((message, index) => <Bubble ref={messagesEndRef} key={`message-${index}`} content={message}/>)}
                </div>
              </div>
              {!messages || messages.length === 0 && (
                <PromptSuggestionRow onPromptClick={handlePrompt} prompts={[
                  "Does my child have special needs?", 
                  "What are the goals in my IEP?", 
                  "What can I do to support my child's IEP?", 
                  "How do I prepare for an IEP meeting?"
                ]} />
              )}
              <form className='flex h-[40px] gap-2 mt-4 mb-8' onSubmit={handleSend}>
                <input onChange={handleInputChange} value={input} className='flex-1 input text-lg md:text-base outline-double bg-transparent' placeholder='Type Your Question Here' />
                <button type="submit" className='flex btn btn-primary bg-black w-1/6 btn-md rounded-md items-center justify-center pl-2.5 origin:pl3'>
                  <span className='origin:block font-semibold text-lg'>Send</span>
                </button>
              </form>
            </section>
          </main>
        </div>
    </div>
  )
}