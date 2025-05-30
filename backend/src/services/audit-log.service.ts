import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type ActionType = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT';

export class AuditLogService {
  async createLog(
    userId: string,
    actionType: ActionType,
    resourceType: string,
    resourceId: string,
    details?: any
  ) {
    return prisma.auditLog.create({
      data: {
        userId,
        actionType,
        resourceType,
        resourceId,
        details: details || {}
      }
    });
  }

  async getLogsByUser(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where: { userId },
        orderBy: { timestamp: 'desc' },
        skip,
        take: limit
      }),
      prisma.auditLog.count({
        where: { userId }
      })
    ]);

    return {
      logs,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getLogsByResource(resourceType: string, resourceId: string) {
    return prisma.auditLog.findMany({
      where: {
        resourceType,
        resourceId
      },
      orderBy: { timestamp: 'desc' }
    });
  }

  async getLogsByActionType(actionType: ActionType, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where: { actionType },
        orderBy: { timestamp: 'desc' },
        skip,
        take: limit
      }),
      prisma.auditLog.count({
        where: { actionType }
      })
    ]);

    return {
      logs,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }
} 