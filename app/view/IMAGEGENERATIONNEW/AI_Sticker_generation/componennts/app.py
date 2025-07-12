#!/usr/bin/env python3
"""
Single-GPU Stable-Diffusion-3.5 backend for local use.
"""

import os
from uuid import uuid4
from functools import partial

import torch
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from starlette.concurrency import run_in_threadpool
from diffusers import SD3Transformer2DModel, StableDiffusion3Pipeline

# ─────────────────────────── Config ────────────────────────────
MODEL_ID = "stabilityai/stable-diffusion-3.5-medium"
API_KEY = "wildmind_5879fcd4a8b94743b3a7c8c1a1b4"
DEVICE = "cuda"  # Use "cuda" for NVIDIA GPUs like RTX A6000
OUT_DIR = os.path.join(os.path.dirname(__file__), "generated")
os.makedirs(OUT_DIR, exist_ok=True)

# ─────────────────── Load one pipeline onto your GPU ─────────────────
print(f"🔄  Loading SD-3.5-medium onto {DEVICE}…")
transformer = SD3Transformer2DModel.from_pretrained(
    MODEL_ID, subfolder="transformer", torch_dtype=torch.float16
).to(DEVICE)

pipe = StableDiffusion3Pipeline.from_pretrained(
    MODEL_ID, transformer=transformer, torch_dtype=torch.float16
).to(DEVICE)
print("✅  Pipeline ready!")

# ───────────────────────── FastAPI app ─────────────────────────
app = FastAPI(title="SD-3.5 single-GPU")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://www.wildmindai.com", "https://api.wildmindai.com"],
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

app.mount("/images", StaticFiles(directory=OUT_DIR), name="images")

class PromptIn(BaseModel):
    prompt: str
    steps: int = 50
    scale: float = 5.5
    width: int = 768
    height: int = 768
    num_images: int = 1

# ─────────────────── Helper: render on the GPU ─────────────────
def _render_on_gpu(prompt: str , steps: int, scale: float, width: int, height: int) -> str:
    # Ensure width and height are divisible by 16
    width = width - (width % 16)
    height = height - (height % 16)
    
    img = pipe(prompt, num_inference_steps=steps,
               guidance_scale=scale, width=width, height=height).images[0]
    
    filename = f"{uuid4().hex}.png"
    filepath = os.path.join(OUT_DIR, filename)
    img.save(filepath)
    return f"http://localhost:8000/images/{filename}"

# ───────────────────────── main endpoint ───────────────────────
@app.post("/generate")
async def generate(req: Request, body: PromptIn):
    # auth
    if req.headers.get("x-api-key") != API_KEY:
        raise HTTPException(401, "bad api key")

    prompt = body.prompt.strip()
    if not prompt:
        raise HTTPException(400, "empty prompt")

    image_urls = []
    for _ in range(body.num_images):
        # off-load to thread so event-loop is free
        url = await run_in_threadpool(
            partial(_render_on_gpu, prompt, body.steps, body.scale, body.width, body.height)
        )
        image_urls.append(url)

    # Return a list of local URLs for development
    return {"image_urls": image_urls}

# ───────────────────────── health-check ────────────────────────
@app.get("/ping")
def ping(): return {"status": "ok"}