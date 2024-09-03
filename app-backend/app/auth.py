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

def get_current_user(request: Request):
    token = request.cookies.get("payload-token")
    if not token:
        raise HTTPException(status_code=401, detail="Not Authenticated, No CMS Token")
    response = requests.get("http://app-admin:3000/cms/api/users/me", headers={"Authorization": f"Bearer {token}"})
    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Not Authenticated, No CMS Profile")
    return response.json()

@router.post("/login")
async def login(response: Response, form_data: LoginForm):
    try:
        res = requests.post(
            "http://app-admin:3000/cms/api/users/login",
            json=form_data,
            headers={"Content-Type": "application/json"},
        )

        payload_data = res.json()
        if res.status_code != 200:
            raise HTTPException(status_code=res.status_code, detail=payload_data)

        # Extracting the cookie from the response and setting it in the FastAPI response
        token = res.cookies.get('payload-token')
        if token:
            response.set_cookie(key="payload-token", value=token)
        return payload_data
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/signup")
async def signup(response: Response, form_data: SignupForm):
    try:
        res = requests.post(
            "http://app-admin:3000/cms/api/users",
            json=form_data.dict(),
            headers={"Content-Type": "application/json"},
        )

        payload_data = res.json()
        if res.status_code != 200:
            raise HTTPException(status_code=res.status_code, detail=payload_data)

        # Extracting the cookie from the response and setting it in the FastAPI response
        token = res.cookies.get('payload-token')
        if token:
            response.set_cookie(key="payload-token", value=token)
        return payload_data
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/logout", dependencies=[Depends(get_current_user)])
async def logout(request: Request, response: Response):
    try:
        res = requests.post(
            "http://app-admin:3000/cms/api/users/logout",
            headers={"Content-Type": "application/json"},
            cookies=request.cookies
        )

        if res.status_code != 200:
            raise HTTPException(status_code=res.status_code, detail=res.json())
        
        response.delete_cookie("payload-token")
        return {"message": "Logged out successfully"}
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))