import React from 'react';
import { useSelector } from 'react-redux';

import { sendTrackingLogEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark, faCertificate, faInfo, faCalendar, faStar,
} from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';

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

function CourseTools({ intl }) {
  const {
    courseId,
  } = useSelector(state => state.courseHome);
  const { org } = useModel('courseHomeMeta', courseId);
  const {
    courseTools,
  } = useModel('outline', courseId);

  if (!courseTools || courseTools.length === 0) {
    return null;
  }

  const eventProperties = {
    org_key: org,
    courserun_key: courseId,
  };

  const logClick = (analyticsId) => {
    const { administrator } = getAuthenticatedUser();
    sendTrackingLogEvent('edx.course.tool.accessed', {
      ...eventProperties,
      course_id: courseId,
      is_staff: administrator,
      tool_name: analyticsId,
    });
  };

  const renderIcon = (iconClasses) => {
    switch (iconClasses) {
      case 'edx.bookmarks':
        return faBookmark;
      case 'edx.tool.verified_upgrade':
        return faCertificate;
      case 'edx.tool.financial_assistance':
        return faInfo;
      case 'edx.calendar-sync':
        return faCalendar;
      case 'edx.updates':
        return faNewspaper;
      case 'edx.reviews':
        return faStar;
      default:
        return null;
    }
  };

  return (
    <section className="mb-4 leti-sidebar-card" style={cardStyle}>
      <div className="leti-sidebar-card__header" style={headerStyle}>
        <h2 className="leti-sidebar-card__title" style={titleStyle}>
          {intl.formatMessage(messages.tools)}
        </h2>
      </div>
      <div className="leti-sidebar-card__body" style={bodyStyle}>
        <ul className="list-unstyled mb-0">
          {courseTools.map((courseTool) => (
            <li key={courseTool.analyticsId} className="small">
              <a href={courseTool.url} onClick={() => logClick(courseTool.analyticsId)}>
                <FontAwesomeIcon icon={renderIcon(courseTool.analyticsId)} className="mr-2" fixedWidth />
                {courseTool.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

CourseTools.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CourseTools);
