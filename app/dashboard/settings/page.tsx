import { Separator } from '@/components/ui/separator'
import { ProfileForm } from '@/components/settings/profile-form'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator />
      <div className="grid gap-10">
        <ProfileForm />
      </div>
    </div>
  )
}
