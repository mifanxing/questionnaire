import axios from 'axios'

axios.defaults.baseURL = '/api/'

export const getQuiz = (id) => {
  return axios.get('/quizzes/5a0a9ae130e9251c0cfb1ecf')
}