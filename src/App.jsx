

import './App.css'
import AdminRouters from './Routers/adminRouter';
import UserRouter from './Routers/userRouter'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'; // import Toaster

const routes = [...UserRouter, ...AdminRouters];
const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Router */}
      <RouterProvider router={router} />
    </>
  )
}

export default App;



// import './App.css'
// import AdminRouters from './Routers/AdminRouter';
// import UserRouter from './Routers/UserRouter'
// import { createBrowserRouter, RouterProvider} from 'react-router-dom'


// const routes = [...UserRouter,...AdminRouters];
// const router = createBrowserRouter(routes)




//  function App() {
//   return (
//     <>
//     <RouterProvider router={router} />
//     </>
//   )
//  }

//  export default App

 

// function App() {


//   return (
//     <>
//       <div>
//       <BrowserRouter>
//         <Routes>

//           <Route  path='/*' element={< UserRouter />} />
//           <Route  path='/admin/*' element={< AdminRouter />} />

//         </Routes>
//        </BrowserRouter>
//       </div>
//     </>
//   )
// }

// export default App


