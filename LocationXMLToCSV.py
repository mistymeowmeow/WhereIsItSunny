# Importing the required libraries
import xml.etree.ElementTree as ET
import csv
import pandas as pd

cols = ["elevation", "id", "latitude", "longitude", "obsSource", "name", "nationalPark", "region", "unitaryAuthArea"]
rows = []

# Parsing the XML file
tree = ET.parse("WeatherLocations.xml")
root = tree.getroot()
print(len(root))

for i in root:
    elevation = i.attrib["elevation"] if ('elevation' in i.attrib) else ""
    id = i.attrib["id"] if ('id' in i.attrib) else ""
    region = i.attrib["region"] if ('region' in i.attrib) else ""
    latitude = i.attrib["latitude"] if ('latitude' in i.attrib) else ""
    longitude = i.attrib["longitude"] if ('longitude' in i.attrib) else ""
    obsSource = i.attrib["obsSource"] if ('obsSource' in i.attrib) else ""
    name = i.attrib["name"] if ('name' in i.attrib) else ""  
    nationalPark = i.attrib["nationalPark"] if ('nationalPark' in i.attrib) else ""
    region = i.attrib["region"] if ('region' in i.attrib) else ""
    unitaryAuthArea = i.attrib["unitaryAuthArea"] if ('unitaryAuthArea' in i.attrib) else ""

    rows.append({"elevation": elevation, "id": id, "latitude": latitude, "longitude": longitude,"obsSource": obsSource,"name": name, "region": region,"unitaryAuthArea": unitaryAuthArea })
  
df = pd.DataFrame(rows, columns=cols)
  
# Writing dataframe to csv
df.to_csv('WeatherLocations.csv')
