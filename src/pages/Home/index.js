
import * as React from 'react';
import { ScrollView } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { Card, Text, RadioButton, Button, Badge, TextInput, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

function Home() {
    const navigation = React.useContext(NavigationContext);
    const [value, setValue] = React.useState('');
    const [concurso, setConcurso] = React.useState('');
    const [resultado, setResultado] = React.useState([]);
    const [ganhadores, setGanhadores] = React.useState([]);
    const [acumulou, setAcumulou] = React.useState('');
    const [load, setLoad] = React.useState(false);
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
        setLoad(true);
        try {
            axios.get(API + '/' + value + '/' + concurso).then((resposta) => {
                var key = 1;
                var key2 = 1;
                if ((resposta.data['dezenas']) == undefined || resposta.data['dezenas'] == [] || resposta.data['dezenas'] == '') {
                    dadosResultado.push({ 'key': 1, 'valor': 'Concurso não encontrado' });
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
        setTimeout(() => {
            setLoad(false);
        }, 2000);
        setMostrarCard(true);
        setConcurso('');
        setValue('');
    }

    if (load == true) {
        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.load}>
                        <ActivityIndicator size='large' animating={true} color='#3498db' />
                        <Text style={{ textAlign: 'center', }}>Carregando...</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Text style={styles.acumulou}> {acumulou} </Text>
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
                                        <Text style={styles.ganhadores}>Premiacões</Text>

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

                        <Text style={styles.desenvolvido} variant="bodySmall">Desenvolvido por Fabio Pereira</Text>

                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10,
    },
    load: {
        marginTop: 250
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
    },
    acumulou: {
        textAlign: 'center',
        fontSize: 20,
        color: 'red',
        marginBottom: -15
    },
    ganhadores: {
        textAlign: 'center',
        marginBottom: 20
    },
    desenvolvido: {
        textAlign: 'center',
        marginTop: 50
    }
});

export default Home;

