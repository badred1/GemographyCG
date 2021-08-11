/**
 * @format
 */
 import * as React from 'react';
 import { AppRegistry, StatusBar, LogBox } from 'react-native';
 import App from './App';
 import { name as appName } from './app.json';
 import { Provider as PaperProvider } from 'react-native-paper';
 import { QueryClient, QueryClientProvider, } from 'react-query';
 import theme from "./theme";
 
 const queryClient = new QueryClient();
 LogBox.ignoreLogs(['Setting a timer']);
 
 export default function Main() {
   return (
     <PaperProvider theme={theme}>
       <QueryClientProvider client={queryClient}>
         <StatusBar
           backgroundColor="#6050DC" />
         <App />
       </QueryClientProvider>
     </PaperProvider>
   );
 }
 
 AppRegistry.registerComponent(appName, () => Main);
 