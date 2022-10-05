import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';

export const Search = () => {
  const searchRef = useRef(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);
  const { locale } = useRouter();

  const searchEndpoint = query => `/api/search?q=${query}`;

  const onChange = useCallback(event => {
    const query = event.target.value;
    setQuery(query);

    if (query.length) {
      fetch(searchEndpoint(query))
        .then(res => res.json())
        .then(res => {
          setResults(res.results);
        });
    } else {
      setResults([]);
    }
  }, []);

  const onClick = useCallback(event => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener('click', onClick);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);

    window.addEventListener('click', onClick);
  }, [onClick]);

  const handleClearInput = () => {
    setActive(false);
    setQuery('');
  };

  const showResults = active && results.length > 0 && query !== '';

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative rounded-xl shadow-md md:w-[228px] xl:w-[522px]">
        <MagnifyingGlassIcon className="absolute left-2 h-5 w-5 translate-y-1/2  text-slate-600" />

        <input
          onChange={onChange}
          onFocus={onFocus}
          type="text"
          value={query}
          className="w-full rounded-xl border border-gray-300 pl-8 text-slate-600"
          id="search"
        />

        <button
          type="button"
          onClick={handleClearInput}
          className="absolute right-2 translate-y-1/2 text-slate-600 transition-all hover:text-slate-400"
        >
          <XMarkIcon className="h-5 w-5 " />
        </button>
      </div>

      {showResults && (
        <ul className="absolute top-full left-0 right-0 z-10  max-h-56 overflow-auto rounded-lg border border-blue-200 shadow-lg">
          {results.map(({ id, title, language }) => {
            return (
              locale === language && (
                <li
                  className="border-b border-blue-200 bg-slate-50  text-slate-600"
                  key={title}
                >
                  <Link href="[id]" as={`${id}`}>
                    <a className="inline-block w-full  py-3 px-8 transition-all hover:bg-blue-200 focus:bg-blue-200">
                      {title}
                    </a>
                  </Link>
                </li>
              )
            );
          })}
        </ul>
      )}
    </div>
  );
};
