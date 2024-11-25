import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

const MineMap = () => {
  const [mines, setMines] = useState([]);

  // Fetch the mine locations from the backend
  useEffect(() => {
    fetch("http://localhost:8083/mines")
      .then((response) => response.json())
      .then((data) => {
        setMines(data); // Store the data in state
      })
      .catch((error) => {
        console.error("Error fetching mine data:", error);
        Alert.alert("Error", "Unable to fetch mine data. Please try again.");
      });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 49.694168,
          longitude: -112.832779,
          latitudeDelta: 1.5, // Adjust the zoom level
          longitudeDelta: 1.5
        }}
      >
        {/* Loop through the mine data and add markers */}
        {mines.map((mine) => (
          <Marker
            key={mine.id}
            coordinate={{
              latitude: mine.latitude,
              longitude: mine.longitude
            }}
            title={mine.name}
            description={mine.description || "No description available"}
          >
            <Callout>
              <View>
                <Text style={styles.markerTitle}>{mine.name}</Text>
                <Text>{mine.description || "No description available"}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  markerTitle: {
    fontWeight: "bold",
    fontSize: 16
  }
});

export default MineMap;
