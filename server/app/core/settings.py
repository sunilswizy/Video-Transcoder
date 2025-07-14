from dotenv import load_dotenv
import os

load_dotenv()

S3_BUCKET = os.getenv("S3_BUCKET")
UPLOAD_FILE_PATH = os.getenv("UPLOAD_FILE_PATH")
DECODE_FILE_PATH = os.getenv("DECODE_FILE_PATH")
