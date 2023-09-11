
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
      let json = await request('post', '/auth/login', { email, password });
      return json
    },

    logout: async () => {
      let token = localStorage.getItem('token')
      let json = await request('post', '/auth/logout', {}, token);
      localStorage.removeItem('token');
      return json
    },
    /********************************************************************************/
    /******************************--__-- Condominios --__--***********************************/
    /********************************************************************************/

    getCondominios: async () => {
      let token = localStorage.getItem('token');
      let json = await request('get', '/condominios', {}, token);
      return json;
    },
    addCondominio: async (data) => {
      let token = localStorage.getItem('token');
      let formData = new FormData();
      formData.append('name', data.name);
      formData.append('code', data.code);
      formData.append('cnpj', data.cnpj);
      formData.append('Thumb', data.Thumb);
      formData.append('description', data.description);
      formData.append('address', data.address);
      formData.append('adress_number', data.adress_number);
      formData.append('city', data.city);
      formData.append('district', data.district);
      formData.append('address_zip', data.address_zip);
      formData.append('state', data.state);
      formData.append('billit', data.billit);



      if (data.Thumb) {
        formData.append('thumb', data.thumb);
      }
      let req = await fetch(`${baseUrl}/condominios`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      let json = await req.json();
      return json;
    },
    updateCondominio: async (id, data) => {
      let token = localStorage.getItem('token');
      let formData = new FormData();
      formData.append('name', data.name);
      formData.append('code', data.code);
      formData.append('cnpj', data.cnpj);
      formData.append('Thumb', data.Thumb);
      formData.append('description', data.description);
      formData.append('address', data.address);
      formData.append('adress_number', data.adress_number);
      formData.append('city', data.city);
      formData.append('district', data.district);
      formData.append('address_zip', data.address_zip);
      formData.append('state', data.state);
      formData.append('billit', data.billit);



      if (data.Thumb) {
        formData.append('thumb', data.thumb);
      }
      let req = await fetch(`${baseUrl}/condominio/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      let json = await req.json();
      return json;
    },

    removeCondominio: async (id) => {
      let token = localStorage.getItem('token');
      let json = await request('delete', `/condominio/${id}`, {}, token);
      return json;
    },

    /********************************************************************************/
    /******************************--__-- Walls --__--***********************************/
    /********************************************************************************/

    getWall: async () => {
      let token = localStorage.getItem('token');
      let json = await request('get', '/walls', {}, token);
      return json;
    },
    addWall: async (data) => {
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
      let json = await request('delete', `/wall/${id}`, {}, token);
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
    addDocument: async (data) => {
      let token = localStorage.getItem('token');
      let formData = new FormData();
      formData.append('title', data.title);
      if (data.file) {
        formData.append('file', data.file);
      }
      let req = await fetch(`${baseUrl}/docs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      let json = await req.json();
      return json;
    },
    updateDocument: async (id, data) => {
      let token = localStorage.getItem('token');
      let formData = new FormData();
      formData.append('title', data.title);
      if (data.file) {
        formData.append('file', data.file);
      }
      let req = await fetch(`${baseUrl}/doc/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      let json = await req.json();
      return json;
    },
    removeDocument: async (id) => {
      let token = localStorage.getItem('token');
      let json = await request('delete', `/doc/${id}`, {}, token);
      return json;
    },


    /********************************************************************************/
    /******************************--__-- Reservations --__--***********************************/
    /********************************************************************************/

    getReservations: async () => {
      let token = localStorage.getItem('token');
      let json = await request('get', `/reservations`, {}, token);
      return json;
    },
    addReservation: async (data) => {
      let token = localStorage.getItem('token');
      let json = await request('POST', '/reservations', data, token);
      return json;
    },
    updateReservation: async (id, data) => {
      let token = localStorage.getItem('token');
      let json = await request('put', `/reservation/${id}`, data, token);
      return json
    },
    removeReservation: async (id) => {
      let token = localStorage.getItem('token');
      let json = await request('delete', `/reservation/${id}`, {}, token);
      return json

    },


    /********************************************************************************/
    /******************************--__-- Units --__--***********************************/
    /********************************************************************************/

    getUnits: async () => {
      let token = localStorage.getItem('token');
      let json = await request('get', `/units`, {}, token);
      return json;
    },
    addUnit: async (data) => {
      let token = localStorage.getItem('token');
      let json = await request('post', `/units`, data, token);
      return json;
    },
    updateUnit: async (id, data) => {
      let token = localStorage.getItem('token');
      let json = await request('put', `/unit/${id}`, data, token);
      return json;
    },
    removeUnit: async (id) => {
      let token = localStorage.getItem('token');
      let json = await request('delete', `/unit/${id}`, {}, token);
      return json;
    },

      /********************************************************************************/
    /******************************--__-- Areas --__--***********************************/
    
    getAreas: async()=>{
      let token = localStorage.getItem('token');
      console.log(token);
      let json = await request('get', `/areas`, {}, token);  
      return json;
  },
     addArea: async(data)=>{
            let token = localStorage.getItem('token');
            let formData = new FormData();
            for ( let i in data){
                formData.append(i,data[i])
            }
            let req = await fetch(
                `${baseUrl}/areas`,
                {
                    method: 'POST',
                    headers: {'Authorization': `Bearer ${token}`},
                    body: formData
                 });
            let json = req.json();
            return json;
        },
        updateArea: async(id, data)=>{
            let token = localStorage.getItem('token');
            let formData = new FormData();
            for ( let i in data){
                formData.append(i,data[i])
            }
            let req = await fetch(
                `${baseUrl}/area/${id}`,
                {
                    method: 'POST',
                    headers: {'Authorization': `Bearer ${token}`},
                    body: formData
                 });
            let json = req.json();
            return json;
        },
        updateAreaAllowed: async (id)=>{
            let token = localStorage.getItem('token');
            let json = await request('put', `/area/${id}/allowed`, {}, token);  
            return json;
        },
        removeArea: async (id) => {
          let token = localStorage.getItem('token');
          let json = await request('delete', `/area/${id}`, {}, token);
          return json;
        },


    /********************************************************************************/
    /******************************--__-- Users --__--***********************************/
    /********************************************************************************/

    getUsers: async () => {
      let token = localStorage.getItem('token');
      let json = await request('get', '/users', {}, token);
      return json;
    },
    addUser: async (data) => {
      let token = localStorage.getItem('token');
      let json = await request('post', '/user', data, token);
      return json;
    },
    updateUser: async (id, data) => {
      let token = localStorage.getItem('token');
      let json = await request('put', `/user/${id}`, data, token);
      return json;
    },
    removeUser: async (id) => {
      let token = localStorage.getItem('token');
      let json = await request('delete', `/user/${id}`, {}, token);
      return json;
    },
    searchUser: async (query)=>{
      let token = localStorage.getItem('token');
      let json = await request('get', `/users/search`, {q:query}, token);  
      return json;
  },
  }
}
