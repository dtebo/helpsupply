/** @jsx jsx */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';

import { Routes } from 'constants/Routes';
import { isValidEmail } from 'lib/utils/validations';

import Note from 'components/Note';
import Anchor from 'components/Anchor';
import HeaderInfo from 'components/Form/HeaderInfo';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

const validate = (val) => {
  if (!isValidEmail(val)) {
    return 'Please enter a valid email address';
  }
};

function EmailForm({ backend, match }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [dropsite, setDropsite] = useState(match.params.dropsite);

  useEffect(() => {
    setDropsite(match.params.dropsite);
  }, [match.params.dropsite]);

  const handleSubmit = (event) => {
    event.preventDefault();
    backend
      .signupWithEmail(email, dropsite)
      .then(() => {
        setSent(true);
      })
      .catch(alert);
    // TODO: handle exceptions
  };

  if (sent) {
    return (
      <HeaderInfo
        title={t('request.workEmailForm.sent.title')}
        description={t('request.workEmailForm.sent.description')}
      />
    );
  }

  const fieldData = [
    {
      customOnChange: setEmail,
      label: t('request.workEmailForm.workEmail.label'),
      name: 'email',
      type: formFieldTypes.INPUT_TEXT,
      validation: { validate },
    },
  ];

  return (
    <FormBuilder
      defaultValues={{ email: '' }}
      onSubmit={handleSubmit}
      title={t('request.workEmailForm.title')}
      description={t('request.workEmailForm.description')}
      disabled={!isValidEmail(email)}
      fields={fieldData}
    >
      <Note>
        {t('request.workEmailForm.workEmail.disclaimer') + ' '}
        <Anchor href={Routes.HOME}>
          {t('request.workEmailForm.learnMore')}
        </Anchor>
      </Note>
    </FormBuilder>
  );
}

export default EmailForm;
