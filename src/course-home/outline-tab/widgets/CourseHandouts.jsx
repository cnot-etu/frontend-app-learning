import React from 'react';
import { useSelector } from 'react-redux';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import LmsHtmlFragment from '../LmsHtmlFragment';
import messages from '../messages';
import { useModel } from '../../../generic/model-store';

const cardStyle = {
  background: '#fff',
  borderRadius: 10,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  marginBottom: 24,
  padding: 0,
  border: 'none',
};

const headerStyle = {
  background: '#00497c',
  padding: '18px 24px',
  textAlign: 'center',
};

const titleStyle = {
  margin: 0,
  color: '#fff',
  fontSize: '1.15em',
  fontWeight: 600,
  letterSpacing: '0.02em',
  lineHeight: 1.3,
};

const bodyStyle = {
  padding: '24px 28px',
};

function CourseHandouts({ intl }) {
  const {
    courseId,
  } = useSelector(state => state.courseHome);
  const {
    handoutsHtml,
  } = useModel('outline', courseId);

  if (!handoutsHtml) {
    return null;
  }

  return (
    <section className="mb-4 leti-sidebar-card" style={cardStyle}>
      <div className="leti-sidebar-card__header" style={headerStyle}>
        <h2 className="leti-sidebar-card__title" style={titleStyle}>
          {intl.formatMessage(messages.handouts)}
        </h2>
      </div>
      <div className="leti-sidebar-card__body" style={bodyStyle}>
        <LmsHtmlFragment
          className="small"
          html={handoutsHtml}
          title={intl.formatMessage(messages.handouts)}
        />
      </div>
    </section>
  );
}

CourseHandouts.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CourseHandouts);
