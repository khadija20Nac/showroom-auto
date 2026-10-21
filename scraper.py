
import json
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

url = "https://www.automobile.tn/fr/neuf/recherche"

response = requests.get(url)
print("Code HTTP :", response.status_code)

soup = BeautifulSoup(response.text, "html.parser")
with open("public/autos.json", "r", encoding="utf-8") as fichier:
    anciennes_autos = json.load(fichier)

autos = anciennes_autos.copy()
for element in soup.find_all(string=lambda text: text and "DT" in text):
    parent = element.parent

    for i in range(3):
        if parent.parent:
            parent = parent.parent

    texte = parent.get_text(" ", strip=True)

    resultat = re.search(
        r"(.+?)\s+à partir de\s+([\d\s]+)\s*DT",
        texte
    )

    if resultat:
        nom = resultat.group(1).strip()
        nom = re.sub(r"\bPromo\b\s*", "", nom, flags=re.IGNORECASE).strip()
        prix = resultat.group(2).strip()

        image = parent.find("img")
        photo = ""

        if image:
            photo = (
                image.get("src")
                or image.get("data-src")
                or image.get("data-lazy-src")
                or ""
            )

            if photo:
                photo = urljoin(url, photo)

        auto = {
            "brand": nom,
            "model": nom,
            "price": int(prix.replace(" ", "")),
            "power": 0,
            "photo": photo,
            "availability": True,
            "description": "Voiture neuve"
        }

        if not any(a["price"] == auto["price"] and
                   a["model"] == auto["model"] for a in autos):
            autos.append(auto)


print(f"{len(autos)} voitures enregistrées dans les deux fichiers.")
print(f"{sum(1 for a in autos if a['photo'])} voitures avec une photo.")
