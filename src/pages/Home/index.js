
import * as React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { Card, Text, RadioButton, Button, Badge, TextInput } from 'react-native-paper';
import axios from 'axios';

function Home() {
    const navigation = React.useContext(NavigationContext);
    const [value, setValue] = React.useState('');
    const [concurso, setConcurso] = React.useState('');
    const [dados, setDados] = React.useState([]);
    const [resultado, setResultado] = React.useState([]);

    const API = 'https://loteriascaixa-api.herokuapp.com/api/';

    async function Resultado() {
        var dadosResultado = [];
        if (value == '') {
            alert('Selecione um jogo da loteria!')
        }
        if (concurso == '') {
            alert('É preciso informar o concurso!')
        }
        try {
            axios.get(API + '/' + value + '/' + concurso).then((resposta) => {
                resposta.data['dezenas'].map(function (element) {
                    dadosResultado.push({ 'valor': element });                   
                });
                setResultado(dadosResultado);
            });           
        } catch (error) {

        }
    }

    return (
        <View style={styles.container}>

            <Card>
                <Card.Content>
                    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                        <RadioButton.Item label="MEGA-SENA" value="mega-sena" />
                        <RadioButton.Item label="LOTOFÁCIL" value="lotofacil" />
                        <RadioButton.Item label="QUINA" value="quina" />
                    </RadioButton.Group>
                </Card.Content>
            </Card>

            <Card>
                <Card.Content>
                    <TextInput
                        mode="outlined"
                        label="Digite o concurso"
                        onChangeText={(v) => setConcurso(v)}
                        keyboardType='numeric'
                    />
                </Card.Content>
            </Card>

            <View style={styles.button}>
                <Button mode="contained" onPress={() => { Resultado() }}>
                    Buscar
                </Button>
                <Text> </Text>
            </View>

            <Card>
                <Card.Content>
                    <View style={styles.resultado}>
                        {resultado.map((item, i) =>
                            <View >
                                <Text></Text>
                                <Badge key={1} size={45} style={styles.Badge} >{item.valor}</Badge><Text> </Text>
                            </View>
                        )}
                    </View>
                </Card.Content>

            </Card>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10,
    },
    button: {
        marginTop: 30,
    },
    resultado: {
        flexDirection: "row",
        flexWrap: 'wrap',
        marginRight: 5
    },
    Badge: {
        marginTop: 5
    }
});

export default Home;

