/**
 * Translate common Studio grading-policy assignment type labels.
 * Uses an explicit locale map so labels work even when the i18n JSON
 * catalog in the running bundle is stale / missing these ids.
 */
import { getLocale } from '@edx/frontend-platform/i18n';

const LABELS = {
  other: {
    en: 'Other',
    ru: 'Другое',
    es: 'Otro',
    'es-es': 'Otro',
    'es-419': 'Otro',
    fr: 'Autre',
    pt: 'Outro',
    'pt-pt': 'Outro',
    'pt-br': 'Outro',
  },
  'graded assignments': {
    en: 'Graded Assignments',
    ru: 'Оцениваемые задания',
    es: 'Tareas calificadas',
    'es-es': 'Tareas calificadas',
    'es-419': 'Tareas calificadas',
    fr: 'Devoirs notés',
    pt: 'Trabalhos classificados',
    'pt-pt': 'Trabalhos classificados',
    'pt-br': 'Atividades avaliadas',
  },
  'graded assignment': {
    en: 'Graded Assignment',
    ru: 'Оцениваемое задание',
    es: 'Tarea calificada',
    'es-es': 'Tarea calificada',
    'es-419': 'Tarea calificada',
    fr: 'Devoir noté',
    pt: 'Trabalho classificado',
    'pt-pt': 'Trabalho classificado',
    'pt-br': 'Atividade avaliada',
  },
  homework: {
    en: 'Homework',
    ru: 'Домашнее задание',
    es: 'Tarea',
    'es-es': 'Tarea',
    'es-419': 'Tarea',
    fr: 'Devoir',
    pt: 'Trabalho de casa',
    'pt-pt': 'Trabalho de casa',
    'pt-br': 'Lição de casa',
  },
  exam: {
    en: 'Exam',
    ru: 'Экзамен',
    es: 'Examen',
    'es-es': 'Examen',
    'es-419': 'Examen',
    fr: 'Examen',
    pt: 'Exame',
    'pt-pt': 'Exame',
    'pt-br': 'Exame',
  },
  'midterm exam': {
    en: 'Midterm Exam',
    ru: 'Промежуточный экзамен',
    es: 'Examen parcial',
    'es-es': 'Examen parcial',
    'es-419': 'Examen parcial',
    fr: 'Examen de mi-parcours',
    pt: 'Exame intermédio',
    'pt-pt': 'Exame intermédio',
    'pt-br': 'Exame intermediário',
  },
  'final exam': {
    en: 'Final Exam',
    ru: 'Итоговый экзамен',
    es: 'Examen final',
    'es-es': 'Examen final',
    'es-419': 'Examen final',
    fr: 'Examen final',
    pt: 'Exame final',
    'pt-pt': 'Exame final',
    'pt-br': 'Exame final',
  },
};

function resolveLocaleKey(locale) {
  const normalized = String(locale || 'en').toLowerCase().replace(/_/g, '-');
  if (normalized.startsWith('ru')) {
    return 'ru';
  }
  if (normalized.startsWith('fr')) {
    return normalized === 'fr-ca' ? 'fr' : 'fr';
  }
  if (normalized.startsWith('es')) {
    return normalized === 'es-419' ? 'es-419' : 'es-es';
  }
  if (normalized.startsWith('pt')) {
    return normalized === 'pt-br' ? 'pt-br' : 'pt-pt';
  }
  if (normalized.startsWith('en')) {
    return 'en';
  }
  return normalized;
}

export default function translateAssignmentType(intl, assignmentType) {
  if (!assignmentType) {
    return assignmentType;
  }

  const raw = String(assignmentType).trim();
  const entry = LABELS[raw.toLowerCase()];
  if (!entry) {
    return assignmentType;
  }

  const locale = resolveLocaleKey(getLocale() || (intl && intl.locale) || 'en');
  return entry[locale] || entry[locale.split('-')[0]] || entry.en || raw;
}
