import PropTypes from 'prop-types';
import Link from 'next/link';

export const ButtonLink = ({ children, href, button, className, ...props }) => {
  return button ? (
    <button
      type="button"
      className={`w-[280px] rounded-[20px] bg-blue2 py-[14px] text-center text-lg font-medium text-slate-50 transition duration-300 ease-in-out hover:bg-yellow-200 hover:text-slate-600 focus:bg-yellow-200 focus:text-slate-600 sm:w-[298px] xl:w-[300px] ${className}`}
      {...props}
    >
      {children}
    </button>
  ) : (
    <Link href={href}>
      <a
        href=""
        className={`block h-[54px] w-[280px] rounded-[20px] bg-blue2 py-[14px] text-center text-lg font-medium text-slate-50 transition duration-300 ease-in-out hover:bg-yellow-200 hover:text-slate-600 focus:bg-yellow-200 focus:text-slate-600 sm:w-[298px] xl:w-[300px] ${className}`}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};

ButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  button: PropTypes.bool,
  className: PropTypes.string,
};
