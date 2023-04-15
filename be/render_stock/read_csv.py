import pandas as pd
import time
from datetime import datetime

data = []

df = pd.read_csv('aapl.csv')

for index, row in df.iterrows():
    timestamp = int(time.mktime(datetime.strptime(
        row['Date'], "%Y-%m-%d").timetuple()
    ) * 1000)
    stock = [
        timestamp,
        row['Open'],
        row['High'],
        row['Low'],
        row['Close'],
        row['Volume'],
    ]
    data.append(stock)


print(data)
