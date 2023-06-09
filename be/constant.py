from enum import Enum

PATH = "/home/thinh/Documents/stock-price-prediction/be"
# PATH = "/home/chase/Documents/stock-price-prediction/be"

TEST_DATA = "test_data"
TRAIN_DATA = "train_data"
MODEL_60_DAYS = "models_60"
MODEL_30_DAYS = "models_30"
MODEL_15_DAYS = "models_15"

DATE_FORMAT = "%Y-%m-%d"


class PredictType(Enum):
    PREDICT_WITH_60_DAYS = "LAST_60_DAYS"
    PREDICT_WITH_30_DAYS = "LAST_30_DAYS"
    PREDICT_WITH_15_DAYS = "LAST_15_DAYS"


MAPPING_PREDICT = {
    PredictType.PREDICT_WITH_60_DAYS.value: {
        "prediction_days": 60,
        "models": MODEL_60_DAYS
    },
    PredictType.PREDICT_WITH_30_DAYS.value: {
        "prediction_days": 30,
        "models": MODEL_30_DAYS
    },
    PredictType.PREDICT_WITH_15_DAYS.value: {
        "prediction_days": 15,
        "models": MODEL_15_DAYS
    },
}
