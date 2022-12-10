import { Modal, StyleSheet, Text, View } from 'react-native'
import React, {forwardRef, useImperativeHandle, useEffect, useState } from 'react'

const CustomPopup=forwardRef(({component, inputRef})=>{
// console.log(component,inputRef)
const[visible,setVisible]=useState(false)
useImperativeHandle(inputRef, () => ({
     close(){
        setVisible(false)
      },
     show(){
        setVisible(true)
    }
  }));



  return (
    <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
            <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(close);
        }}
      >
         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <View style={styles.modelView}>{component()}
         </View>
   </View>

      </Modal>

    </View>
  )
})
export default CustomPopup

const styles = StyleSheet.create({
    modelView:{
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        elevation: 5
    }
})