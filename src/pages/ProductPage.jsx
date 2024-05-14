import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import ProductList from '../components/ProductList.jsx';
 
function ProductPage() {
    const { events } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <ProductList events={loadedEvents} />}
      </Await>
    </Suspense>
  )
}

export default ProductPage
async function loadEvents() {
  try {
   
    const token = localStorage.getItem('token');
    console.log(token);
 
    if (!token) {
      throw new Error('Token not found. User is not authenticated.');
    }

    const response = await fetch('https://rails-api-t9q0.onrender.com/api/v1/productdetails', {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch events:', response.status);
      throw new Error('Could not fetch events.');
    }

    const resData = await response.json();
    console.log(resData);
    return resData;
  } catch (error) {
    console.error('Error fetching events:', error.message);
    throw error;
  }
}

  
  export function loader() {
    return defer({
      events: loadEvents(),
    });
  }

