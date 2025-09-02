import { Button } from '@mui/material';
import React from 'react';

const Other = () => {
  return (
    <>
    <div className='flex justify-between p-[10px_20px]'>
      <div>
        
      <Button onClick={()=>window.location = '/categories'}>Categories</Button>
      <Button onClick={()=>window.location = '/subcategory'}>Brands</Button>
      <Button onClick={()=>window.location = '/brands'}>Banners</Button>
      </div>
       <button  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
          + Add order
        </button>
    </div>
    </>
  );
}

export default Other;
