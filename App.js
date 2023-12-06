import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import login from './src/component/login';
import { Provider, useSelector } from 'react-redux';
import store from './src/redux/store';
import home from './src/component/home';
import cart from './src/component/cart';
import { Pressable, Text, View } from 'react-native';
import Icons from "react-native-vector-icons/AntDesign"

const Stack = createNativeStackNavigator();


export default function App() {

  const Itemcart = () => {
    const navigation = useNavigation();
    const dataredux = useSelector((state) => state.dataAPI)
    const { user } = dataredux;

    console.log('check user', user)

    return (
      <View style={{ marginRight: 10 }}>
        <Pressable onPress={() => navigation.navigate("cart")}
          style={{ position: "relative" }}
        >
          <Text style={{ position: "absolute", top: -10, right: -5 }}>{user?.cart?.length}</Text>
          <Icons name='shoppingcart' size={24} />
        </Pressable>
      </View>
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='login'>
          <Stack.Screen name='login' component={login} options={{
            headerShown: false
          }} />
          <Stack.Screen name='home' component={home}
            options={{
              headerRight: () => <Itemcart />
            }}
          />
          <Stack.Screen name='cart' component={cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

