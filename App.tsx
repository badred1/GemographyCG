import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReposList from './screens/ReposList';
import AppBar from './components/AppBar';
import RepoWebView from './screens/RepoWebView';
import SplashScreen from "react-native-splash-screen";
import { PRIMARY_COLOR } from './assets/constants/colors';

// create a stack navigator
const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ReposList"
          component={ReposList}
          options={{
            header: () => <AppBar title="Trending Repos" backgroundColor={PRIMARY_COLOR} /> //adding custom header
          }} />
        <Stack.Screen
          name="RepoWebView"
          component={RepoWebView}
          options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App