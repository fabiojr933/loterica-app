
import * as React from 'react';
import { ScrollView } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { Card, Text, RadioButton, Button, Badge, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

function Home() {
    const navigation = React.useContext(NavigationContext);
    const [value, setValue] = React.useState('');
    const [concurso, setConcurso] = React.useState('');
    const [resultado, setResultado] = React.useState([]);
    const [ganhadores, setGanhadores] = React.useState([]);
    const [acumulou, setAcumulou] = React.useState('');

    const [mostrarCard, setMostrarCard] = React.useState(false);
    

    const API = 'https://loteriascaixa-api.herokuapp.com/api/';

    async function Resultado() {
        var dadosResultado = [];
        var dadosGanhadores = [];

        if (value == '') {
            alert('Selecione um jogo da loteria!')
            return;
        }
        if (concurso == '') {
            alert('É preciso informar o concurso!')
            return;
        }
        try {
            axios.get(API + '/' + value + '/' + concurso).then((resposta) => {
                var key = 1;
                var key2 = 1;
                if ((resposta.data['dezenas']) == undefined || resposta.data['dezenas'] == [] || resposta.data['dezenas'] == '') {
                    dadosResultado.push({ 'key': 1, 'valor': 'Concurso não encontrado' });
                  //  setMostrarCard(false);
                } else {
                    resposta.data['dezenas'].map(function (element) {
                        dadosResultado.push({ 'key': key, 'valor': element });
                        key++;
                    });
                }
                setResultado(dadosResultado);

                if ((resposta.data['premiacoes']) == undefined || resposta.data['premiacoes'] == [] || resposta.data['premiacoes'] == '') {
                    dadosGanhadores.push({ 'key': 1, 'acertos': '0', 'vencedores': '0', 'premio': '0' });
                } else {
                    resposta.data['premiacoes'].map(function (element) {
                        dadosGanhadores.push({ 'key': key2, 'acertos': element.acertos, 'vencedores': element.vencedores, 'premio': element.premio });
                        key2++;
                    });
                }
                setGanhadores(dadosGanhadores);

                if (resposta.data['acumulou'] == undefined) {
                    setAcumulou('Concurso não encontrado!')
                }
                if (resposta.data['acumulou'] == false) {
                    setAcumulou('')
                }
                if (resposta.data['acumulou'] == true) {
                    setAcumulou('Acumulou!')
                }
            });
        } catch (error) {

        }
        setMostrarCard(true);
    }

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} >
                <Text style={{ textAlign: 'center', fontSize: 20, color: 'red', marginBottom: -15 }}> {acumulou} </Text>
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
                    <Text> </Text>
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

                    {mostrarCard == true ?
                        <>
                            <Text> </Text>
                            <Card >
                                <Card.Content>
                                    <View style={styles.resultado}>
                                        {resultado.map((item, i) =>
                                            <View >
                                                <Text></Text>
                                                <Badge key={item.key} size={45} style={styles.Badge} >{item.valor}</Badge><Text> </Text>
                                            </View>
                                        )}
                                    </View>
                                </Card.Content>
                            </Card>
                            <Text> </Text>

                            <Card>
                                <Card.Content>
                                    <Text style={{ textAlign: 'center', marginBottom: 20 }}>Premiacões</Text>

                                    {ganhadores.map((item, i) =>
                                        <>
                                            <View style={{ flexDirection: 'row' }} >
                                                <View >
                                                    <Text>acertos          = </Text>
                                                    <Text>vencedores   = </Text>
                                                    <Text>premio           = </Text>
                                                </View>
                                                <View >
                                                    <Text>{item.acertos}</Text>
                                                    <Text>{item.vencedores}</Text>
                                                    <Text>R$ {item.premio}</Text>
                                                </View>
                                            </View>
                                            <Text> </Text>
                                        </>
                                    )}
                                </Card.Content>
                            </Card>
                            <Text> </Text>
                        </>

                        : null}

                    <Text style={{ textAlign: 'center', marginTop: 50 }} variant="bodySmall">Desenvolvido por Fabio Pereira</Text>

                </View>
            </ScrollView>
        </SafeAreaView>
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

