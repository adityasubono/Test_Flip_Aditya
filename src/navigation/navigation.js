import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createStackNavigator();
import {enableScreens} from 'react-native-screens';
import transactionListPage from '../containers/transactionListPage';
import detailListTransaction from '../containers/detailListTransaction';
enableScreens();

const App = () => {
  return (
    <NavigationContainer>
      <>
        <Stack.Navigator>
          <Stack.Screen
            name={'transactionList'}
            options={{headerShown: false}}
            component={transactionListPage}
          />
          <Stack.Screen
            name={'detail'}
            options={{headerShown: false}}
            component={detailListTransaction}
          />
        </Stack.Navigator>
      </>
    </NavigationContainer>
  );
};

export default App;
