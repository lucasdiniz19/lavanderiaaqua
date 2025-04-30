import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function ProfileScreen() {
    const [userData, setUserData] = useState({
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 99999-9999',
        addresses: [
            { id: 1, street: 'Rua das Flores', number: '123', neighborhood: 'Centro' },
            { id: 2, street: 'Avenida Principal', number: '456', neighborhood: 'Jardim' },
        ],
        paymentMethods: [
            { id: 1, type: 'Cartão de Crédito', lastDigits: '**** **** **** 1234' },
            { id: 2, type: 'PIX', key: 'joao.silva@email.com' },
        ],
    });

    const handleLogout = () => {
        Alert.alert(
            'Sair',
            'Tem certeza que deseja sair?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sair', onPress: () => router.replace('/login') }
            ]
        );
    };

    const handleEditProfile = () => {
        router.push('/edit-profile');
    };

    const handleManageAddresses = () => {
        router.push('/addresses');
    };

    const handleManagePayments = () => {
        router.push('/payment-methods');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }}
                    style={styles.profileImage}
                />
                <Text style={styles.userName}>{userData.name}</Text>
                <Text style={styles.userEmail}>{userData.email}</Text>
                <Text style={styles.userPhone}>{userData.phone}</Text>
            </View>

            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
                    <Text style={styles.menuText}>Meus Dados</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={handleManageAddresses}>
                    <Text style={styles.menuText}>Endereços ({userData.addresses.length})</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={handleManagePayments}>
                    <Text style={styles.menuText}>Formas de Pagamento ({userData.paymentMethods.length})</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Configurações</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Ajuda e Suporte</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
                    <Text style={[styles.menuText, styles.logoutText]}>Sair</Text>
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
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    userPhone: {
        fontSize: 16,
        color: '#666',
    },
    menu: {
        padding: 20,
    },
    menuItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
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
    menuText: {
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#FF5252',
        marginTop: 20,
    },
    logoutText: {
        color: 'white',
        textAlign: 'center',
    },
}); 