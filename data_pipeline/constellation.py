import pandas as pd
import json
from pathlib import Path

# This script uses data from: Constellation lines - Marc van der Sluys
# https://github.com/MarcvdSluys/ConstellationLines?tab=readme-ov-file
# Copyright (c) 2005-2023, Marc van der Sluys, hemel.waarnemen.com.
# 
# DOI: 10.5281.zenodo.10397192
# The data can be used under the terms of the Creative Commons 
# Attribution 4.0 International (CC BY 4.0) licence.
# https://creativecommons.org/licenses/by/4.0/
# 
# Modifications: preprocessing, filtering, and formatting adapted for this project.


path = "https://raw.githubusercontent.com/MarcvdSluys/ConstellationLines/refs/heads/master/ConstellationLines.csv"

df = pd.read_csv(path)
# print(df.head())
df.columns = df.columns.str.strip()

# stars_path = Path(__file__).parent.parent / "public" / "data" / "stars.json"
# stars = pd.read_json(stars_path)
# print(stars.head())

df.to_json("./public/data/rawConstellations.json", orient="records")