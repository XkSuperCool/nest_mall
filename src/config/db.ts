// 开发环境
const devOption = {
  host: '127.0.0.1',
  port: '27017',
  username: '',
  password: '',
  databaseName: 'nest_mall'
}

// 生产环境
const prodOption = {
  host: '127.0.0.1',
  port: '27017',
  username: '',
  password: '',
  databaseName: 'nest_mall'
}

export default process.env.NODE_ENV === 'dev' ? devOption : prodOption;
