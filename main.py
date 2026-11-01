from fastapi import FastAPI
# uv run uvicorn main:app --reload
from pydantic import BaseModel

from Rag.retriver import ask_question
from Rag.retriver import ask_chatbot

app = FastAPI(
    title="Gen-Z Mental Health AI",
    description="RAG based mental health information API",
    version="1.0.0"
)
class AssementResult(BaseModel):
    score: int
    severity: str

class ChatRequest(BaseModel):
    phq9: AssementResult
    gad7: AssementResult

@app.get("/")
def home():
    return {
        "message": "Gen-Z Mental Health AI API is running"
    }
@app.post("/ai/chat")
def ai_chat(request:ChatRequest):
    result = ask_question(request.phq9, request.gad7)
    return result



class ChatbotRequest(BaseModel):
    question: str

@app.post("/ai/chatbot")
async def chatbot(request: ChatbotRequest):
    result = ask_chatbot(request.question)
    return {
        "success": True,
        "answer": result["answer"]
    }
   