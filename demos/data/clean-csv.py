import csv

cin = csv.reader(open('bw-ltag2011.csv'), delimiter=';')
cout = csv.writer(open('bw-ltag2011_.csv','w'), dialect='excel-tab')

first = True

for r in cin:
	if first:
		rout = ['id','name'] + r[1:]
		first = False
	else:
		id,name = r[0].split(' ',1)
		rout = [id,name] + r[1:]
	cout.writerow(rout)


