import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Modal, Portal, Text } from 'react-native-paper';
import Button from "../../components/Button"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from "./Styles";

interface SimpleModalProps {
  data: any,
  showDetails: boolean,
  dismiss: any,
  icon?: any,
  handleRepoNav?: any
}



const SimpleModal: React.FC<SimpleModalProps> = (props) => {
  const {
    data,
    showDetails,
    dismiss,
    icon,
    handleRepoNav
  } = props;

  const containerStyle = { backgroundColor: 'white', paddingTop: "5%", margin: 30, borderRadius: 20 };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(showDetails);
  }, [showDetails]);

  const handleOnDismiss = () => {
    setVisible(false);
    dismiss();
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={handleOnDismiss} contentContainerStyle={containerStyle}>
        {
          icon &&
          <View style={styles.icon}>
            {icon}
          </View>
        }
        <ScrollView>
          <View style={{ paddingHorizontal: "4%" }}>
            {Object.entries(data).map((item: any, index) => (
              <View key={index} style={{ flexDirection: "column", paddingVertical: "3%" }}>
                <Text style={{ color: 'black', fontFamily: "Raleway-Bold" }}>{item[0]} :</Text>
                <Text style={{ color: 'black' }}>{item[1] === null ? "Not Specified" : `${item[1]}`}</Text>
              </View>
            ))}
            <Button
              label="Navigate to Repo"
              onClick={() => {
                handleRepoNav();
                dismiss();
              }}
              style={{ maxWidth: "80%", alignSelf: "center", marginVertical: "10%" }}
              icon={
                () => <Icon
                  name='github'
                  size={20}
                  color='white'
                />
              }
            />
          </View>
        </ScrollView>

      </Modal>
    </Portal>
  )
}

export default SimpleModal;