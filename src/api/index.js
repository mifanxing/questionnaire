import axios from 'axios'

//配置请求根url，便于devServer代理路由
axios.defaults.baseURL = '/api/'

//页面获取quiz
export const getQuiz = (id) => {
  return axios.get('/quizzes/5a0a9ae130e9251c0cfb1ecf')
}

//首页点击开始答题，创建session

export const postSession = (id) => {
  return axios.post(`/quizzes/${id}/sessions`)
}

