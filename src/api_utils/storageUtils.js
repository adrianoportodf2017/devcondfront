
  
  export const getAllPages = () => {
    const pages = getFromLocalStorage('pages');
    console.log(pages);
    return pages || [];
  };

  export const getByPageById = (pageId) => {
    try {
      const pages = getFromLocalStorage('pages');
      if (!pages) {
        console.error("No pages found in localStorage");
        return null;
      }
      
      const pageIndex = pages.findIndex(page => page._id == pageId);
      if (pageIndex == -1) {
        console.error(`Page with id ${pageId} not found`);
        return null;
      }
  
      const page = pages[pageIndex];
      console.log(`Page found:`, page);
      return page;
    } catch (e) {
      console.error("Could not retrieve page from localStorage", e);
      return null;
    }
  };
  
  export const addPage = (name) => {
    const pages = getAllPages();
    const newPage = { _id: Date.now(), name };
    pages.push(newPage);
    saveToLocalStorage('pages', pages);
    return newPage;
  };

  // storageUtils.js
export const saveAssetsToLocalStorage = (assets) => {
    saveToLocalStorage('assets', assets);
  };
  
  export const getAssetsFromLocalStorage = () => {
    return getFromLocalStorage('assets') || [];
  };

  
  /*export const saveToLocalStorage = (key, data) => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
      console.log(`Data saved to localStorage with key "${key}":`, data);
    } catch (e) {
      console.error("Could not save data to localStorage", e);
    }
  };**/

// Função para salvar os dados no localStorage
export const saveToLocalStorage = (pageId, newData) => {
    try {
      const pages = getFromLocalStorage('pages') || [];
      const pageIndex = pages.findIndex(page => page._id == pageId);
  
      if (pageIndex !== -1) {
        // Atualiza a página específica com os novos dados
        pages[pageIndex] = { ...pages[pageIndex], ...newData };
      } else {
        // Se a página não for encontrada, adiciona-a
        pages.push({ _id: pageId, ...newData });
      }
  
      // Salva a lista atualizada de páginas no localStorage
      const serializedPages = JSON.stringify(pages);
      localStorage.setItem('pages', serializedPages);
  
      console.log(`Data saved to localStorage for page "${pageId}":`, newData);
    } catch (e) {
      console.error("Could not save data to localStorage", e);
    }
  };
  
  export const getFromLocalStorage = (key) => {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) return undefined;
      return JSON.parse(serializedData);
    } catch (e) {
      console.error("Could not get data from localStorage", e);
      return undefined;
    }
  };
  