<<<<<<< HEAD
import requests
names =[];
f = open("HouseNames","w")

for i in range(1,445):
	print (i)
	r = requests.get('http://anapioficeandfire.com/api/houses/'+str(i))
	f.write("\n"+str(r.json()["name"]))
f.close()
=======
import requests
names =[];
f = open("HouseNames","w")

for i in range(1,445):
	print (i)
	r = requests.get('http://anapioficeandfire.com/api/houses/'+str(i))
	f.write("\n"+str(r.json()["name"]))
f.close()
>>>>>>> b651c170b8b86ea05a5726374445c4bb2656205b
