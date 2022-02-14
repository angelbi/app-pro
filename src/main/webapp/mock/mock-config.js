const path = require('path');
const fs = require('fs');

const config = {
  '/mock/api/json/data': {
    data: {
      result: 'mocked',
    },
  },
  '/mock/api/area': {
    path: path.join(__dirname, './json/area.json'),
  },
  '/mock/api/workplace_teams': {
    path: path.join(__dirname, './json/workplace_teams.json'),
  },
  '/mock/api/service': {
    path: path.join(__dirname, './json/service.json'),
  },
  '/mock/api/workplace_radar': {
    path: path.join(__dirname, './json/workplace_radar.json'),
  },
  '/mock/api/workplace_activity': {
    path: path.join(__dirname, './json/workplace_activity.json'),
  },
  '/mock/api/workplace_projects': {
    path: path.join(__dirname, './json/workplace_projects.json'),
  },
  '/mock/api/mockjs/data': {
    data: {
      'result|3': '*',
    },
  },
  '/mock/api/mockjs/path': {
    path: path.join(__dirname, './json/mockjs.json'),
  },
};

function getJsonRouter() {
  const result = {};
  const files = fs.readdirSync(path.join(__dirname, './json'));
  for (const file of files) {
    const fileStat = fs.lstatSync(path.join(path.join(__dirname, './json'), file));
    if (!fileStat.isDirectory()) {
      if (path.extname(path.join(path.join(__dirname, './json'), file)) === 'json') {
        const item = {};
        item[`/mock/api/${path.basename(file)}`] = { path: path.join(path.join(__dirname, './json'), file) };
        result.push(item);
      }
    }
    // 目录未处理
  }
  console.log(result);
  return result;
}

module.exports = config;
