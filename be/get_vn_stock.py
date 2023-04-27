import vnquant.data as dt

COMPANIES = [
    "ACB", "BCM", "BID", "BVH", "CTG",
    "FPT", "GAS", "GVR", "HDB", "HPG",
    "MBB", "MSN", "MWG", "NVL", "PDR",
    "PLX", "POW", "SAB", "SSI", "STB",
    "TCB", "TPB", "VCB", "VHM", "VIB",
    "VIC", "VJC", "VNM", "VPB", "VRE"
]

TRAIN_START_DATE = "2012-01-01"
TRAIN_END_DATE = "2020-12-31"
TEST_START_DATE = "2021-01-01"
TEST_END_DATE = "2023-04-14"

""" Get train data """
# for company in COMPANIES:
#     loader = dt.DataLoader(company, TRAIN_START_DATE, TRAIN_END_DATE)

#     data = loader.download()
#     data.to_csv(f"vn_train_data/{company.lower()}.csv")


""" Get test data """
# for company in COMPANIES:
#     loader = dt.DataLoader(company, TEST_START_DATE, TEST_END_DATE)

#     data = loader.download()
#     data.to_csv(f"vn_test_data/{company.lower()}.csv")
