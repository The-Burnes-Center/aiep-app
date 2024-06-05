from fastapi.responses import JSONResponse

def public_cors_dependency():
    return JSONResponse(
        {"detail": "Public CORS settings applied"},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    )

def private_cors_dependency():
    return JSONResponse(
        {"detail": "Private CORS settings applied"},
        headers={
            "Access-Control-Allow-Origin": "app-admin:3000",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    )
