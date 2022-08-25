import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'yaml';

// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

export const getConfig = () => {
  const environment = getEnv();
  const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  return config;
};
