import axios from 'axios';

const url = 'http://localhost:5000/posts'; //Coonecting with backend

export const fetchPosts = () => axios.get(url);