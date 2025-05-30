import { PrismaClient } from '@prisma/client';
import { BadRequestError } from '../utils/errors';

const prisma = new PrismaClient();

export class CreditService {
  async getUserCredits(userId: string): Promise<number> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true }
    });
    return user?.credits || 0;
  }

  async deductCredits(userId: string, amount: number): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true }
    });

    if (!user || user.credits < amount) {
      throw new BadRequestError('Insufficient credits');
    }

    await prisma.user.update({
      where: { id: userId },
      data: { credits: { decrement: amount } }
    });

    return true;
  }

  async addCredits(userId: string, amount: number): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: amount } }
    });
  }

  async createTransaction(
    userId: string,
    amount: number,
    credits: number,
    paymentId?: string
  ) {
    return prisma.transaction.create({
      data: {
        userId,
        amount,
        credits,
        status: 'PENDING',
        paymentId
      }
    });
  }

  async updateTransactionStatus(
    transactionId: string,
    status: 'COMPLETED' | 'FAILED',
    paymentId?: string
  ) {
    const transaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { status, paymentId }
    });

    if (status === 'COMPLETED') {
      await this.addCredits(transaction.userId, transaction.credits);
    }

    return transaction;
  }

  async getTransactionHistory(userId: string) {
    return prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }
} 