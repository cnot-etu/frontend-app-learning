import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Collapsible, IconButton } from '@edx/paragon';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import SequenceLink from './SequenceLink';
import { SectionStatusIcon } from './StatusIcon';
import { useModel } from '../../generic/model-store';

import genericMessages from '../../generic/messages';
import messages from './messages';

function Section({
  courseId,
  defaultOpen,
  expand,
  intl,
  section,
}) {
  const {
    complete,
    resumeBlock,
    sequenceIds,
    title,
  } = section;
  const {
    courseBlocks: {
      sequences,
    },
  } = useModel('outline', courseId);

  const [open, setOpen] = useState(defaultOpen);
  const inProgress = !complete && !!resumeBlock;
  const completedCount = sequenceIds.filter((id) => sequences[id] && sequences[id].complete).length;
  const totalCount = sequenceIds.length;

  useEffect(() => {
    setOpen(expand);
  }, [expand]);

  useEffect(() => {
    setOpen(defaultOpen);
  }, []);

  let statusLabel = messages.incompleteSection;
  if (complete) {
    statusLabel = messages.completedSection;
  } else if (inProgress) {
    statusLabel = messages.inProgressSection;
  }

  const sectionTitle = (
    <div className="leti-section-title row w-100 m-0 align-items-center">
      <div className="col-auto p-0">
        <SectionStatusIcon complete={complete} inProgress={inProgress} intl={intl} />
      </div>
      <div className="col p-0 ml-3 font-weight-bold text-dark-500 min-width-0">
        <span className="align-middle d-inline-block text-break">{title}</span>
        <span className="sr-only">
          , {intl.formatMessage(statusLabel)}
        </span>
      </div>
      {totalCount > 0 && (
        <div className="col-auto p-0 ml-2">
          <span className="leti-section-progress" aria-hidden="true">
            {completedCount}/{totalCount}
          </span>
          <div
            className="leti-section-progress-bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={totalCount}
            aria-valuenow={completedCount}
            aria-label={intl.formatMessage(messages.sectionProgress, {
              completed: completedCount,
              total: totalCount,
            })}
          >
            <span
              className="leti-section-progress-bar__fill"
              style={{ width: `${totalCount ? (completedCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <li className="leti-soft-section">
      <Collapsible
        className="mb-3 leti-soft-section__collapsible"
        styling="card-lg"
        title={sectionTitle}
        open={open}
        onToggle={() => { setOpen(!open); }}
        iconWhenClosed={(
          <IconButton
            alt={intl.formatMessage(messages.openSection)}
            icon={faChevronDown}
            onClick={() => { setOpen(true); }}
            size="sm"
          />
        )}
        iconWhenOpen={(
          <IconButton
            alt={intl.formatMessage(genericMessages.close)}
            icon={faChevronUp}
            onClick={() => { setOpen(false); }}
            size="sm"
          />
        )}
      >
        <ol className="list-unstyled leti-soft-section__units">
          {sequenceIds.map((sequenceId, index) => (
            <SequenceLink
              key={sequenceId}
              id={sequenceId}
              courseId={courseId}
              sequence={sequences[sequenceId]}
              first={index === 0}
            />
          ))}
        </ol>
      </Collapsible>
    </li>
  );
}

Section.propTypes = {
  courseId: PropTypes.string.isRequired,
  defaultOpen: PropTypes.bool.isRequired,
  expand: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  section: PropTypes.shape().isRequired,
};

export default injectIntl(Section);
