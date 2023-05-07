try:

    from flask import Flask
    from flask_cors import CORS

    from utils import (
        predict_test_data,
        predict_stock,
        get_stock
    )
    from constant import PredictType
    from stock import STOCK as stock_data
    print("All module Loaded")
except Exception as e:
    print("Error: {}".format(e))

app = Flask(__name__)
CORS(app)


@app.route("/stock", methods=["GET"])
def get_all_stocks():
    return stock_data


@app.route("/statistic/stock/<stock>", methods=["GET"])
def get_statistic(stock):
    return get_stock(stock)


@app.route("/predict_future_60/<stock>", methods=["GET"])
def predict(stock):
    predicted = predict_stock(
        stock=stock,
        predict_type=PredictType.PREDICT_WITH_60_DAYS
    )
    return {
        "predicted": predicted  # This is a value not array
    }


@app.route("/predict_test_data_60/<stock>", methods=["GET"])
def predict_test_data_60(stock):
    predicteds = predict_test_data(
        stock=stock,
        predict_type=PredictType.PREDICT_WITH_60_DAYS
    )
    return {"predicteds": predicteds}


@app.route("/predict_test_data_30/<stock>", methods=["GET"])
def predict_test_data_30(stock):
    predicteds = predict_test_data(
        stock=stock,
        predict_type=PredictType.PREDICT_WITH_30_DAYS
    )
    return {"predicteds": predicteds}
