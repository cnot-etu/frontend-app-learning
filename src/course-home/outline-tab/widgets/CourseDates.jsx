import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import DateSummary from '../DateSummary';
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

function CourseDates({
  intl,
  /** [MM-P2P] Experiment */
  mmp2p,
}) {
  const {
    courseId,
  } = useSelector(state => state.courseHome);
  const {
    userTimezone,
  } = useModel('courseHomeMeta', courseId);
  const {
    datesWidget: {
      courseDateBlocks = [],
      datesTabLink,
    } = {},
  } = useModel('outline', courseId);

  if (!courseDateBlocks || courseDateBlocks.length === 0) {
    return null;
  }

  return (
    <section className="mb-4 leti-sidebar-card" style={cardStyle}>
      <div className="leti-sidebar-card__header" style={headerStyle}>
        <h2 className="leti-sidebar-card__title" style={titleStyle}>
          {intl.formatMessage(messages.dates)}
        </h2>
      </div>
      <div className="leti-sidebar-card__body" style={bodyStyle} id="courseHome-dates">
        <ol className="list-unstyled mb-2">
          {courseDateBlocks.map((courseDateBlock) => (
            <DateSummary
              key={courseDateBlock.title + courseDateBlock.date}
              dateBlock={courseDateBlock}
              userTimezone={userTimezone}
              /** [MM-P2P] Experiment */
              mmp2p={mmp2p}
            />
          ))}
        </ol>
        {datesTabLink && (
          <a className="font-weight-bold small leti-sidebar-card__link" href={datesTabLink}>
            {intl.formatMessage(messages.allDates)}
          </a>
        )}
      </div>
    </section>
  );
}

CourseDates.propTypes = {
  intl: intlShape.isRequired,
  /** [MM-P2P] Experiment */
  mmp2p: PropTypes.shape({}),
};

CourseDates.defaultProps = {
  /** [MM-P2P] Experiment */
  mmp2p: {},
};

export default injectIntl(CourseDates);
