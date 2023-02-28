type ThemeVariables = {
  bg_page: string;
  bg_element1: string;
  bg_element2: string;
  bg_element3: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  border1: string;
  border2: string;
  border3: string;
  border4: string;
};

type Theme = 'light' | 'dark';
type VariableKey = keyof ThemeVariables;
type ThemedPalette = Record<VariableKey, string>;

const themeVariableSets: Record<Theme, ThemeVariables> = {
  light: {
    bg_page: '#FFFFFF',
    bg_element1: '#FFFFFF',
    bg_element2: '#E9ECEF',
    bg_element3: '#F8F9FA',
    text1: '#212529',
    text2: '#495057',
    text3: '#868E96',
    text4: '#CDD3E4',
    border1: '#343A40',
    border2: '#ADB5BD',
    border3: '#DEE2E6',
    border4: '#F1F3F5',
  },
  dark: {
    bg_page: '#121212',
    bg_element1: '#1E1E1E',
    bg_element2: '#1E1E1E',
    bg_element3: '#252525',
    text1: '#ECECEC',
    text2: '#D9D9D9',
    text3: '#ACACAC',
    text4: '#666666',
    border1: '#2A2A2A',
    border2: '#4D4D4D',
    border3: '#A0A0A0',
    border4: '#E0E0E0',
  },
};

const buildCssVariables = (variables: ThemeVariables) => {
  const keys = Object.keys(variables) as (keyof ThemeVariables)[];
  return keys.reduce(
    (acc, key) =>
      acc.concat(`--${key.replace(/_/g, '-')}: ${variables[key]};`, '\n'),
    '',
  );
};

export const themes = {
  light: buildCssVariables(themeVariableSets.light),
  dark: buildCssVariables(themeVariableSets.dark),
};

const cssVar = (name: string) => `var(--${name.replace(/_/g, '-')})`;

const variableKeys = Object.keys(themeVariableSets.light) as VariableKey[];

export const themedPalette: Record<VariableKey, string> = variableKeys.reduce(
  (acc, current) => {
    acc[current] = cssVar(current);
    return acc;
  },
  {} as ThemedPalette,
);

console.log(themes);
