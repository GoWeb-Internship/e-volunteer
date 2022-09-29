import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

export const Banner = ({ contents }) => {
  console.log(contents);

  return (
    <>
      {contents && (
        <div className="bg-white py-5">
          <div className="container">
            <div className="m-0 text-center text-base font-medium leading-6 text-slate-500">
              <ReactMarkdown>{contents}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Banner.propTypes = {
  contents: PropTypes.string.isRequired,
};
