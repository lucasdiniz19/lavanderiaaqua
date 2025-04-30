import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default function OrdersScreen() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const savedOrders = await AsyncStorage.getItem('orders');
            if (savedOrders) {
                setOrders(JSON.parse(savedOrders));
            }
        } catch (error) {
            console.error('Erro ao carregar pedidos:', error);
        }
    };

    const handleOrderPress = (order: Order) => {
        router.push({
            pathname: '/order-details',
            params: { order: JSON.stringify(order) }
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Meus Pedidos</Text>
            
            {orders.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>Nenhum pedido encontrado</Text>
                </View>
            ) : (
                orders.map((order) => (
                    <TouchableOpacity
                        key={order.id}
                        style={styles.orderCard}
                        onPress={() => handleOrderPress(order)}
                    >
                        <Text style={styles.orderTitle}>{order.service.title}</Text>
                        <Text style={styles.orderDate}>{order.date} às {order.time}</Text>
                        <Text style={styles.orderStatus}>Status: {order.status}</Text>
                    </TouchableOpacity>
                ))
            )}
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
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#666',
    },
    orderCard: {
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
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    orderDate: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    orderStatus: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '600',
    },
}); 