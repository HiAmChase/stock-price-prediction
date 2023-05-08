import pandas as pd
import numpy as np
import time

from datetime import datetime
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler

from constant import (
    TRAIN_DATA,
    TEST_DATA,
    MAPPING_PREDICT
)
from stock import STOCK


def get_stock(stock):
    stocks, volumes = [], []
    test_data = pd.read_csv(f"{TEST_DATA}/{stock}.csv")

    for _, row in test_data.iterrows():
        timestamp = int(time.mktime(datetime.strptime(
            row["Date"], "%Y-%m-%d").timetuple()
        ) * 1000)
        stock_data = [
            timestamp,
            round(row["Open"], 2),
            round(row["High"], 2),
            round(row["Low"], 2),
            round(row["Close"], 2),
        ]
        volume = [timestamp, row["Volume"]]

        stocks.append(stock_data)
        volumes.append(volume)

    change, price, percentage, date = get_current_data(test_data)
    stock_obj = next((x for x in STOCK if x.get("ticker") == stock), None)
    company_name = stock_obj.get("company_name")

    return {
        "stocks": stocks,
        "volumes": volumes,
        "change": change,
        "price": price,
        "percentage": percentage,
        "date": date,
        "company_name": company_name
    }


def predict_test_data(stock, predict_type):
    scaler = MinMaxScaler(feature_range=(0, 1))
    train_data = pd.read_csv(f"{TRAIN_DATA}/{stock}.csv")
    test_data = pd.read_csv(f"{TEST_DATA}/{stock}.csv")

    prediction_days = MAPPING_PREDICT.get(predict_type)["prediction_days"]
    model_source = MAPPING_PREDICT.get(predict_type)["models"]

    model = load_model(f"{model_source}/{stock}.h5")

    scaler.fit_transform(
        train_data["Close"].values.reshape(-1, 1)
    )

    total_dataset = pd.concat(
        (train_data["Close"], test_data["Close"]), axis=0
    )

    model_inputs = total_dataset[
        len(total_dataset) - len(test_data) - prediction_days:
    ].values
    model_inputs = model_inputs.reshape(-1, 1)
    model_inputs = scaler.transform(model_inputs)
    x_test, predicteds = [], []

    for x in range(prediction_days, len(model_inputs)):
        x_test.append(model_inputs[x-prediction_days:x, 0])

    x_test = np.array(x_test)
    x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))

    predicted_prices = model.predict(x_test)
    predicted_prices = scaler.inverse_transform(predicted_prices)

    for index, row in test_data.iterrows():
        timestamp = int(time.mktime(datetime.strptime(
            row["Date"], "%Y-%m-%d").timetuple()
        ) * 1000)
        predicted = [
            timestamp,
            round(predicted_prices[index][0].item(), 2)  # Predict value
        ]
        predicteds.append(predicted)

    return predicteds


def predict_stock(stock, predict_type):
    scaler = MinMaxScaler(feature_range=(0, 1))
    train_data = pd.read_csv(f"{TRAIN_DATA}/{stock}.csv")

    prediction_days = MAPPING_PREDICT.get(predict_type)["prediction_days"]
    model_source = MAPPING_PREDICT.get(predict_type)["models"]

    model = load_model(f"{model_source}/{stock}.h5")

    # Get last prediction days
    test_data_lines = get_num_lines(f"{TEST_DATA}/{stock}.csv")
    test_data = pd.read_csv(
        f"{TEST_DATA}/{stock}.csv",
        skiprows=range(1, test_data_lines - prediction_days)
    )

    scaler.fit_transform(train_data["Close"].values.reshape(-1, 1))

    model_inputs = test_data["Close"].values
    model_inputs = model_inputs.reshape(-1, 1)
    model_inputs = scaler.transform(model_inputs)

    real_data = [model_inputs[:, 0]]
    real_data = np.array(real_data)
    real_data = np.reshape(
        real_data, (real_data.shape[0], real_data.shape[1], 1)
    )

    prediction = model.predict(real_data)
    prediction = scaler.inverse_transform(prediction)

    return prediction.item(0)


def get_current_data(data):
    data_last_2_days = data.iloc[-2]
    data_last_day = data.iloc[-1]

    date = data_last_day["Date"]
    change = data_last_day["Close"] - data_last_2_days["Close"]
    price = data_last_day["Close"]
    percentage = abs(change) / price * 100

    return (change, price, percentage, date)


def get_num_lines(fname):
    with open(fname) as f:
        for i, _ in enumerate(f):
            pass
    return i + 1
