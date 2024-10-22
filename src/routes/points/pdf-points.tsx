import { RouteObject } from 'react-router-dom'

import { EmploeePDF } from '@/pages/app/ponto/Usuarios/pdf-employee'

export const pdfPointsRoute: RouteObject = {
  path: '/ponto/usuarios/:id/:dateFrom/:dateTo/imprimir',
  element: <EmploeePDF />,
}
