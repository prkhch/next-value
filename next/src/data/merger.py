# https://great-woman-hoseung.tistory.com/6

import json

with open('kospi.json') as file_1:
	data1 = json.load(file_1)

with open('kosdaq.json') as file_2:
	data2 = json.load(file_2)
	
with open('nasdaq.json') as file_3:
	data3 = json.load(file_3)
	
with open('nyse.json') as file_4:
	data4 = json.load(file_4)
	

with open("newfile", "w") as new_file:
    json.dump(data1+data2+data3+data4, new_file)