// Imports: Dependencies
import React from 'react';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';

// Imports: Screens
import Navigation from './src/navigation/navigation';

// Imports: Redux Persist Persister
import {store, persistor} from './src/Redux/store/store';
import {SafeAreaView} from 'react-native';
// React Native: App
const App = () => {
  return (
    // Redux: Global Store
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation store={store} />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
