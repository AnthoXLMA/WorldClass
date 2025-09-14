# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import httpx
import pandas as pd
from io import StringIO

app = FastAPI(title="Atlas Social API")

# --- CORS pour React frontend ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Données simulées fallback ===
fallback_distributions = {
    "FR": {
        "income": [
            {"percentile": 10, "income": 12000},
            {"percentile": 30, "income": 25000},
            {"percentile": 50, "income": 40000},
            {"percentile": 70, "income": 60000},
            {"percentile": 90, "income": 120000},
        ],
        "wealth": [
            {"percentile": 10, "wealth": 5000},
            {"percentile": 30, "wealth": 40000},
            {"percentile": 50, "wealth": 120000},
            {"percentile": 70, "wealth": 300000},
            {"percentile": 90, "wealth": 700000},
        ],
    },
    "World": {
        "income": [
            {"percentile": 10, "income": 5000},
            {"percentile": 30, "income": 15000},
            {"percentile": 50, "income": 30000},
            {"percentile": 70, "income": 60000},
            {"percentile": 90, "income": 150000},
        ],
        "wealth": [
            {"percentile": 10, "wealth": 1000},
            {"percentile": 30, "wealth": 10000},
            {"percentile": 50, "wealth": 50000},
            {"percentile": 70, "wealth": 200000},
            {"percentile": 90, "wealth": 1000000},
        ],
    },
}

# --- Helper pour interpoler percentiles ---
def percentile_from_distribution(value: float, distribution: List[dict], key: str) -> float:
    """
    Retourne le percentile correspondant à une valeur donnée
    par interpolation linéaire dans la distribution.
    """
    for i, item in enumerate(distribution):
        if value <= item[key]:
            if i == 0:
                return item["percentile"] / 100
            prev_item = distribution[i - 1]
            ratio = (value - prev_item[key]) / (item[key] - prev_item[key])
            percentile = (prev_item["percentile"] + ratio * (item["percentile"] - prev_item["percentile"])) / 100
            return min(percentile, 1.0)
    return 1.0

# === Routes API ===
@app.get("/distributions/{country}")
async def get_distribution(country: str):
    """
    Retourne les distributions de revenu et patrimoine pour un pays.
    Utilise WID ou fallback si indisponible.
    """
    country = country.upper()
    try:
        # Exemple fetch CSV WID (à remplacer par vraie URL)
        # url = f"https://wid.world/data/{country}_income_wealth.csv"
        # async with httpx.AsyncClient() as client:
        #     r = await client.get(url)
        # df = pd.read_csv(StringIO(r.text))
        # return {
        #     "income": df[["percentile", "income"]].to_dict(orient="records"),
        #     "wealth": df[["percentile", "wealth"]].to_dict(orient="records"),
        # }
        return fallback_distributions.get(country, fallback_distributions["FR"])
    except Exception:
        return fallback_distributions.get(country, fallback_distributions["FR"])


@app.post("/calculate")
def calculate(data: dict):
    """
    Calcule le percentile et la classe sociale
    en France et dans le monde, avec benchmarks pédagogiques.
    """
    income = data.get("income", 50000)
    wealth = data.get("wealth", 100000)

    dist_fr = fallback_distributions["FR"]
    dist_world = fallback_distributions["World"]

    # --- Percentiles ---
    income_percentile_country = percentile_from_distribution(income, dist_fr["income"], "income")
    income_percentile_world = percentile_from_distribution(income, dist_world["income"], "income")
    wealth_percentile_country = percentile_from_distribution(wealth, dist_fr["wealth"], "wealth")
    wealth_percentile_world = percentile_from_distribution(wealth, dist_world["wealth"], "wealth")

    # --- Classe sociale simplifiée ---
    if income < 30000:
        social_class = "Classe populaire"
    elif income < 60000:
        social_class = "Classe moyenne"
    elif income < 120000:
        social_class = "Classe moyenne supérieure"
    else:
        social_class = "Classe aisée"

    # --- Benchmarks pédagogiques ---
    benchmarks = {
        "median_income_country": 40000,
        "median_income_world": 30000,
        "gini_country": 0.29,
        "gini_world": 0.38
    }

    return {
        "income_percentile_country": round(income_percentile_country, 2),
        "income_percentile_world": round(income_percentile_world, 2),
        "wealth_percentile_country": round(wealth_percentile_country, 2),
        "wealth_percentile_world": round(wealth_percentile_world, 2),
        "class_country": social_class,
        "benchmarks": benchmarks
    }


@app.post("/simulate")
def simulate(data: dict):
    """
    Permet de simuler l'évolution du revenu/patrimoine sur plusieurs années.
    Exemple simple: +2% revenu / an, +3% patrimoine / an.
    """
    income = data.get("income", 50000)
    wealth = data.get("wealth", 100000)
    years = data.get("years", 5)

    projections = []
    for year in range(1, years + 1):
        income *= 1.02  # +2% par an
        wealth *= 1.03  # +3% par an
        projections.append({"year": year, "income": round(income), "wealth": round(wealth)})

    return {"projections": projections}
