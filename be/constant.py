from enum import Enum

# PATH = "/home/thinh/Documents/stock-price-prediction/be"
PATH = "/home/chase/Documents/stock-price-prediction/be"

TEST_DATA = f"{PATH}/test_data"
TRAIN_DATA = f"{PATH}/train_data"
MODEL_60_DAYS = f"{PATH}/models_60"
MODEL_30_DAYS = f"{PATH}/models_30"

DATE_FORMAT = "%Y-%m-%d"


class PredictType(Enum):
    PREDICT_WITH_60_DAYS = "LAST_60_DAYS"
    PREDICT_WITH_30_DAYS = "LAST_30_DAYS"


MAPPING_PREDICT = {
    PredictType.PREDICT_WITH_60_DAYS.value: {
        "prediction_days": 60,
        "models": MODEL_60_DAYS
    },
    PredictType.PREDICT_WITH_30_DAYS.value: {
        "prediction_days": 30,
        "models": MODEL_30_DAYS
    },
}
