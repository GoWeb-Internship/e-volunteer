import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Search() {
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
      className="relative my-8 mx-auto flex max-w-lg items-center justify-center"
      ref={searchRef}
    >
      <input
        className="mt-0 block w-full border-0 border-b-2 border-gray-300 px-4 focus:border-black focus:ring-0"
        onChange={onChange}
        onFocus={onFocus}
        placeholder="Поиск по разделам"
        type="text"
        value={query}
      />

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
}
