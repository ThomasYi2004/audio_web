# Python Voice Chat Server

This simple FastAPI server receives text from the browser and returns a
text reply.  It's designed to be paired with the Next.js front end in the
parent project.

## Requirements

- Python 3.10 or newer
- `pip` for installing packages

## Installation

```bash
cd server
python -m venv .venv       # optional but recommended
source .venv/bin/activate   # use Scripts\activate on Windows
pip install fastapi uvicorn
```

You can generate `requirements.txt` with `pip freeze > requirements.txt`.

## Running

Start the server with uvicorn:

```bash
uvicorn main:app --reload --port 8000
```

The endpoint will be available at `http://localhost:8000/reply`.

### Extending

Modify `main.py` to call out to an AI model, database, etc.  Make sure to
keep the request and response JSON schema the same for compatibility with
the front end.
