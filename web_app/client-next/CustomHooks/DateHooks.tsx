import { useSearchParams } from 'next/navigation'

export const useGetDateFromUrl = () => {
  const searchParams = useSearchParams()
  const date = searchParams?.get('date')
  return date ? new Date(date) : new Date()
}
