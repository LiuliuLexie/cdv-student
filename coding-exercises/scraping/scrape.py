import requests
import json
from pprint import pprint
from bs4 import BeautifulSoup
print("works!")

# 1. download a webpage in plain text 
url="https://wheresthejump.com/full-movie-list/"

# url_start = ""
# url_end = "" 
# data = []
# for i in range (1,8):
#   url = url_start+str(i)+url_end
#   result = request.get(url)




result=requests.get(url)
# print(result)
# request code 200: works

plain_result=result.text
# print(plain_result) # get the html print
# in terminal: pip3 install beautifulsoup4






# 2. turn webpage into structured html object
#       with the library called Beautiful Soup

soup=BeautifulSoup(result.text,'html.parser')
# print(soup)







# 3. Traverse the html structure to find info we need
#       and save all that info into a nicely structured object/ dictionairy

table_of_interest=soup.select_one(".table-movie")
# print(table_of_interest)
rows=table_of_interest.select("tr")
# print(rows[0])
# find more info on the url in tr
data=[]
for row in rows:
    # print(row)
    cells=row.select("td")
    # print(cells)
    # link=row.select("a")
    link_src=cells[0].select_one("a")["href"]
        
        # url_further=link_src
        # result_further = request.get(url_further)
        # plain_result_further=result_further.text
        # soup=BeautifulSoup(result_further.text,'html.parser')
        # video_info=soup.select_one(".video-info-grid-container")



    data.append({
        "title": cells[0].text,
        "link":link_src,
        "director": cells[1].text,
        "year": cells[2].text,
        "jumpCount": cells[3].text,
        "jumpScareRating":cells[4].text,
        "netflix":cells[5].text
    })
    # print("-"*50)

pprint(data)






# 4. save the dictionairy as a data.json file DONE
with open("data.json","w") as outfile:
    json.dump(data,outfile,indent=4)