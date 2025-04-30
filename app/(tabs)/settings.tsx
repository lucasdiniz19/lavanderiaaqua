import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Switch, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
    name: string;
    email: string;
    phone: string;
}

interface Address {
    id: number;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
}

interface PaymentMethod {
    id: number;
    type: string;
    cardNumber: string;
    cardName: string;
    expiryDate: string;
}

export default function SettingsScreen() {
    const [userData, setUserData] = useState<UserData>({
        name: '',
        email: '',
        phone: '',
    });
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [notifications, setNotifications] = useState(true);

    useEffect(() => {
        loadUserData();
        loadAddresses();
        loadPaymentMethods();
    }, []);

    const loadUserData = async () => {
        try {
            const data = await AsyncStorage.getItem('userData');
            if (data) {
                setUserData(JSON.parse(data));
            }
        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
        }
    };

    const loadAddresses = async () => {
        try {
            const data = await AsyncStorage.getItem('addresses');
            if (data) {
                setAddresses(JSON.parse(data));
            }
        } catch (error) {
            console.error('Erro ao carregar endereços:', error);
        }
    };

    const loadPaymentMethods = async () => {
        try {
            const data = await AsyncStorage.getItem('paymentMethods');
            if (data) {
                setPaymentMethods(JSON.parse(data));
            }
        } catch (error) {
            console.error('Erro ao carregar métodos de pagamento:', error);
        }
    };

    const handleSaveUserData = async () => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            Alert.alert('Sucesso', 'Dados salvos com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar os dados');
        }
    };

    const handleAddAddress = () => {
        const newAddress: Address = {
            id: Date.now(),
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            zipCode: '',
        };
        setAddresses([...addresses, newAddress]);
    };

    const handleSaveAddresses = async () => {
        try {
            await AsyncStorage.setItem('addresses', JSON.stringify(addresses));
            Alert.alert('Sucesso', 'Endereços salvos com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar os endereços');
        }
    };

    const handleAddPaymentMethod = () => {
        const newPaymentMethod: PaymentMethod = {
            id: Date.now(),
            type: 'Cartão de Crédito',
            cardNumber: '',
            cardName: '',
            expiryDate: '',
        };
        setPaymentMethods([...paymentMethods, newPaymentMethod]);
    };

    const handleSavePaymentMethods = async () => {
        try {
            await AsyncStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
            Alert.alert('Sucesso', 'Métodos de pagamento salvos com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar os métodos de pagamento');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Configurações</Text>

            {/* Dados Pessoais */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Dados Pessoais</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={userData.name}
                    onChangeText={(text) => setUserData({ ...userData, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={userData.email}
                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    value={userData.phone}
                    onChangeText={(text) => setUserData({ ...userData, phone: text })}
                />
                <TouchableOpacity style={styles.button} onPress={handleSaveUserData}>
                    <Text style={styles.buttonText}>Salvar Dados</Text>
                </TouchableOpacity>
            </View>

            {/* Endereços */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Endereços</Text>
                {addresses.map((address) => (
                    <View key={address.id} style={styles.addressCard}>
                        <TextInput
                            style={styles.input}
                            placeholder="Rua"
                            value={address.street}
                            onChangeText={(text) => {
                                const updatedAddresses = addresses.map(a =>
                                    a.id === address.id ? { ...a, street: text } : a
                                );
                                setAddresses(updatedAddresses);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Número"
                            value={address.number}
                            onChangeText={(text) => {
                                const updatedAddresses = addresses.map(a =>
                                    a.id === address.id ? { ...a, number: text } : a
                                );
                                setAddresses(updatedAddresses);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Complemento"
                            value={address.complement}
                            onChangeText={(text) => {
                                const updatedAddresses = addresses.map(a =>
                                    a.id === address.id ? { ...a, complement: text } : a
                                );
                                setAddresses(updatedAddresses);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Bairro"
                            value={address.neighborhood}
                            onChangeText={(text) => {
                                const updatedAddresses = addresses.map(a =>
                                    a.id === address.id ? { ...a, neighborhood: text } : a
                                );
                                setAddresses(updatedAddresses);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Cidade"
                            value={address.city}
                            onChangeText={(text) => {
                                const updatedAddresses = addresses.map(a =>
                                    a.id === address.id ? { ...a, city: text } : a
                                );
                                setAddresses(updatedAddresses);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Estado"
                            value={address.state}
                            onChangeText={(text) => {
                                const updatedAddresses = addresses.map(a =>
                                    a.id === address.id ? { ...a, state: text } : a
                                );
                                setAddresses(updatedAddresses);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CEP"
                            value={address.zipCode}
                            onChangeText={(text) => {
                                const updatedAddresses = addresses.map(a =>
                                    a.id === address.id ? { ...a, zipCode: text } : a
                                );
                                setAddresses(updatedAddresses);
                            }}
                        />
                    </View>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
                    <Text style={styles.addButtonText}>+ Adicionar Endereço</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSaveAddresses}>
                    <Text style={styles.buttonText}>Salvar Endereços</Text>
                </TouchableOpacity>
            </View>

            {/* Métodos de Pagamento */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Métodos de Pagamento</Text>
                {paymentMethods.map((method) => (
                    <View key={method.id} style={styles.paymentCard}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome no Cartão"
                            value={method.cardName}
                            onChangeText={(text) => {
                                const updatedMethods = paymentMethods.map(m =>
                                    m.id === method.id ? { ...m, cardName: text } : m
                                );
                                setPaymentMethods(updatedMethods);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Número do Cartão"
                            value={method.cardNumber}
                            onChangeText={(text) => {
                                const updatedMethods = paymentMethods.map(m =>
                                    m.id === method.id ? { ...m, cardNumber: text } : m
                                );
                                setPaymentMethods(updatedMethods);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Data de Validade"
                            value={method.expiryDate}
                            onChangeText={(text) => {
                                const updatedMethods = paymentMethods.map(m =>
                                    m.id === method.id ? { ...m, expiryDate: text } : m
                                );
                                setPaymentMethods(updatedMethods);
                            }}
                        />
                    </View>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={handleAddPaymentMethod}>
                    <Text style={styles.addButtonText}>+ Adicionar Cartão</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSavePaymentMethods}>
                    <Text style={styles.buttonText}>Salvar Cartões</Text>
                </TouchableOpacity>
            </View>

            {/* Configurações Gerais */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Configurações Gerais</Text>
                <View style={styles.settingRow}>
                    <Text style={styles.settingLabel}>Notificações</Text>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                    />
                </View>
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        backgroundColor: '#F9F9F9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    addButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    addressCard: {
        backgroundColor: '#F9F9F9',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    paymentCard: {
        backgroundColor: '#F9F9F9',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    settingLabel: {
        fontSize: 16,
    },
}); 