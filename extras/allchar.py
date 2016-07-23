import requests
names =[];
f = open("ThroneNames2","w")

for i in range(1996,2139):
	print (i)
	r = requests.get('http://anapioficeandfire.com/api/characters/'+str(i))
	f.write("\n"+str(r.json()["name"]))
f.close()