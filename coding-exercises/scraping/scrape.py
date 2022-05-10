# coding logic

# url ....
# request url
# beautiful soup...
# in for loop, get each
#    - movie name
#    - director
#    - link to movie page
#          link ....
#          request link
#          beautiful soup...
#          in for loop, get each
#              - jump scare details
#              - ...
#    put all collected data into one data point




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
for row in rows[:3]:
    # print(row)
    cells=row.select("td")
    # print(cells)
    # link=row.select("a")
    link_src=cells[0].select_one("a")["href"]

    # get detailed info
    result_further = requests.get(link_src)
    soup=BeautifulSoup(result_further.text,'html.parser')
    # print(soup)
    video_info=soup.select_one(".video-info-grid-container")

    # get the detailed info: runtime & tags
    p_tags = video_info.select("p")
    for p in p_tags:
        if p.text.startswith("Runtime"):
            runtime = p.text.split("Runtime: ")[1].split(" minutes")[0]
            # print("runtime:", runtime)
            # print("-"*25)
        elif p.text.startswith("Tags"):
            tags = p.text.split("Tags: ")[1].split(", ")
            # print("tags:", tags)
            # print("-"*25)

    # get the detailed info: jump scare times
    jumpScareTime_info=soup.select_one(".entry_content")
    lines=jumpScareTime_info.select("p")
    for line in lines:
        if line.text.startswith("00:"):
            jumpScareTime=p.text
            print(jumpScareTime)
            print("-"*25)

    # data.append({
    #     "title": cells[0].text,
    #     "link":link_src,
    #     "director": cells[1].text,
    #     "year": cells[2].text,
    #     "jumpCount": cells[3].text,
    #     "jumpScareRating":cells[4].text,
    #     "netflix":cells[5].text,
    #     "tags": tags,
    #     "runtime": runtime
    # })
    # print("-"*50)

pprint(data)


# 
# # 4. save the dictionairy as a data.json file DONE
# with open("data.json","w") as outfile:
#     json.dump(data,outfile,indent=4)