import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account settings</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                defaultValue={session?.user.name || ''}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                defaultValue={session?.user.email || ''}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                disabled
              />
            </div>
            <p className="text-xs text-gray-500">
              Profile editing will be available in a future update
            </p>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">User ID</label>
              <div className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-400 text-sm font-mono">
                {session?.user.id}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Preferences</h2>
          <p className="text-sm text-gray-400">
            Additional settings will be available in future updates
          </p>
        </div>
      </div>
    </div>
  );
}
