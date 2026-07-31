import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  viewCourseAs: {
    id: 'instructor.toolbar.view.as',
    defaultMessage: 'View this course as:',
    description: 'Label for the masquerade role selector',
  },
  viewCourseIn: {
    id: 'instructor.toolbar.view.course',
    defaultMessage: 'View course in:',
    description: 'Label preceding Studio / Insights links',
  },
  studio: {
    id: 'instructor.toolbar.studio',
    defaultMessage: 'Studio',
    description: 'Link to open the course in Studio',
  },
  insights: {
    id: 'instructor.toolbar.insights',
    defaultMessage: 'Insights',
    description: 'Link to open the course in Insights',
  },
  staff: {
    id: 'instructor.toolbar.staff',
    defaultMessage: 'Staff',
    description: 'Masquerade as course staff',
  },
  learner: {
    id: 'instructor.toolbar.learner',
    defaultMessage: 'Learner',
    description: 'Masquerade as a generic learner',
  },
  specificStudent: {
    id: 'instructor.toolbar.specificStudent',
    defaultMessage: 'Specific Student...',
    description: 'Masquerade as a specific enrolled student',
  },
});

export default messages;
