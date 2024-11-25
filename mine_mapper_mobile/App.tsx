import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import MineMap from "./map_front_end/MineMap";
import MineInfoForm from "./form_data_front_end/FormData";

const App: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Mine Locations Across Canada</Text>
      {/* Map Component */}
      <View style={styles.mapContainer}>
        <MineMap />
      </View>
      {/* Form Component */}
      <View style={styles.formContainer}>
        <Text style={styles.formHeader}>Form Details</Text>
        <MineInfoForm />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 20
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16
  },
  mapContainer: {
    height: 400, // Set a fixed height for the map view
    marginBottom: 16
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2
  },
  formHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16
  }
});

export default App;
