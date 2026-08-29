import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { FiClock, FiCheckCircle, FiAlertCircle, FiExternalLink } from 'react-icons/fi';

export default async function DeploymentsPage() {
  const session = await getServerSession(authOptions);

  const deployments = await prisma.deployment.findMany({
    where: {
      project: {
        userId: session!.user.id,
      },
    },
    include: {
      project: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      deployed: 'text-green-400 bg-green-500/20 border-green-500/30',
      building: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
      failed: 'text-red-400 bg-red-500/20 border-red-500/30',
      pending: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
      stopped: 'text-gray-400 bg-gray-500/20 border-gray-500/30',
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed':
        return <FiCheckCircle />;
      case 'building':
      case 'pending':
        return <FiClock />;
      case 'failed':
        return <FiAlertCircle />;
      default:
        return <FiClock />;
    }
  };

  const formatDuration = (ms: number | null) => {
    if (!ms) return '-';
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Deployments</h1>
        <p className="text-gray-400">View and manage your deployments</p>
      </div>

      {deployments.length === 0 ? (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-12 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">No deployments yet</h3>
          <p className="text-gray-400">Deploy a project to see it here</p>
        </div>
      ) : (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  URL
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {deployments.map((deployment) => (
                <tr key={deployment.id} className="hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {deployment.project.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {deployment.project.framework}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium ${getStatusColor(deployment.status)}`}>
                      {getStatusIcon(deployment.status)}
                      <span className="capitalize">{deployment.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatDuration(deployment.buildDuration)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(deployment.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {deployment.url ? (
                      <a
                        href={deployment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                      >
                        View <FiExternalLink />
                      </a>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
