export const uploadPhoto = async (uri: string, token: string) => {
    const formData = new FormData();
    const filename = uri.split('/').pop();
    
    formData.append('photo', {
      uri,
      name: filename,
      type: 'image/jpeg'
    });
   
    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
   
    return response.json();
   };