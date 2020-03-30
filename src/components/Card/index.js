/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { styles } from './Card.styles';

export const Card = ({ details, label }) => (
  <div css={styles.root}>
    <div>
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.label}>
        {label}
      </Text>
      <Text as="p">{details}</Text>
    </div>
  </div>
);

Card.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Card;
