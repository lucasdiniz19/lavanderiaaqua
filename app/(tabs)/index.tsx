import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

interface Service {
    id: number;
    title: string;
    description: string;
}

const services: Service[] = [
    { id: 1, title: 'Lavagem a Seco', description: 'Lavagem especial para roupas delicadas' },
    { id: 2, title: 'Lavagem Normal', description: 'Lavagem padrão para roupas comuns' },
    { id: 3, title: 'Passar Roupa', description: 'Passar roupas já lavadas' },
];

export default function HomeScreen() {
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const handleServiceSelect = (service: Service) => {
        setSelectedService(service);
        router.push({
            pathname: '/schedule',
            params: { service: JSON.stringify(service) }
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Aqua Clean Delivery</Text>
            
            <View style={styles.form}>
                <Text style={styles.label}>Serviços Disponíveis</Text>
                {services.map((service) => (
                    <TouchableOpacity 
                        key={service.id}
                        style={[
                            styles.serviceCard,
                            selectedService?.id === service.id && styles.selectedService
                        ]}
                        onPress={() => handleServiceSelect(service)}
                    >
                        <Text style={styles.serviceTitle}>{service.title}</Text>
                        <Text style={styles.serviceDescription}>{service.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F1F1",
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    form: {
        padding: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
    },
    serviceCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    selectedService: {
        borderColor: '#0821c4',
        borderWidth: 2,
    },
    serviceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    serviceDescription: {
        fontSize: 14,
        color: '#000',
    },
});