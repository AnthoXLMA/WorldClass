from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Atlas Social API")

# CORS pour React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Données simulées ===
distributions = {
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


# === Routes API ===
@app.get("/distributions/{country}")
def get_distribution(country: str):
    return distributions.get(country.upper(), distributions["FR"])


@app.post("/calculate")
def calculate(data: dict):
    income = data.get("income", 50000)
    wealth = data.get("wealth", 100000)

    # percentiles (simples ratios pour l'instant)
    income_percentile_country = min(income / 120000, 1)
    income_percentile_world = min(income / 200000, 1)
    wealth_percentile_country = min(wealth / 700000, 1)
    wealth_percentile_world = min(wealth / 1000000, 1)

    # classification sociale
    if income < 30000:
        social_class = "Classe populaire"
    elif income < 60000:
        social_class = "Classe moyenne"
    elif income < 120000:
        social_class = "Classe moyenne supérieure"
    else:
        social_class = "Classe aisée"

    return {
        "income_percentile_country": round(income_percentile_country, 2),
        "income_percentile_world": round(income_percentile_world, 2),
        "wealth_percentile_country": round(wealth_percentile_country, 2),
        "wealth_percentile_world": round(wealth_percentile_world, 2),
        "class_country": social_class,
    }
