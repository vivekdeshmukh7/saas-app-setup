import { TopNav } from '@/components/dashboard/top-nav'
import { SideNav } from '@/components/dashboard/side-nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Side Navigation */}
      <SideNav />
      
      {/* Main Content */}
      <div className="flex-1">
        <TopNav />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
