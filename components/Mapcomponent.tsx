import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapComponent = ({ selectedLocation }) => {
    const mapRef = useRef(null);

    // Coordenadas de UT Cancún
    const INITIAL_REGION = {
        latitude: 21.0497003017739, // Latitud de UT Cancún
        longitude: -86.84691355213471, // Longitud de UT Cancún
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };

    useEffect(() => {
        if (selectedLocation && mapRef.current) {
            mapRef.current.animateToRegion({
                ...selectedLocation,
                latitudeDelta: 0.05,  // Ajustar zoom
                longitudeDelta: 0.05, // Ajustar zoom
            });
        }
    }, [selectedLocation]);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={INITIAL_REGION}
            >
                {/* Marcador de UT Cancún con las coordenadas correctas */}
                <Marker coordinate={{ latitude: 21.0497003017739, longitude: -86.84691355213471 }} title="UT Cancún" />

                {/* Marcador dinámico si hay un Pueblo Mágico seleccionado */}
                {selectedLocation && (
                    <Marker coordinate={selectedLocation} title="Pueblo Mágico" />
                )}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default MapComponent;