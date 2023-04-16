try:
    import pandas as pd
    import time

    from datetime import datetime
    from flask import Flask, render_template
    from flask_cors import CORS
    print("All module Loaded")
except Exception as e:
    print("Error: {}".format(e))

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/pipe", methods=["GET", "POST"])
def pipe():
    data = getStock()
    return {"res": data}


def getStock():
    data = []
    df = pd.read_csv('aapl.csv')

    for _, row in df.iterrows():
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

    return data
