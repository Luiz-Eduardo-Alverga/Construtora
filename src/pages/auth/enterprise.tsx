import { useQuery } from '@tanstack/react-query'
import { Building2 } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { getUserEnterprises } from '@/api/get-enterprises'
import { LoadingRequests } from '@/components/loading/loading'

interface SelectEnterpriseProps {
  target: string
  user: string
}

export function UsersEnterprises() {
  const location = useLocation()
  const email = location.state?.email
  const navigate = useNavigate()

  const { data: userEnterprises, isLoading } = useQuery({
    queryKey: ['userEnterprises'],
    queryFn: () => getUserEnterprises({ user: email }),
  })

  useEffect(() => {
    // Garantir que userEnterprises é válido e tem dados
    if (userEnterprises?.data?.length === 1) {
      const firstEnterprise = userEnterprises.data[0]
      localStorage.setItem('target', firstEnterprise.target)
      localStorage.setItem('user', firstEnterprise.user)
      navigate('/app')
    }
  }, [navigate, userEnterprises?.data])

  function handleSelectEnterprise({ target, user }: SelectEnterpriseProps) {
    localStorage.setItem('target', target)
    localStorage.setItem('user', user)

    navigate('/app')
  }

  if (isLoading) {
    return <LoadingRequests />
  }

  return (
    <div className="flex items-center flex-col gap-6 justify-center h-screen bg-primary-foreground ">
      {userEnterprises &&
        userEnterprises.data.map((userEnterprise) => (
          <div
            onClick={() =>
              handleSelectEnterprise({
                target: userEnterprise.target,
                user: userEnterprise.user,
              })
            }
            key={userEnterprise.idEmpresa}
            className="p-14 bg-white rounded-md cursor-pointer border border-slate-300 shadow-2xl hover:bg-zinc-100"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex justify-center gap-4 items-center">
                <Building2 className="h-8 w-8 text-primary" />
                <span className=" text-xl text-primary">
                  {userEnterprise.empresa}
                </span>
              </div>

              <span>
                Email: <strong className="text-bold">{email}</strong>{' '}
              </span>
            </div>
          </div>
        ))}
    </div>
  )
}
