type ThemeVariables = {
  bg_page: string;
  bg_element1: string;
  bg_element2: string;
  bg_element3: string;
  bg_element4: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  border1: string;
  border2: string;
  border3: string;
  border4: string;
  primary1: string;
  primary2: string;
  destructive1: string;
  destructive2: string;
  button_text: string;
  placeholder: string;
};

type Theme = 'light' | 'dark';
type VariableKey = keyof ThemeVariables;
type ThemedPalette = Record<VariableKey, string>;

const themeVariableSets: Record<Theme, ThemeVariables> = {
  light: {
    bg_page: '#FAFAFA',
    bg_element1: '#FFFFFF',
    bg_element2: '#F8F9FA',
    bg_element3: '#E9ECEF',
    bg_element4: '#E2E2E2',
    text1: '#121212',
    text2: '#495057',
    text3: '#868E96',
    text4: '#CDE4CF',
    border1: '#343A40',
    border2: '#A2AAB2',
    border3: '#C7CBCF',
    border4: '#D7DBDF',
    primary1: '#4DB33D',
    primary2: '#71C264',
    destructive1: '#FB4E4E',
    destructive2: '#FC7171',
    button_text: '#FFFFFF',
    placeholder: '#868E96',
  },
  dark: {
    bg_page: '#121212',
    bg_element1: '#191919',
    bg_element2: '#252525',
    bg_element3: '#2F2F2F',
    bg_element4: '#C2C2C2',
    text1: '#ECECEC',
    text2: '#D9D9D9',
    text3: '#ACACAC',
    text4: '#666666',
    border1: '#E0E0E0',
    border2: '#A0A0A0',
    border3: '#4D4D4D',
    border4: '#313131',
    primary1: '#0CA581',
    primary2: '#0A8467',
    destructive1: '#ED6D5F',
    destructive2: '#BE574C',
    button_text: '#121212',
    placeholder: '#666666',
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
