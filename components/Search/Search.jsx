import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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

  return (
    <div
      className="relative  ml-auto mr-[20px] flex max-w-lg items-center justify-center"
      ref={searchRef}
    >
      <form role="search" method="get" id="searchform" action="">
        <label htmlFor="s">
          <svg
            viewBox="0 0 17.7 17.7"
            className="absolute float-left mt-[5px]  h-[16px] w-[16px] "
          >
            <path
              fill="#475569"
              d="M12.6 11.2C13.5 10 14 8.6 14 7c0-3.9-3.1-7-7-7S0 3.1 0 7s3.1 7 7 7c1.6 0 3-.5 4.2-1.4l5.1 5.1 1.4-1.4-5.1-5.1zM2 7c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5z"
            />
          </svg>
        </label>
        <input
          onChange={onChange}
          onFocus={onFocus}
          placeholder=" "
          type="text"
          value={query}
          id="s"
        />
      </form>

      {active && results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 truncate">
          {results.map(({ id, title, language }) => {
            return (
              locale === language && (
                <li className="mb-4 bg-slate-500 p-4 text-slate-50" key={title}>
                  <Link href="/[id]" as={`/${id}`}>
                    <a>{title}</a>
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
