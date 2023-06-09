try:
    import time
    import schedule
    from flask import Flask, request
    from flask_cors import CORS

    from utils import (
        predict_test_data,
        predict_future_stock,
        get_stock_info,
        get_statistic,
        fetch_new_data,
        fetch_all_data,
        get_highest_stock_grown_rate,
        check_search_available
    )
    from stock import STOCK as stock_data
    print("All module Loaded")
except Exception as e:
    print("Error: {}".format(e))

app = Flask(__name__)
CORS(app)

schedule.every().day.at("00:00").do(fetch_all_data)


def run_scheduled_task():
    while True:
        schedule.run_pending()
        time.sleep(1)


@app.before_first_request
def activate_job():
    print("START THE BACKGROUND TASK")
    from threading import Thread
    thread = Thread(target=run_scheduled_task)
    thread.start()


@app.route("/stock", methods=["GET"])
def get_all_stock():
    args = request.args.to_dict()
    _txt = args.get("_txt")
    stocks = []
    for stock in stock_data:
        ticker = stock.get("ticker")
        company_name = stock.get("company_name").lower()
        searchable = " ".join([ticker, company_name])
        if check_search_available(_txt, searchable):
            data = get_stock_info(ticker)
            stocks.append(data)
    return stocks


@app.route("/stock/<stock>", methods=["GET"])
def get_stock(stock):
    return get_stock_info(stock)


@app.route("/statistic/stock/<stock>", methods=["GET"])
def get__statistic(stock):
    return get_statistic(stock)


@app.route("/stock/<stock>", methods=["POST"])
def fetch__new_data(stock):
    try:
        fetch_new_data(stock)
        return get_stock_info(stock)
    except:
        raise Exception("An error occurred while retrieving data")


@app.route("/predict_past/stock/<stock>", methods=["POST"])
def predict_past(stock):
    predict_type = request.json.get("predict_type")
    predicteds = predict_test_data(stock, predict_type)
    return {"predict_past": predicteds}


@app.route("/predict_future/stock/<stock>", methods=["POST"])
def predict_future(stock):
    predict_type = request.json.get("predict_type")
    predicted = predict_future_stock(stock, predict_type)
    return {"predict_future": predicted}


@app.route("/grown_rate/stock", methods=["GET"])
def get_stock_grown_rate():
    args = request.args.to_dict()
    grown_rate_days = args.get("grown_rate_days")
    max_results = args.get("max_results")
    grown_rate_days = int(grown_rate_days) or 30
    max_results = int(max_results) or 10
    data = get_highest_stock_grown_rate(grown_rate_days, max_results)
    return data
