
const checkAccessToken = (req: { headers: { authorization: any; }; }) => {
    const { API_ACCESS_TOKEN } = process.env;
    const { authorization } = req.headers;
    
    if (authorization !== `Bearer ${API_ACCESS_TOKEN}`) {
      throw new Error('Unauthorized');
    }
  };
  
  export default checkAccessToken;
  