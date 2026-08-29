import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { deploymentService } from '@/lib/deployment';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const result = await deploymentService.createDeployment(id);

    return NextResponse.json({
      success: true,
      deploymentId: result.deploymentId,
      status: result.status,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Deployment failed' },
      { status: 500 }
    );
  }
}
