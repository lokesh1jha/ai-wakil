import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CreditBalance() {
  const [credits, setCredits] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    try {
      const response = await fetch('/api/credits/balance');
      const data = await response.json();
      setCredits(data.credits);
    } catch (error) {
      console.error('Failed to fetch credits:', error);
    }
  };

  return (
    <Card className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Coins className="h-5 w-5 text-yellow-500" />
        <div>
          <p className="text-sm text-muted-foreground">Available Credits</p>
          <p className="text-2xl font-bold">{credits}</p>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={() => router.push('/credits/purchase')}
      >
        Buy Credits
      </Button>
    </Card>
  );
} 