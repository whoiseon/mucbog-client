export default function translateCategory(category: string) {
  switch (category) {
    case '개발':
      return 'dev';
    case '프로젝트':
      return 'project';
    default:
      return undefined;
  }
}
