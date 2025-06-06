import FormProfile from "./form-profile";
import FormChangePassword from "./form-change-password";
export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">My Profile</h2>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <div className="text-lg font-medium">Profile Management</div>
        <p className="text-muted-foreground">
          Manage your profile information.
        </p>
        <div className="flex justify-between gap-2 flex-col mt-8">
          <FormProfile />
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <div className="text-lg font-medium">Change Password</div>
        <p className="text-muted-foreground">
          You can change your password in this section.
        </p>
        <div className="flex justify-between gap-2 flex-col mt-8">
          <FormChangePassword />
        </div>
      </div>
    </div>
  );
}
