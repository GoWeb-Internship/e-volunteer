import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

export const Banner = ({ data }) => {
  return (
    <>
      {data?.contents && (
        <div className="bg-white py-5">
          <div className="container">
            <div className="m-0 text-center text-base font-medium leading-6 text-slate-500">
              <ReactMarkdown>{data.contents}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Banner.propTypes = {
  data: PropTypes.object.isRequired,
};
