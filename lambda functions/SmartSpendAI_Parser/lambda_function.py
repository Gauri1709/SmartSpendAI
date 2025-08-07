import json
import boto3
import csv
import re

def ReadFile(myBucket,key):
    session = boto3.Session(
        region_name = 'ap-south-1'
    )
    s3 = boto3.client('s3')
    response = s3.get_object(Bucket=myBucket,Key=key)
    contents = response['Body'].read().decode('utf-8').splitlines()
    categoryType = csv.DictReader(contents,fieldnames=['date', 'sender', 'message'])
    CategoryType = list(categoryType)
    i = 0
    ExpenditureType = {
    "food": ["swiggy", "zomato", "ubereats", "foodpanda"],
    "travelling": ["ola", "uber", "irctc", "makemytrip", "goibibo", "redbus", "flight", "train", "bus"],
    "entertainment": ["netflix", "hotstar", "prime video", "spotify", "zee5", "sony liv"],
    "shopping": ["amazon", "flipkart", "myntra", "ajio", "snapdeal", "meesho"],
    "health": ["apollo", "pharmeasy", "1mg", "netmeds", "doctor", "hospital", "clinic", "medlife"],
    "EMI": ["emi", "loan", "bajaj", "sbi card", "credit card", "axis card", "hdfc card"]
    }
    for i in range(len(CategoryType)):
            category = CategoryType[i]['message'].lower()
            if 'credited' in  category:
                CategoryType[i]['type'] = 'credit'
            elif 'debited' in  category or 'withdrawn' in  category or 'paid' in  category or 'spent' in category:
                CategoryType[i]['type'] = 'debit'
            else:
                CategoryType[i]['type'] = 'unknown'
    i = 0
    for i in range(len(CategoryType)):
            category = CategoryType[i]['message'].lower()
            if any(word in category for word in ExpenditureType['food']):
                CategoryType[i]['expenditure'] = 'food'
            elif any(word in category for word in ExpenditureType['travelling']):
                CategoryType[i]['expenditure'] = 'travelling'
            elif any(word in category for word in ExpenditureType['entertainment']):
                CategoryType[i]['expenditure'] = 'entertainment'
            elif any(word in category for word in ExpenditureType['shopping']):
                CategoryType[i]['expenditure'] = 'shopping'
            elif any(word in category for word in ExpenditureType['health']):
                CategoryType[i]['expenditure'] = 'health'
            elif any(word in category for word in ExpenditureType['EMI']):
                CategoryType[i]['expenditure'] = 'EMI'
            else:
                CategoryType[i]['expenditure'] = 'unknown'
        
    return CategoryType
            
def parseAmount(message):
    match = re.search(r'Rs\.?\s?([\d,]+(?:\.\d{2})?)', message, re.IGNORECASE)
    if match:
        amount_str = match.group(1).replace(",", "")
        return float(amount_str)
    return 0




def totalAmount(myBucket,key):
    category = ReadFile(myBucket,key)
    i = 0
    exepnditure_sum = {"food":0,"EMI":0,"entertainment":0,"shopping":0,"travelling":0,"health":0,"unknown":0}
    for i in range(len(category)):
        amount =  parseAmount(category[i]['message'])
        types = category[i]['expenditure']
        if(category[i]['type'] == 'credit'):
            amount = +amount

            
        else:
            amount = -amount
        exepnditure_sum[types] = exepnditure_sum[types] + amount
    return exepnditure_sum
   



def lambda_handler(event, context):
    #myBucket = event['Records'][0]['s3']['bucket']['name']
    myBucket = "smartspendai-upload"
    body = json.loads(event['body'])
    key = 'upload/' + body['filename']
    return totalAmount(myBucket,key)
    
    