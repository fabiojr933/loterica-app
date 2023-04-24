
import * as React from 'react';
import { NavigationContainer, NavigationContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loteria from './src/pages/loteria';
import Home from './src/pages/Home';

import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

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
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Loteria" component={Loteria} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>


  );
}

export default App;



