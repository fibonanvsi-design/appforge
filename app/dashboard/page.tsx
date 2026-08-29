import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { FiPlus, FiFolder, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const projects = await prisma.project.findMany({
    where: { userId: session!.user.id },
    include: {
      deployments: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
    orderBy: { updatedAt: 'desc' },
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      deployed: 'bg-green-500/20 text-green-400 border-green-500/30',
      building: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      failed: 'bg-red-500/20 text-red-400 border-red-500/30',
      pending: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed':
        return <FiCheckCircle />;
      case 'building':
        return <FiClock />;
      case 'failed':
        return <FiAlertCircle />;
      default:
        return <FiClock />;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {session!.user.name || session!.user.email}
        </h1>
        <p className="text-gray-400">Build, customize and deploy your web apps</p>
      </div>

      <div className="mb-8">
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <FiPlus className="text-xl" />
          New Project
        </Link>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Projects</h2>
      </div>

      {projects.length === 0 ? (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-12 text-center">
          <FiFolder className="text-6xl text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
          <p className="text-gray-400 mb-6">Create your first project to get started</p>
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <FiPlus />
            Create Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const latestDeployment = project.deployments[0];
            const deploymentStatus = latestDeployment?.status || 'pending';

            return (
              <div
                key={project.id}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-400">{project.framework}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium ${getStatusBadge(deploymentStatus)}`}>
                    {getStatusIcon(deploymentStatus)}
                    <span className="capitalize">{deploymentStatus}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  Updated {new Date(project.updatedAt).toLocaleDateString()}
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/editor/${project.id}`}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg text-center transition-colors"
                  >
                    Open
                  </Link>
                  {latestDeployment?.status === 'deployed' && latestDeployment.url && (
                    <a
                      href={latestDeployment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      View
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
