from constant import PredictType

TEST_DATA = "test_data"
TRAIN_DATA = "train_data"
MODEL_60_DAYS = "models_60"
MODEL_30_DAYS = "models_30"


MAPPING_PREDICT = {
    PredictType.PREDICT_WITH_60_DAYS: {
        "prediction_days": 60,
        "models": MODEL_60_DAYS
    },
    PredictType.PREDICT_WITH_30_DAYS: {
        "prediction_days": 30,
        "models": MODEL_30_DAYS
    },
}
