import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle as fasCheckCircle,
  faCircleNotch,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

import messages from './messages';

const availableRingStyle = {
  display: 'inline-block',
  width: 18,
  height: 18,
  border: '3px solid #b0b0b0',
  borderRadius: '50%',
  boxSizing: 'border-box',
  verticalAlign: 'middle',
  marginTop: 3,
  flexShrink: 0,
};

/**
 * Status glyph for outline sections/units.
 * "Available" is a thick gray CSS ring (inline styles so it works without brand SCSS).
 */
export function StatusIcon({
  complete,
  inProgress,
  locked,
  completeTitle,
  inProgressTitle,
  availableTitle,
  lockedTitle,
}) {
  if (complete) {
    return (
      <FontAwesomeIcon
        icon={fasCheckCircle}
        fixedWidth
        className="leti-status-icon leti-status-icon--complete"
        style={{ color: '#449d44', fontSize: '1.15rem', marginTop: 2 }}
        aria-hidden="true"
        title={completeTitle}
      />
    );
  }
  if (locked) {
    return (
      <FontAwesomeIcon
        icon={faLock}
        fixedWidth
        className="leti-status-icon leti-status-icon--locked"
        style={{ color: '#717171', fontSize: '1.05rem', marginTop: 2 }}
        aria-hidden="true"
        title={lockedTitle}
      />
    );
  }
  if (inProgress) {
    return (
      <FontAwesomeIcon
        icon={faCircleNotch}
        fixedWidth
        className="leti-status-icon leti-status-icon--in-progress"
        style={{ color: '#00497c', fontSize: '1.15rem', marginTop: 2 }}
        aria-hidden="true"
        title={inProgressTitle}
      />
    );
  }
  return (
    <span
      className="leti-status-icon leti-status-icon--available"
      style={availableRingStyle}
      aria-hidden="true"
      title={availableTitle}
    />
  );
}

StatusIcon.propTypes = {
  complete: PropTypes.bool,
  inProgress: PropTypes.bool,
  locked: PropTypes.bool,
  completeTitle: PropTypes.string,
  inProgressTitle: PropTypes.string,
  availableTitle: PropTypes.string,
  lockedTitle: PropTypes.string,
};

StatusIcon.defaultProps = {
  complete: false,
  inProgress: false,
  locked: false,
  completeTitle: undefined,
  inProgressTitle: undefined,
  availableTitle: undefined,
  lockedTitle: undefined,
};

export function SectionStatusIcon({
  complete, inProgress, intl,
}) {
  return (
    <StatusIcon
      complete={complete}
      inProgress={inProgress}
      completeTitle={intl.formatMessage(messages.completedSection)}
      inProgressTitle={intl.formatMessage(messages.inProgressSection)}
      availableTitle={intl.formatMessage(messages.incompleteSection)}
    />
  );
}

SectionStatusIcon.propTypes = {
  complete: PropTypes.bool.isRequired,
  inProgress: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export function SequenceStatusIcon({
  complete, locked, intl,
}) {
  return (
    <StatusIcon
      complete={complete}
      locked={locked}
      completeTitle={intl.formatMessage(messages.completedAssignment)}
      availableTitle={intl.formatMessage(messages.incompleteAssignment)}
      lockedTitle={intl.formatMessage(messages.lockedAssignment)}
    />
  );
}

SequenceStatusIcon.propTypes = {
  complete: PropTypes.bool.isRequired,
  locked: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};
