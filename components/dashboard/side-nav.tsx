'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  LineChart
} from 'lucide-react'

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Analytics',
    icon: LineChart,
    href: '/dashboard/analytics',
    color: 'text-violet-500',
  },
  {
    label: 'Billing',
    icon: CreditCard,
    href: '/dashboard/billing',
    color: 'text-pink-700',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
    color: 'text-gray-500',
  },
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-stone-900 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">
            Your SaaS
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                'w-full justify-start',
                pathname === route.href && 'bg-white/10'
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
