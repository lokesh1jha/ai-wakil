import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

const CREDIT_PACKAGES = [
  { credits: 10, price: 5 },
  { credits: 25, price: 10 },
  { credits: 50, price: 18 },
  { credits: 100, price: 30 },
];

export default function PurchaseCreditsPage() {
  const [selectedPackage, setSelectedPackage] = useState(CREDIT_PACKAGES[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePurchase = async () => {
    try {
      setIsProcessing(true);
      const response = await fetch('/api/credits/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedPackage.price,
          credits: selectedPackage.credits,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process payment');
      }

      // TODO: Handle successful payment
      router.push('/dashboard');
    } catch (error) {
      console.error('Payment failed:', error);
      // TODO: Show error message to user
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-3xl font-bold mb-8">Purchase Credits</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {CREDIT_PACKAGES.map((pkg) => (
          <Card
            key={pkg.credits}
            className={`p-4 cursor-pointer transition-colors ${
              selectedPackage.credits === pkg.credits
                ? 'border-primary'
                : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedPackage(pkg)}
          >
            <div className="text-center">
              <p className="text-2xl font-bold">{pkg.credits}</p>
              <p className="text-sm text-muted-foreground">Credits</p>
              <p className="text-lg font-semibold mt-2">${pkg.price}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        <div className="space-y-4">
          <div>
            <Label>Selected Package</Label>
            <p className="text-lg font-semibold">
              {selectedPackage.credits} Credits - ${selectedPackage.price}
            </p>
          </div>
          
          {/* TODO: Add payment form fields */}
          <div className="space-y-2">
            <Label>Card Number</Label>
            <Input placeholder="1234 5678 9012 3456" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Expiry Date</Label>
              <Input placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label>CVV</Label>
              <Input placeholder="123" />
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handlePurchase}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Purchase Credits'}
          </Button>
        </div>
      </Card>
    </div>
  );
} 