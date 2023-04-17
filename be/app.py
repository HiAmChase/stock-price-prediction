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


@app.route("/pipe/<stock>", methods=["GET"])
def pipe(stock):
    stocks, volumes = getStock(stock)
    return {"stocks": stocks, "volumes": volumes}


def getStock(stock):
    stocks = []
    volumes = []
    df = pd.read_csv(f"test_data/{stock}.csv")

    for _, row in df.iterrows():
        timestamp = int(time.mktime(datetime.strptime(
            row["Date"], "%Y-%m-%d").timetuple()
        ) * 1000)
        stock = [
            timestamp,
            round(row["Open"], 1),
            round(row["High"], 1),
            round(row["Low"], 1),
            round(row["Close"], 1),
        ]
        volume = [timestamp, row["Volume"]]
        stocks.append(stock)
        volumes.append(volume)

    return stocks, volumes
