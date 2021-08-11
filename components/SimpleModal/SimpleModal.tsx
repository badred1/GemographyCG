import React, { useState, useEffect } from "react";
import { Image, ScrollView, View } from "react-native";
import { Modal, Portal, Text } from 'react-native-paper';
import Button from "../../components/Button"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from "./Styles";
import { PRIMARY_COLOR } from "../../assets/constants/colors";
import { SMALL_ICON } from "../../assets/constants/sizes";

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

  const containerStyle = { backgroundColor: 'white', margin: 30, borderRadius: 20 };

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
          <View style={{ backgroundColor: PRIMARY_COLOR, paddingTop: "5%", borderRadius: 15 }}>
            <Image source={{ uri: data.avatar }} style={[styles.avatar]} />
          </View>
        }
        <ScrollView>
          <View style={{ paddingHorizontal: "4%" }}>
            {Object.entries(data).map((item: any, index) => (
              <View key={index} style={{ flexDirection: "column", paddingVertical: "3%" }}>
                <Text style={styles.title}>{item[0]} :</Text>
                <Text style={styles.description}>{item[1] === null ? "Not Specified" : `${item[1]}`}</Text>
              </View>
            ))}
            <Button
              label="Navigate to Repo"
              onClick={() => {
                handleRepoNav();
                dismiss();
              }}
              style={styles.button}
              icon={
                () => <Icon
                  name='github'
                  size={SMALL_ICON}
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