from fastapi import APIRouter, Depends, HTTPException, Response, Request
import requests, os
from pydantic import BaseModel, EmailStr

class LoginForm(BaseModel):
    email: EmailStr
    password: str

class SignupForm(BaseModel):
    email: EmailStr
    password: str
    role: str = "user"

router = APIRouter()

@router.post("/login")
async def login(response: Response, form_data: LoginForm):
    try:
        res = requests.post(
            f"http://app-admin:3000/cms/api/users/login",
            json=form_data.dict(),
            headers={"Content-Type": "application/json"},
        )

        payload_data = res.json()
        # Extracting the cookie from the response and setting it in the FastAPI response
        response.set_cookie(key="payload-token", value=res.cookies.get('payload-token'))
        return payload_data
    except:
        return payload_data

@router.post("/signup")
async def signup(response: Response, form_data: SignupForm):
    try:
        res = requests.post(
            "http://app-admin:3000/cms/api/users",
            json=form_data.dict(),
            headers={"Content-Type": "application/json"},
        )

        payload_data = res.json()
        # Extracting the cookie from the response and setting it in the FastAPI response
        response.set_cookie(key="payload-token", value=res.cookies.get('payload-token'))
        return payload_data
    except:
        return payload_data

@router.post("/logout")
async def logout(request: Request, response: Response):
    res = requests.post(
        "http://app-admin:3000/cms/api/users/logout",
        headers={"Content-Type": "application/json"},
        cookies=request.cookies
    )

    if res.status_code != 200:
        raise HTTPException(status_code=res.status_code, detail=res.json())

    response.delete_cookie("payload-token")
    return {"message": "Logged out successfully"}