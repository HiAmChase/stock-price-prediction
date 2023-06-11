import vnquant.data as dt

DATA_FETCHED = [
    "ACB", "BCM", "BID", "BVH", "CTG",
    "FPT", "GAS", "GVR", "HDB", "HPG",
    "MBB", "MSN", "MWG", "NVL", "PDR",
    "PLX", "POW", "SAB", "SSI", "STB",
    "TCB", "TPB", "VCB", "VHM", "VIB",
    "VIC", "VJC", "VNM", "VPB", "VRE"
]

COMPANIES = [
    "AAA", "AAM", "ABR", "ABS", "ABT", "ACB", "ACC", "ADG", "ADS", "AGG",
    "AGM", "AGR", "AMD", "ANV", "APC", "APG", "APH", "ASG",
    "ASM", "ASP", "AST",  "BBC", "BCE", "BCG", "BCM", "BFC", "BHN",
    "BIC", "BID", "BMC", "BMI", "BMP", "BRC", "BSI", "BTP", "BTT",
    "BVH", "BWE", "C32", "C47", "CAV", "CCI", "CCL", "CDC", "CHP", "CIG",
    "CII", "CKG", "CLC", "CLL", "CLW", "CMG", "CMV", "CMX", "CNG", "COM",
    "CRC", "CRE", "CSM", "CSV", "CTD", "CTF", "CTG", "CTI", "CTR", "CTS",
    "CVT", "D2D", "DAG", "DAH", "DAT", "DBC", "DBD", "DBT", "DC4", "DCL",
    "DCM", "DGC", "DGW", "DHA", "DHC", "DHG", "DHM", "DIG", "DLG", "DMC",
    "DPG", "DPM", "DPR", "DQC", "DRC", "DRH", "DRL", "DSN", "DTA", "DTL",
    "DTT", "DVP", "DXG", "DXV", "EIB", "ELC", "EMC", "EVE", "EVF",
    "EVG", "FCM", "FCN", "FDC", "FIR", "FIT", "FMC", "FPT", "FRT", "FTS",
    "GAS", "GDT", "GEG", "GEX", "GIL", "GMC", "GMD", "GSP",
    "GTA", "GVR", "HAG", "HAH", "HAP", "HAR", "HAS", "HAX", "HBC", "HCD",
    "HCM", "HDB", "HDC", "HDG", "HHP", "HHS", "HHV", "HID", "HII", "HMC",
    "HNG", "HPG", "HPX", "HQC", "HRC", "HSG", "HSL", "HT1", "HTI", "HTL",
    "HTN", "HTV", "HU1", "HUB", "HVH", "HVN", "HVX", "IBC", "ICT", "IDI",
    "IJC", "ILB", "IMP", "ITA", "ITC", "ITD", "JVC", "KBC", "KDC", "KDH",
    "KHP", "KMR", "KOS", "KPF", "KSB", "L10", "LAF", "LBM", "LCG",
    "LDG", "LEC", "LGC", "LGL", "LHG", "LIX", "LM8", "LPB", "LSS", "MBB",
    "MCP", "MDG", "MHC", "MIG", "MSH", "MSN", "MWG", "NAF", "NAV", "NBB",
    "NCT", "NHA", "NHH", "NHT", "NKG", "NLG", "NNC", "NSC", "NT2",
    "NTL", "NVL", "NVT", "OGC", "OPC", "ORS", "PAC", "PAN", "PC1",
    "PDN", "PDR", "PET", "PGC", "PGD", "PGI", "PGV", "PHC", "PHR", "PIT",
    "PJT", "PLP", "PLX", "PMG", "PNC", "PNJ", "POM", "POW", "PPC", "PSH",
    "PTB", "PTC", "PTL", "PVD", "PVP", "PVT", "QBS", "QCG", "RAL", "RDP",
    "REE", "S4A", "SAB", "SAM", "SAV", "SBA", "SBT", "SBV", "SC5", "SCD",
    "SCR", "SCS", "SFC", "SFG", "SFI", "SGN", "SGR", "SGT", "SHA", "SHB",
    "SHI", "SHP", "SJD", "SJF", "SJS", "SKG", "SMA", "SMB", "SMC", "SPM",
    "SRC", "SRF", "SSC", "SSI", "ST8", "STB", "STG", "STK", "SVC",
    "SVI", "SVT", "SZC", "SZL", "TBC", "TCB", "TCD", "TCH", "TCL",
    "TCM", "TCO", "TCR", "TCT", "TDC", "TDG", "TDH", "TDM", "TDP", "TDW",
    "TEG", "TGG", "THG", "THI", "TIP", "TIX", "TLD", "TLG", "TLH", "TMP",
    "TMS", "TMT", "TN1", "TNA", "TNC", "TNI", "TNT", "TPB", "TPC",
    "TRA", "TRC", "TSC", "TTA", "TTB", "TTE", "TTF", "TV2", "TVB", "TVS",
    "TVT", "TYA", "UIC", "VAF", "VCA", "VCB", "VCF", "VCG", "VCI", "VDP",
    "VDS", "VFG", "VGC", "VHC", "VHM", "VIB", "VIC", "VID", "VIP", "VIX",
    "VJC", "VMD", "VND", "VNE", "VNG", "VNL", "VNM", "VNS", "VOS", "VPB",
    "VPD", "VPG", "VPH", "VPI", "VPS", "VRC", "VRE", "VSC",
    "VSH", "VTB", "VTO", "YBM", "YEG"
]

COMPANIES = [data for data in COMPANIES if data not in DATA_FETCHED]

TRAIN_START_DATE = "2012-01-01"
TRAIN_END_DATE = "2020-12-31"
TEST_START_DATE = "2021-01-01"
TEST_END_DATE = "2023-06-02"

""" Get train data """
for company in COMPANIES:
    loader = dt.DataLoader(company, TRAIN_START_DATE, TRAIN_END_DATE)

    data = loader.download()
    data.to_csv(f"vn_train_data/{company.lower()}.csv")


""" Get test data """
for company in COMPANIES:
    loader = dt.DataLoader(company, TEST_START_DATE, TEST_END_DATE)

    data = loader.download()
    data.to_csv(f"vn_test_data/{company.lower()}.csv")
