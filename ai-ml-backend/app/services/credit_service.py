from typing import Dict, Any, Optional
import uuid
from datetime import datetime

class CreditService:
    def __init__(self):
        self.user_credits: Dict[str, int] = {}  # In-memory storage for demo
        self.transactions: Dict[str, Dict] = {}  # In-memory storage for demo
    
    async def get_user_credits(self, user_id: str) -> int:
        """Get user's current credit balance."""
        return self.user_credits.get(user_id, 0)
    
    async def add_credits(self, user_id: str, amount: int) -> None:
        """Add credits to user's balance."""
        current_credits = self.user_credits.get(user_id, 0)
        self.user_credits[user_id] = current_credits + amount
    
    async def deduct_credits(self, user_id: str, amount: int) -> bool:
        """Deduct credits from user's balance."""
        current_credits = self.user_credits.get(user_id, 0)
        if current_credits < amount:
            return False
        
        self.user_credits[user_id] = current_credits - amount
        return True
    
    async def create_transaction(
        self,
        user_id: str,
        amount: float,
        credits: int,
        payment_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """Create a new transaction record."""
        transaction_id = str(uuid.uuid4())
        transaction = {
            "id": transaction_id,
            "user_id": user_id,
            "amount": amount,
            "credits": credits,
            "status": "PENDING",
            "payment_id": payment_id,
            "created_at": datetime.utcnow().isoformat()
        }
        self.transactions[transaction_id] = transaction
        return transaction
    
    async def update_transaction_status(
        self,
        transaction_id: str,
        status: str,
        payment_id: Optional[str] = None
    ) -> Optional[Dict[str, Any]]:
        """Update transaction status and add credits if completed."""
        transaction = self.transactions.get(transaction_id)
        if not transaction:
            return None
        
        transaction["status"] = status
        if payment_id:
            transaction["payment_id"] = payment_id
        
        if status == "COMPLETED":
            await self.add_credits(transaction["user_id"], transaction["credits"])
        
        return transaction
    
    async def get_transaction_history(self, user_id: str) -> list:
        """Get user's transaction history."""
        return [
            t for t in self.transactions.values()
            if t["user_id"] == user_id
        ] 