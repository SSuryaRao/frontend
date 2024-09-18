import pandas as pd
import folium
from folium.plugins import MarkerCluster
from folium import IFrame

# Load CSV data
df = pd.read_csv('media/csvfiles/Disaster.csv')
df['Latitude'] = pd.to_numeric(df['Latitude'], errors='coerce')
df['Longitude'] = pd.to_numeric(df['Longitude'], errors='coerce')
geo_df = df.dropna(subset=['Latitude', 'Longitude'])

# Create a base map
m = folium.Map(location=[20, 0], zoom_start=2, tiles='OpenStreetMap')
marker_cluster = MarkerCluster().add_to(m)

# Add markers
for i, row in geo_df.iterrows():
    folium.Marker(
        location=[row['Latitude'], row['Longitude']],
        popup=(f"<strong>Event Name:</strong> {row['Event Name']}<br>"
               f"<strong>Country:</strong> {row['Country']}<br>"
               f"<strong>Year:</strong> {row['Year']}<br>"
               f"<strong>Total Deaths:</strong> {row['Total Deaths']}<br>"
               f"<strong>Disaster Type:</strong> {row['Disaster Type']}"),
        icon=folium.Icon(color="red" if row['Total Deaths'] > 100 else "blue", icon="info-sign")
    ).add_to(marker_cluster)

# Save the map to an HTML file
m.save('map.html')
