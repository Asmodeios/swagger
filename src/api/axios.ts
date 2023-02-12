import axios from 'axios'

export const getSwagger = () => {
  return axios.get('https://petstore.swagger.io/v2/swagger.json')
}