import { css } from 'lib/utils/media-queries';
import { Color, Space } from 'lib/theme';

const styles = {
  root: css({
    alignItems: 'flex-end',
    backgroundColor: `${Color.CORAL}`,
    display: 'flex',
    minHeight: ['276px', '', 'auto'],
    padding: [`${Space.S40}px`, '', 0],
    width: '100%',
  }),
};

export default styles;
