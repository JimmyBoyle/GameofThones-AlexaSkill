<<<<<<< HEAD
import requests
names =[];
f = open("ThroneNames2","w")

for i in range(1996,2139):
	print (i)
	r = requests.get('http://anapioficeandfire.com/api/characters/'+str(i))
	f.write("\n"+str(r.json()["name"]))
=======
import requests
names =[];
f = open("ThroneNames2","w")

for i in range(1996,2139):
	print (i)
	r = requests.get('http://anapioficeandfire.com/api/characters/'+str(i))
	f.write("\n"+str(r.json()["name"]))
>>>>>>> b651c170b8b86ea05a5726374445c4bb2656205b
f.close()