//const baseUrl = 'https://devcondbackend.agenciatecnet.com.br/public/api/admin'
const baseUrl = 'http://localhost:8000/api/admin'
//const baseUrl = 'https://api.b7web.com.br/devcond/api/admin'

const request = async (method, endpoint, params, token = null) => {
  method = method.toLowerCase()
  let fullUrl = `${baseUrl}${endpoint}`
  let body = null

  switch (method) {
    case 'get':
      let queryString = new URLSearchParams(params).toString()
      fullUrl += `?${queryString}`
      break
    case 'post':
    case 'put':
    case 'delete':
      body = JSON.stringify(params);
      break
  }


  let headers = { 'Content-Type': 'application/json' }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  let req = await fetch(fullUrl, { method, headers, body })
  let json = await req.json()
  return json
}

export default () => {
  return {
     /********************************************************************************/ 
 /******************************--__-- Login --__--***********************************/ 
   /********************************************************************************/ 
    getToken: () => {
      return localStorage.getItem('token');
    },

    validateToken: async () => {
      let token = localStorage.getItem('token')
      let json = await request('post', '/auth/validate', {}, token);
      return json
    },

    login: async (email, password) => {
      let json = await request('post', '/auth/login', {email, password});
      return json
    },

    logout: async () => {
      let token = localStorage.getItem('token')
      let json = await request('post', '/auth/logout', {}, token);
      localStorage.removeItem('token');
      return json
    },
  
   /********************************************************************************/ 
 /******************************--__-- Walls --__--***********************************/ 
   /********************************************************************************/ 

    getWall: async () => {
      let token = localStorage.getItem('token');
      let json = await request('get', '/walls', {}, token);
      return json;
    },
    addWall: async  (data) => {
      let token = localStorage.getItem('token');
      let json = await request('post', '/walls', data, token);
      return json;
    },
    updateWall: async (id, data) => {
      let token = localStorage.getItem('token');
      let json = await request('put', `/wall/${id}`, data, token);
      return json;
    },
    removeWall: async (id) => {
      let token = localStorage.getItem('token');
      let json = await request('delete', `/wall/${id}`, { }, token);
      return json;
    },

    /********************************************************************************/ 
 /******************************--__-- Documents --__--***********************************/ 
   /********************************************************************************/ 

   getDocuments: async () => {
    let token = localStorage.getItem('token');
    let json = await request('get', '/docs', {}, token);
    return json;
  },
  addWall: async  (data) => {
    let token = localStorage.getItem('token');
    let json = await request('post', '/walls', data, token);
    return json;
  },
  updateWall: async (id, data) => {
    let token = localStorage.getItem('token');
    let json = await request('put', `/wall/${id}`, data, token);
    return json;
  },
  removeWall: async (id) => {
    let token = localStorage.getItem('token');
    let json = await request('delete', `/wall/${id}`, { }, token);
    return json;
  },
  }
}