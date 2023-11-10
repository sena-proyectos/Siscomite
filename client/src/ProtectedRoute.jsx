import { Navigate, Outlet } from 'react-router-dom'
import Cookie from 'js-cookie'

export const ProtectedRoute = ({ redirectPath = '/', allowedRoles = [] }) => {
  const cookie = Cookie.get('token')

  // Simula obtener los roles del usuario desde donde sea que los almacenes (por ejemplo, desde la cookie o el estado global).
  const userRoles = ['Administrador', 'Instructor', 'Coordinador'] // Aquí debes obtener los roles reales del usuario

  // Verifica si al menos uno de los roles del usuario coincide con los roles permitidos.
  const hasPermission = userRoles.some((role) => allowedRoles.includes(role))

  if (!cookie || !hasPermission) {
    return <Navigate to={redirectPath} replace />
  }

  // if (navigator.onLine) {
  //   return <Outlet />
  // } else {
  //   return <Navigate to={redirectPath} replace />
  // }

  return <Outlet />
}
