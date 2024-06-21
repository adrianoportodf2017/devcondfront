const baseUrl = 'https://devcondbackend.agenciatecnet.com.br/public/api/admin'
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


export const updatePageById = async (pageId, newData) => {
     console.log(pageId);
     console.log(newData);
     const serializedPages = JSON.stringify(newData);

      let token = localStorage.getItem('token');
      let formData = new FormData();
      formData.append('title', 'teste edicao');
      formData.append('content', serializedPages);
      formData.append('status', '1');

      console.log(formData);
      let req = await fetch(
        `${baseUrl}/page/${pageId}`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });
      let json = req.json();
      return json;
};