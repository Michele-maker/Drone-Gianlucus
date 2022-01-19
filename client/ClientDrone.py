import requests
import random
import schedule
from datetime import datetime
import time
import json
from paho.mqtt.client import Client
import logging
import asyncio

from aiocoap import *
logging.basicConfig(level=logging.INFO)

HOST='10.30.134.17'
PATH='Drone' 

HTTP = "ipserver.json"
MQTT = "ipservermqtt.json"
CLIENT = Client(client_id="client_1")
#la funzione non va dato che ho riscontrato problemi con la libreria di coap per python
async def postcoap(jsondata):
    context = await Context.create_client_context()
    HOST='10.30.134.17'
    PATH='Ciao'
    await asyncio.sleep(2)
    payloadjson = json.dumps(jsondata)
    request = Message(code=POST, payload=payloadjson, uri="coap://{HOST}/{PATH}")

    response = await context.request(request).response

    print('Result: %s\n%r'%(response.code, response.payload))
#la funzione non va dato che ho riscontrato problemi con la libreria di coap per python
async def getcoat():
    protocol = await Context.create_client_context()

    request = Message(code=GET, uri=f'coap://{HOST}/{PATH}')

    try:
        response = await protocol.request(request).response
    except Exception as e:
        print('Failed to fetch resource:')
        print(e)
    else:
        print('Result: %s\n%r'%(response.code, response.payload))

def getIpHttp():
    f = open(HTTP, 'r')
    xx = f.read()
    myjson = json.loads(xx)
    f.close()
    return myjson['ip']


def getIpMqtt():
    f = open(MQTT, 'r')
    xx = f.read()
    myjson = json.loads(xx)
    f.close()
    return myjson['ip']


def postdronesend(jsondata):
    ip = getIpHttp()
    r = requests.post(f'http://{ip}:8011/api/drones', json=jsondata)


def error():
    print("errore orrore")


def mqttdronepublish(jsondata):
    ip = getIpMqtt()
    # ip="10.30.134.17:1833"
    # CLIENT.connect(ip)
    CLIENT.connect(ip, 1883, 60)
    print(jsondata["idDrone"])
    y = json.dumps(jsondata)
    CLIENT.publish(topic=f"DroneGianlucus/{jsondata['idDrone']}", payload=y)


# creo un metodo fittizio che simula il drone
def dronedemo():

    velocita = random.randrange(30000, 70000) / 1000
    posizione = random.randrange(30000, 70000) / 1000
    percentuale = random.randrange(1000, 100000) / 1000
    data = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    idDrone = random.randrange(1, 7)
    idPersona = random.randrange(1, 20)
    # print(data)
    json = {
        "dueDate": data,
        "idPersona": idPersona,
        "idDrone": idDrone,
        "posizione": posizione,
        "velocita": velocita,
        "percentuale": percentuale
    }

    #mqttdronepublish(json)
    asyncio.run(postcoap())

if __name__ == '__main__':
    # eseguo
    getIpMqtt()
    schedule.every(10).seconds.do(dronedemo)
    while True:
        schedule.run_pending()
        time.sleep(1)
