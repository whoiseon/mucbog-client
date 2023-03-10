export default function generateSlug(title: string) {
  const lowerCaseTitle = title.toLowerCase();
  const removeSpecialCharacters = lowerCaseTitle.replace(
    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim,
    '',
  );
  const result = removeSpecialCharacters.replace(/\s/gi, '-');
  return result;
}

export function removeSlug(title: string) {
  const result = title.replace(/-/g, ' ');
  return result;
}
