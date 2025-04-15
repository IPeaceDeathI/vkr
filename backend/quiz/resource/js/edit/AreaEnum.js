export const QUES = 'ques';
export const SETTING = 'setting';
export const INSTALL = 'install';

export function getSelector(area_name) {
   return `#${area_name}`;
}