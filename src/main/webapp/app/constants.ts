// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

export const VERSION = process.env.VERSION;
// export const DEBUG_INFO_ENABLED: boolean = !!process.env.DEBUG_INFO_ENABLED;
export const SERVER_API_URL = process.env.SERVER_API_URL;
export const BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP;

// Errors
export const PROBLEM_BASE_URL = 'https://www.jhipster.tech/problem';
export const EMAIL_ALREADY_USED_TYPE = PROBLEM_BASE_URL + '/email-already-used';
export const LOGIN_ALREADY_USED_TYPE = PROBLEM_BASE_URL + '/login-already-used';
export const EMAIL_NOT_FOUND_TYPE = PROBLEM_BASE_URL + '/email-not-found';

export const UPLOAD_IMAGE_URL = SERVER_API_URL + 'api/upload-images';
export const UPLOAD_FILE_URL = SERVER_API_URL + 'api/upload-files';
export const echartsColor = [
  '#3FA1FF',
  '#3ECBCB',
  '#50CB74',
  '#FBD444',
  '#F2637B',
  '#9860E5',
  '#ca8622',
  '#bda29a',
  '#6e7074',
  '#546570',
  '#c4ccd3',
];
