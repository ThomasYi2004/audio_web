from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="VoiceChatServer")

# allow requests from the frontend development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextRequest(BaseModel):
    text: str

class TextResponse(BaseModel):
    reply: str

@app.post("/reply", response_model=TextResponse)
async def reply(req: TextRequest):
    """Simple echo endpoint.  Replace body with calls to an AI model later."""
    user_text = req.text.strip()
    # basic handling
    if not user_text:
        return TextResponse(reply="I didn't catch anything.")
    # echo logic (extendable)
    return TextResponse(reply=f"You said: {user_text}")
