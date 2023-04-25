
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
const Stack = createNativeStackNavigator();
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

function App() {


  const theme = {
    ...MD3LightTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#3498db',
      secondary: '#f1c40f',
      tertiary: '#a1b2c3',
    },
  };



  return (

    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator initialRouteName="Home" 
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#3498db' },
        }}>
          <Stack.Screen options={{
            title: 'Resultado da loteria'
          }} name="Home" component={Home} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>


  );
}

export default App;



