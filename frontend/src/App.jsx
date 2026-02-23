import { RouterProvider } from "react-router"
import {router} from "./AppRoutes.jsx"
import "./features/shared/global.scss"
import { AuthProvider } from './features/auth/auth.context.jsx'

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
