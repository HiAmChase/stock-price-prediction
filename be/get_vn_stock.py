import vnquant.data as dt
loader = dt.DataLoader('VND', '2018-02-02', '2018-04-02')

data = loader.download()
data.to_csv("vnd.csv")
