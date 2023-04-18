try:
    import pandas as pd
    import numpy as np
    import time

    from datetime import datetime
    from flask import Flask
    from flask_cors import CORS
    from keras.models import load_model
    from sklearn.preprocessing import MinMaxScaler
    print("All module Loaded")
except Exception as e:
    print("Error: {}".format(e))

app = Flask(__name__)
CORS(app)

TEST_DATA = "test_data"
TRAIN_DATA = "train_data"
MODEL_DATA = "models"

prediction_days = 60


@app.route("/pipe/<stock>", methods=["GET"])
def pipe(stock):
    stocks, volumes, predicted = getStock(stock)
    return {
        "stocks": stocks,
        "volumes": volumes,
        "predicted": predicted
    }


@app.route("/predict/<stock>", methods=["GET"])
def predict(stock):
    stocks, volumes, predicted = predict_stock(stock)
    return {
        "stocks": stocks,
        "volumes": volumes,
        "predicted": predicted  # This is a value not array
    }


def getStock(stock):
    stocks, volumes, predicteds = [], [], []
    scaler = MinMaxScaler(feature_range=(0, 1))

    train_data = pd.read_csv(f"{TRAIN_DATA}/{stock}.csv")
    test_data = pd.read_csv(f"{TEST_DATA}/{stock}.csv")
    model = load_model(f"{MODEL_DATA}/{stock}.h5")

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
    x_test = []

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
        stock = [
            timestamp,
            round(row["Open"], 1),
            round(row["High"], 1),
            round(row["Low"], 1),
            round(row["Close"], 1),
        ]
        volume = [timestamp, row["Volume"]]
        predicted = [
            timestamp,
            round(predicted_prices[index][0].item(), 1)  # Predict value
        ]
        stocks.append(stock)
        volumes.append(volume)
        predicteds.append(predicted)

    return stocks, volumes, predicteds


def predict_stock(stock):
    stocks, volumes = [], []
    scaler = MinMaxScaler(feature_range=(0, 1))

    model = load_model(f"{MODEL_DATA}/{stock}.h5")
    train_data = pd.read_csv(f"{TRAIN_DATA}/{stock}.csv")

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

    for _, row in test_data.iterrows():
        timestamp = int(time.mktime(
            datetime.strptime(row["Date"], "%Y-%m-%d").timetuple()
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

    return stocks, volumes, prediction.item(0)


def get_num_lines(fname):
    with open(fname) as f:
        for i, _ in enumerate(f):
            pass
    return i + 1
