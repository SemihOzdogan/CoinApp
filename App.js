import React from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Coins from './src/screens/Coins';
import Detail from './src/screens/Detail';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './src/redux/reducer'
import { createStore, applyMiddleware } from 'redux'

const store = createStore(reducer, applyMiddleware(thunk));
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store = {store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Coins">
          <Stack.Screen name="Coins" component={Coins}
            options={{
              title: "Coins", headerTitleAlign: 'center', headerLeft: null, headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: "#021B2C"
              },
              headerTitle: () => (
                <View style={{ justifyContent: "center", alignItems: "center", padding: 5 }}>
                  <Image style={{ width: 60, height: 60, }} source={require("./src/img/coin.gif")} />
                  <Text style={{ fontSize: 22, color: "#f5f5f5" }}>Coins</Text>
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={({ route }) => ({
              title: route.params.data.name, headerTitleAlign: 'center', headerLeft: null, headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: "#021B2C"
              },
              headerTitle: () => (
                <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", padding: 5 }}>
                  <Image style={{ width: 30, height: 30 }} source={{ uri: route.params.data.icon }} />
                  <Text style={{ marginLeft: 5, fontSize: 20, color: "white" }}>{route.params.data.name}</Text>
                  <Text style={{ marginLeft: 5, fontSize: 14, color: "#ddd", top: 2 }}>{route.params.data.symbol}</Text>
                </View>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer >
    </Provider>
  );
}
