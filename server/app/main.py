import boto3
from core.settings import S3_BUCKET, DECODE_FILE_PATH, UPLOAD_FILE_PATH
from core.config import resolutions
import subprocess

client = boto3.client('s3')

file_name = 'download_video.mp4'
file_path = f'{UPLOAD_FILE_PATH}/{file_name}'

def download_file(input_path):
    try:
        response = client.get_object(
            Bucket=S3_BUCKET,
            Key=file_path
        )

        with open(input_path, "wb") as f:
            f.write(response['Body'].read())

    except Exception as e:
        print("Get file error ", e)
    

def upload_file(path):
    try:
        client.upload_file(path, S3_BUCKET, path)
    except Exception as e:
        print("Error at uploading file ", e)
        

def transcode_videos(input_path, output_base):
    output_files = []

    for label, size in resolutions.items():
        output_path = f'{output_base}/{label}.mp4'
        command = [
            "ffmpeg", "-i", input_path,
            "-vf", f"scale={size}",
            "-c:a", "copy",
            output_path
        ]
        subprocess.run(command, check=True)
        upload_file(output_path)
        output_files.append((label, output_path))

    return output_files


def process_video_from_s3():
    input_path = f'{UPLOAD_FILE_PATH}/{file_name}'
    output_base = DECODE_FILE_PATH
    download_file(input_path)

    output_files = transcode_videos(input_path, output_base)

    print("All resolutions processed and uploaded.", output_files)

process_video_from_s3()