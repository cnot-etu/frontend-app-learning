import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackingLogEvent } from '@edx/frontend-platform/analytics';

import { useModel } from '../generic/model-store';
import messages from '../course-home/outline-tab/messages';
import courseProfileBg from '@edx/brand/course-profile-bg.png';

/**
 * About-style course title band for Learning course home tabs.
 * Large centered title → org/number → Start/Resume CTA.
 */
function CourseHomeHeader({ courseId, intl }) {
  const {
    number,
    org,
    title,
  } = useModel('courseHomeMeta', courseId);

  const {
    resumeCourse: {
      hasVisitedCourse = false,
      url: resumeCourseUrl = null,
    } = {},
  } = useModel('outline', courseId);

  if (!title) {
    return null;
  }

  const metaParts = [org, number].filter(Boolean);

  const logResumeCourseClick = () => {
    sendTrackingLogEvent('edx.course.home.resume_course.clicked', {
      org_key: org,
      courserun_key: courseId,
      event_type: hasVisitedCourse ? 'resume' : 'start',
      url: resumeCourseUrl,
    });
  };

  return (
    <header
      className="leti-course-profile-header"
      data-testid="course-home-header"
      style={{
        backgroundColor: '#00417d',
          backgroundImage: `url(${courseProfileBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 373,
        padding: '75px 0 64px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="leti-course-profile-header__inner container-xl"
        style={{ textAlign: 'center', width: '100%' }}
      >
        <h1
          className="leti-course-profile-header__title"
          style={{
            margin: '0 0 12px',
            color: '#fff',
            fontWeight: 200,
            fontSize: '2.75rem',
            lineHeight: 1.2,
            textShadow: '2px 2px 0 rgba(255, 255, 255, 0.3)',
          }}
        >
          {title}
        </h1>
        {metaParts.length > 0 && (
          <div
            className="leti-course-profile-header__meta"
            style={{
              color: '#fff',
              fontSize: '1.05rem',
              fontWeight: 400,
              letterSpacing: '0.02em',
              opacity: 0.92,
              marginBottom: resumeCourseUrl ? 28 : 0,
            }}
          >
            {metaParts.join(' · ')}
          </div>
        )}
        {resumeCourseUrl && (
          <div className="leti-course-profile-header__cta">
            <Button
              className="leti-course-profile-header__btn"
              variant="outline-light"
              href={resumeCourseUrl}
              onClick={logResumeCourseClick}
              data-testid="start-resume-header-btn"
              style={{
                display: 'inline-block',
                boxSizing: 'border-box',
                minWidth: 200,
                padding: '12px 36px',
                background: 'transparent',
                color: '#fff',
                border: '1px solid #fff',
                borderRadius: 5,
                fontWeight: 600,
                fontSize: '1rem',
                lineHeight: 1.4,
                letterSpacing: '0.02em',
                textAlign: 'center',
                textDecoration: 'none',
                textTransform: 'none',
                textShadow: 'none',
                boxShadow: '4px 4px 0 rgba(255, 255, 255, 0.2), 8px 8px 0 rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
              }}
            >
              {hasVisitedCourse
                ? intl.formatMessage(messages.resume)
                : intl.formatMessage(messages.start)}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

CourseHomeHeader.propTypes = {
  courseId: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CourseHomeHeader);
