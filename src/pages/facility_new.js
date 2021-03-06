/** @jsx jsx */
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import Page from 'components/layouts/Page';
import FacilityForm from 'containers/FacilityForm';

function NewFacility(props) {
  return (
    <Page currentProgress={2} totalProgress={5}>
      <FacilityForm {...props} />
    </Page>
  );
}

export default withRouter(NewFacility);
