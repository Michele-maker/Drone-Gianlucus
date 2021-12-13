import requests
import random
import schedule
from datetime import datetime

def dronesend(id,vel,pos,perc):
    

    r = requests.post('https://127.0.0.1:8011/api/drones', json={
        "id": id,
        "dueDate": datetime.now().strftime("%Y-%D-%M"),
        "posizione": pos,
        "velocita": vel,
        "percentuale": perc
    })
    print(f"Status Code: {r.status_code}, Response: {r.json()}")

#creo un metodo fittizio che simula il drone
def dronedemo():
    id=12223
    velocita = random.randrange(30000,70000) / 1000
    posizione = random.randrange(30000,70000) / 1000
    percentuale = random.randrange(1000,100000) / 1000
    dronesend(id,velocita,posizione,percentuale)

if __name__ == '__main__':
    #eseguo 
    schedule.every(1).minutes.do(dronedemo())