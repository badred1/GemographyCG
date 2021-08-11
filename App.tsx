import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReposList from './screens/ReposList';
import AppBar from './components/AppBar';
import RepoWebView from './screens/RepoWebView';


const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ReposList"
          component={ReposList}
          options={{
            header: () => <AppBar title="Trending Repos" backgroundColor="#6050DC" />
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