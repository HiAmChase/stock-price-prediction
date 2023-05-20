try:

    from flask import Flask
    from flask_cors import CORS

    from utils import (
        predict_test_data,
        predict_stock,
        get_stock_info,
        get_statistic
    )
    from constant import PredictType
    from stock import STOCK as stock_data
    print("All module Loaded")
except Exception as e:
    print("Error: {}".format(e))

app = Flask(__name__)
CORS(app)


@app.route("/statistic/stock/<stock>", methods=["GET"])
def get__statistic(stock):
    return get_statistic(stock)


@app.route("/stock/<stock>", methods=["GET"])
def get_stock(stock):
    return get_stock_info(stock)


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
