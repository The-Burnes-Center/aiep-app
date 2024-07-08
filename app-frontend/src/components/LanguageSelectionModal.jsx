'use client';

import {useTransition} from 'react';
import {localeNames, languageSelectionButtonText, languageSelectionLabels} from '@/config';
import {useRouter, usePathname} from '@/navigation';
import {useLocale} from 'next-intl';

export default function LanguageSelectionModal() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const currentLocale = useLocale();
  
  function switchLocale(nextLocale) {
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
    closeModal();
  }

  function openModal() {
    document.getElementById('languageSelectionModal').showModal()
  }

  function closeModal() {
    document.getElementById('languageSelectionModal').close()
  }

  const formatLocaleSwitcherText = (listOfSupportedTexts) => {
    // Ensure the current locale exists in the locales object
    if (!(currentLocale in localeNames)) {
      throw new Error("Current locale not found in locale map.");
    }
    // Extract the value for the current locale
    const currentValue = listOfSupportedTexts[currentLocale];
    // Remove the current locale from the list and then concatenate with the current value
    const otherValues = Object.entries(listOfSupportedTexts)
      .filter(([key]) => key !== currentLocale)
      .map(([, value]) => value)
      .join('-');
  
    // Concatenate the current locale's value with the other values, separated by '/'
    return (
      <div className='flex flex-col align-middle'>
        <h3>{currentValue}</h3>
        <p>{otherValues}</p>
      </div>);
  };

  return (
    <div className='h-full'>
      <button className="btn bg-transparent outline-none btn-xs md:btn-md lg:btn-lg h-full text-neutral-content" onClick={openModal}>
        {formatLocaleSwitcherText(languageSelectionButtonText)}
      </button>
      <dialog id="languageSelectionModal" className="modal items-center">
        <div className="flex-col modal-box justify-start modal-action h-auto">
          <div className='p-4'>
            {formatLocaleSwitcherText(languageSelectionLabels)}
          </div>
          {Object.entries(localeNames).map(([localeID, localeName]) => (
            <button className="btn btn-secondary justify-center my-2 outline-dotted outline-black" key={localeID}
            disabled={isPending} onClick={() => switchLocale(localeID)}>
              <h3>{localeName}</h3>
            </button>
          ))}
        </div>
      </dialog>
    </div>
  );
}
