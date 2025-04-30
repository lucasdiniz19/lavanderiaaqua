import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
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

export default function ScheduleScreen() {
    const { service } = useLocalSearchParams();
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [address, setAddress] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        if (service) {
            setSelectedService(JSON.parse(service as string));
        }
    }, [service]);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        setShowTimePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleSchedule = async () => {
        if (!address) {
            Alert.alert('Erro', 'Por favor, informe o endereço de coleta');
            return;
        }

        if (!selectedService) {
            Alert.alert('Erro', 'Por favor, selecione um serviço');
            return;
        }

        try {
            // Criar o novo pedido
            const newOrder: Order = {
                id: Date.now(), // Usando timestamp como ID único
                service: selectedService,
                address,
                date: date.toLocaleDateString('pt-BR'),
                time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                status: 'Agendado',
            };

            // Buscar pedidos existentes
            const existingOrders = await AsyncStorage.getItem('orders');
            let orders: Order[] = [];
            
            if (existingOrders) {
                orders = JSON.parse(existingOrders);
            }

            // Adicionar novo pedido
            orders.push(newOrder);

            // Salvar pedidos atualizados
            await AsyncStorage.setItem('orders', JSON.stringify(orders));

            Alert.alert('Sucesso', 'Agendamento realizado com sucesso!', [
                { 
                    text: 'OK', 
                    onPress: () => {
                        router.replace('/(tabs)/orders');
                    }
                }
            ]);
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao salvar o pedido');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Agendar Coleta</Text>
            
            {selectedService && (
                <View style={styles.serviceInfo}>
                    <Text style={styles.serviceTitle}>Serviço Selecionado:</Text>
                    <Text style={styles.serviceName}>{selectedService.title}</Text>
                    <Text style={styles.serviceDescription}>{selectedService.description}</Text>
                </View>
            )}
            
            <View style={styles.form}>
                <Text style={styles.label}>Endereço de Coleta</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu endereço completo"
                    value={address}
                    onChangeText={setAddress}
                />

                <Text style={styles.label}>Data da Coleta</Text>
                <TouchableOpacity 
                    style={styles.input}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text>{date.toLocaleDateString('pt-BR')}</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Horário Preferencial</Text>
                <TouchableOpacity 
                    style={styles.input}
                    onPress={() => setShowTimePicker(true)}
                >
                    <Text>{date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</Text>
                </TouchableOpacity>

                {(showDatePicker || showTimePicker) && (
                    <DateTimePicker
                        value={date}
                        mode={showDatePicker ? "date" : "time"}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                    />
                )}

                <TouchableOpacity style={styles.button} onPress={handleSchedule}>
                    <Text style={styles.buttonText}>Agendar Coleta</Text>
                </TouchableOpacity>
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
    serviceInfo: {
        backgroundColor: 'white',
        padding: 15,
        margin: 20,
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
    serviceTitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    serviceDescription: {
        fontSize: 14,
        color: '#666',
    },
    form: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 15,
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
}); 