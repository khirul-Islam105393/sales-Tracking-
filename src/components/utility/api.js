const postData = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/sale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log('Data posted successfully');
        return true;
      } else {
        console.error('Error posting data:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error posting data:', error);
      return false;
    }
  };
  

  // utility/api.js

 const deleteProduct = async (productId) => {
   
    try {
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
  
      return true; // Indicate successful deletion
    } catch (error) {
      console.error('Error deleting product:', error.message);
      return false; // Indicate deletion failure
    }
  };
  
  
  
  
     
      export { postData,deleteProduct };
