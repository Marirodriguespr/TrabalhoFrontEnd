
import { ChakraProvider } from '@chakra-ui/react';
import ListFirst from './pages/ListFirst';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Details from './pages/Details';


const routes = createBrowserRouter([
  {
    path: '/',
    element: <ListFirst />
  },
  {
    path: '/detail/:nameCountry',
    element: <Details />
  }
])

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={routes}>
        <ListFirst />
      </RouterProvider>
    </ChakraProvider>

  );
}

export default App;
