from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from typing import Optional
from ..core.security import create_access_token
from ..core.config import settings

router = APIRouter()

# This is a simple in-memory user store for demonstration
# In production, you should use a proper database
USERS = {
    "admin": {
        "username": "admin",
        "password": "admin123",  # In production, use hashed passwords
        "disabled": False
    }
}

@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Get access token for authentication."""
    user = USERS.get(form_data.username)
    if not user or user["password"] != form_data.password or user["disabled"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/register")
async def register(username: str, password: str):
    """Register a new user."""
    if username in USERS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    USERS[username] = {
        "username": username,
        "password": password,  # In production, hash the password
        "disabled": False
    }
    
    return {"message": "User registered successfully"} 