import Axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL;
export const restConnector = Axios.create({baseURL:baseUrl});
