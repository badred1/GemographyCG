import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: "5%"
  },
  container: {
    backgroundColor: 'white',
    margin: 30,
    borderRadius: 20
  },
  button: {
    maxWidth: "80%",
    alignSelf: "center",
    marginVertical: "10%"
  },
  description: {
    color: 'black', 
    fontFamily: "Raleway-Regular" 
  },
  title: { 
    color: 'black', 
    fontFamily: "Raleway-Bold" 
  }
});