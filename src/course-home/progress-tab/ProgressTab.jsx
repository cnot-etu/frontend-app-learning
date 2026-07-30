import React from 'react';
import { useSelector } from 'react-redux';

import CourseCompletion from './course-completion/CourseCompletion';
import CourseGrade from './grades/course-grade/CourseGrade';
import DetailedGrades from './grades/detailed-grades/DetailedGrades';
import GradeSummary from './grades/grade-summary/GradeSummary';
import ProgressHeader from './ProgressHeader';

import { useModel } from '../../generic/model-store';

function ProgressTab() {
  const {
    courseId,
  } = useSelector(state => state.courseHome);

  const {
    gradesFeatureIsFullyLocked,
  } = useModel('progress', courseId);

  const applyLockedOverlay = gradesFeatureIsFullyLocked ? 'locked-overlay' : '';

  return (
    <div className="leti-progress-tab progress-tab">
      <ProgressHeader />
      <div className="row w-100 m-0">
        <div className="col-12 p-0">
          <CourseCompletion />
          <CourseGrade />
          <div className={`grades my-4 p-4 rounded raised-card ${applyLockedOverlay}`} aria-hidden={gradesFeatureIsFullyLocked}>
            <GradeSummary />
            <DetailedGrades />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressTab;
