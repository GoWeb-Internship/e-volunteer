import classNames from 'classnames';
import PropTypes from 'prop-types';
import { card, contact, footer } from './Grid.module.css';

export const Grid = ({ children, type, className, tag, ...props }) => {
  const Tag = tag ?? 'div';
  return (
    <Tag
      className={classNames(className, {
        [card]: type === 'card',
        [contact]: type === 'contact',
        [footer]: type === 'footer',
      })}
      {...props}
    >
      {children}
    </Tag>
  );
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  tag: PropTypes.string,
  className: PropTypes.string,
};
