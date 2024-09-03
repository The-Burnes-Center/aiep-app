from fastapi import APIRouter, Depends, HTTPException, Response, Request
import requests
from pydantic import BaseModel, EmailStr

router = APIRouter()

@router.post("/quick-login")
async def login(response: Response):
    try:
        res = requests.post(
            "http://app-admin:3000/cms/api/users/login",
            json={"email": "xu.hong@northeastern.edu",
                "password": "Racecar48!"},
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

@router.get("/view-cookie")
async def view_cookie(request: Request):
    token = request.cookies.get("payload-token")
    if not token:
        raise HTTPException(status_code=404, detail="Cookie not found")
    return {"payload-token": token}

@router.get("/set-cookie")
async def set_cookie(request: Request, response: Response):
    response.set_cookie(key="payload-token", value="dummy-token")
    return {"message": "Cookie set"}
