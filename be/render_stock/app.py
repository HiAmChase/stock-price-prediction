try:
    import json
    from flask import Flask, render_template, make_response
    import requests
    import json
    print("All module Loaded")
except Exception as e:
    print("Error: {}".format(e))

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/pipe", methods=["GET", "POST"])
def pipe():
    payload = {}
    headers = {}
    url = "https://demo-live-data.highcharts.com/aapl-ohlcv.json"
    r = requests.get(url, headers=headers, data={})
    r = r.json()
    return {"res": r}
