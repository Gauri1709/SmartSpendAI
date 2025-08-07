import json
import boto3

def lambda_handler(event, context):
    session = boto3.Session(0)
    s3 = boto3.client('s3')
    bucket = 'smartspendai-upload'
    body = json.loads(event['body'])
    filename = body['filename']
    key = 'upload/' + filename
    presigned_url = s3.generate_presigned_url(
        ClientMethod='put_object',
        Params={'Bucket': bucket,
        'Key':key,
        'ContentType':'text/csv',
        },
        ExpiresIn=3600
    )
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "http://localhost:5173",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        "body": json.dumps({"uploadURL": presigned_url})
    }
