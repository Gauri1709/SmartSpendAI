

import csv
import re

def ReadFile(filename):
  
    categoryType = csv.DictReader(open(filename, 'r'),fieldnames=['date', 'sender', 'message'])
    CategoryType = list(categoryType)
    
    ExpenditureType = {
    "food": ["swiggy", "zomato", "ubereats", "foodpanda"],
    "travelling": ["ola", "uber", "irctc", "makemytrip", "goibibo", "redbus", "flight", "train", "bus"],
    "entertainment": ["netflix", "hotstar", "prime video", "spotify", "zee5", "sony liv"],
    "shopping": ["amazon", "flipkart", "myntra", "ajio", "snapdeal", "meesho"],
    "health": ["apollo", "pharmeasy", "1mg", "netmeds", "doctor", "hospital", "clinic", "medlife"],
    "EMI": ["emi", "loan", "bajaj", "sbi card", "credit card", "axis card", "hdfc card"]
    }
    i = 0
    for i in range(len(CategoryType)):
            category = CategoryType[i]['message'].lower()
            if 'credited' in category:
                CategoryType[i]['type'] = 'credit'
            elif 'debited' in category or 'withdrawn' in category or 'paid' in category or 'spent' in category:
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
                CategoryType[i]['expenditure'] = 'helth'
            else:
                CategoryType[i]['expenditure'] = 'EMI'
    return {
         "data":CategoryType
        , "status": "success", "message": "File read successfully"

    }
   
def parseAmount(message):
    match = re.search(r'Rs\.?\s?([\d,]+(?:\.\d{2})?)', message, re.IGNORECASE)
    if match:
        amount_str = match.group(1).replace(",", "")
        return float(amount_str)
    return 0




def totalAmount():
    category = ReadFile("sample.csv")
    i = 0
    exepnditure_sum = {"food":0,"EMI":0,"entertainment":0,"shopping":0,"travelling":0,"health":0}
    for i in range(len(category['data'])):
        amount =  parseAmount(category['data'][i]['message'])
        type = category['data'][i]['expenditure']
        if(category['data'][i]['type'] == 'debit'):
            amount = +amount

            
        else:
            amount = -amount
        exepnditure_sum[type] = exepnditure_sum[type] + amount
        print(amount)
        print(category['data'][i]['message'])
    return exepnditure_sum


totalAmount()

    