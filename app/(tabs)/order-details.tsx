import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

interface Service {
    id: number;
    title: string;
    description: string;
}

interface Order {
    id: number;
    service: Service;
    address: string;
    date: string;
    time: string;
    status: string;
}

export default function OrderDetailsScreen() {
    const { order } = useLocalSearchParams();
    const orderData: Order = JSON.parse(order as string);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Detalhes do Pedido</Text>
            
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Serviço</Text>
                <Text style={styles.serviceTitle}>{orderData.service.title}</Text>
                <Text style={styles.serviceDescription}>{orderData.service.description}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Data e Horário</Text>
                <Text style={styles.infoText}>{orderData.date} às {orderData.time}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Endereço de Coleta</Text>
                <Text style={styles.infoText}>{orderData.address}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Status</Text>
                <Text style={styles.statusText}>{orderData.status}</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    section: {
        backgroundColor: 'white',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginBottom: 10,
    },
    serviceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    serviceDescription: {
        fontSize: 14,
        color: '#666',
    },
    infoText: {
        fontSize: 16,
        color: '#333',
    },
    statusText: {
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: '600',
    },
}); 