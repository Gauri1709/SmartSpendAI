import json
import httpx
from openai import OpenAI
import os

def lambda_handler(event, context):
    print("✅ Lambda invoked")

    try:
        # Parse incoming request
        body = json.loads(event.get('body', '{}'))
        print("📦 Parsed body:", body)

        categorized_data = body.get('categorized_data')
        if not categorized_data:
            raise ValueError("Missing or empty categorized_data")

        # Construct messages for OpenAI
        messages = [
            {"role": "system", "content": "You are a GenZ financial best friend who gives savage but smart monthly financial advice based on spending habits. Use modern slang, emojis, and be brutally honest but helpful. Keep the tone fun yet practical and one line very less like 20 words."},
            {"role": "user", "content": f"Help me fix my spending habits. Here's how I spent: {categorized_data}."}
        ]

        # Load API key and proxy
        api_key = os.environ.get("OPENAI_API_KEY")  # Replace with env or fallback
        

        if not api_key.startswith("sk-proj-"):
            raise ValueError("Invalid or missing OpenAI project API key")

        # Configure OpenAI client
        print("🔧 Setting up OpenAI client")
        
        client = OpenAI(api_key=api_key)

        # Call OpenAI API
        print("📡 Calling OpenAI API")
        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            max_tokens=300
        )
        print(response)
        insight = response.choices[0].message.content
        print("💡 Insight received:", insight)

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': "http://localhost:5173/",
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                'Access-Control-Allow-Headers': "Content-Type",
            },
            'body': json.dumps({"insight_data":insight})
        }

    except Exception as e:
        print(f"❌ Error occurred: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({
                "error": "Internal Server Error",
                "details": str(e)
            })
        }