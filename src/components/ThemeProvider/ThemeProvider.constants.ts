const STYLE = {
  wrapper: 'md-theme-provider',
};

const THEME_CLASS_PREFIX = 'md-theme';

// Some themes are disabled until tokens are properly imported.
const THEME_NAMES = {
  // DARK_BRONZE: 'darkBronze',
  // DARK_INDIGO: 'darkIndigo',
  // DARK_JADE: 'darkJade',
  // DARK_LAVENDER: 'darkLavender',
  // DARK_ROSE: 'darkRose',
  DARK_WEBEX: 'darkWebex',
  // LIGHT_BRONZE: 'lightBronze',
  // LIGHT_INDIGO: 'lightIndigo',
  // LIGHT_JADE: 'lightJade',
  // LIGHT_LAVENDER: 'lightLavender',
  // LIGHT_ROSE: 'lightRose',
  LIGHT_WEBEX: 'lightWebex',
};

const DEFAULTS = {
  THEME: THEME_NAMES.DARK_WEBEX,
};

export { DEFAULTS, STYLE, THEME_CLASS_PREFIX, THEME_NAMES };