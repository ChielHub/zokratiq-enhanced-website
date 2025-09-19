'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/navigation/Header'

export function ConditionalHeader() {
  const pathname = usePathname()
  
  // Don't show header on these pages
  const hideHeaderRoutes = ['/welcome', '/subscribe-expired']
  
  if (hideHeaderRoutes.includes(pathname)) {
    return null
  }
  
  return <Header />
}