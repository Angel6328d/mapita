import React, { useState } from "react";
import { View, FlatList, Image, Text, TouchableWithoutFeedback, Animated, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapComponent from "../../components/Mapcomponent";

const pueblosMagicos = [
  {
    id: "1",
    nombre: "Izamal",
    descripcion: "La ciudad amarilla de Yucatán.",
    historia: "Izamal es conocida como la ciudad de los cerros y fue un importante centro ceremonial maya.",
    imagen: require("../../assets/images/izamal.jpeg"),
    latitud: 20.9333,
    longitud: -89.0167,
  },
  {
    id: "2",
    nombre: "Valladolid",
    descripcion: "Pueblo colonial con cenotes impresionantes.",
    historia: "Valladolid es famosa por su arquitectura colonial y su cercanía con el cenote Zací.",
    imagen: require("../../assets/images/valladolid-mexico.jpg"),
    latitud: 20.6892,
    longitud: -88.2011,
  },
];

const HomeScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPueblo, setSelectedPueblo] = useState(null);
  const [scaleAnimation] = useState(new Animated.Value(1));

  const handleSelectPueblo = (pueblo) => {
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedPueblo(pueblo);
    setSelectedLocation({
      latitude: pueblo.latitud,
      longitude: pueblo.longitud,
    });
    setModalVisible(true);
  };

  const handleResetLocation = () => {
    setSelectedLocation({
      latitude: 21.0497003017739, 
      longitude: -86.84691355213471, 
    });
  };

  return (
    <View style={styles.container}>
      {/* Mapa */}
      <View style={styles.mapContainer}>
        <MapComponent selectedLocation={selectedLocation} />
      </View>

      <FlatList
        data={pueblosMagicos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => handleSelectPueblo(item)}>
            <Animated.View style={[styles.card, { transform: [{ scale: scaleAnimation }] }]}>
              <Image source={item.imagen} style={styles.image} />
              <Text style={styles.title}>{item.nombre}</Text>
              <Text style={styles.description}>{item.descripcion}</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        )}
        contentContainerStyle={styles.listContainer} 
      />

      <TouchableOpacity style={styles.floatingButton} onPress={handleResetLocation}>
        <Ionicons name="navigate-circle" size={40} color="#fff" />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPueblo && (
              <>
                <Image source={selectedPueblo.imagen} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedPueblo.nombre}</Text>
                <Text style={styles.modalDescription}>{selectedPueblo.historia}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
  },
  mapContainer: {
    flex: 6, 
  },
  card: {
    width: 180,
    height: 250,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    color: "#333",
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginTop: 3,
  },
  listContainer: {
    paddingVertical: 10,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    borderRadius: 50,
    padding: 10,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;