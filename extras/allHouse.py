import requests
names =[];
f = open("HouseNames","w")

for i in range(1,445):
	print (i)
	r = requests.get('http://anapioficeandfire.com/api/houses/'+str(i))
	f.write("\n"+str(r.json()["name"]))
f.close()
