import kagglehub
import os
import pandas as pd
from pathlib import Path

# Download latest version
path = kagglehub.dataset_download("anavid7/yale-bright-star-catalog")

# print("Path to dataset files:", path)

# for file in os.listdir(path):
#     print(file)

# output path
ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "public" / "data"


file_path = path + "/yale_bright_star_catalog_v5.csv"
df = pd.read_csv(file_path)
df.columns = df.columns.str.strip()
# print(df.columns)

coordinates = df[["HR", "Name", "Vmag", "RAh", "RAm", "RAs", "DE-", "DEd", "DEm", "DEs"]]
# print(coordinates.head())

coordinates['RA'] = (coordinates['RAh'] + coordinates['RAm']/60 + coordinates['RAs'] /3600 ) *15
coordinates['DE'] = coordinates['DEd'] + coordinates['DEm']/60 + coordinates['DEs'] /3600
coordinates['DE'] = coordinates['DE'].where(coordinates['DE-'] != '-', -coordinates['DE'])
coordinates = coordinates.drop(["RAh", "RAm", "RAs","DE-", "DEd", "DEm", "DEs"], axis = 1)

print(coordinates.head())

coordinates.to_json("./public/data/stars.json", orient="records")
