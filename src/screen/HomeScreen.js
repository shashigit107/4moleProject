import { View, Text, FlatList, StatusBar, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
const { height, width } = Dimensions.get("window")
import { connect, useDispatch } from 'react-redux'
import { hitApi, sendDataToApi } from '../redux/action/HomeAction'
import { isInternetConnected } from '../isInternetConnected'
import CustomPopup from '../component/CustomPopup'
import Icon from 'react-native-vector-icons/Entypo'

const HomeScreen = (props) => {
    const [inputValue, setInputValue] = useState("")
    const [userList, setUserList] = useState([])
    const [network, setNetwork] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const[shadowShowFirstTime,setShadowShowFirstTime]=useState(true)
    const inputRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        isInternetConnected().then(net => {
            setNetwork(net)
        })
       
    })
   

    const addUserNameHandler = () => {
        let addValue = { title: inputValue }
        
        if (network) {
            let sendFinalData = ([...userList, addValue])
            dispatch(sendDataToApi(sendFinalData, props.userData))
            setInputValue("")
            setUserList([])
            setShadowShowFirstTime(true)
        } else {
            if(shadowShowFirstTime){
                inputRef.current.show()
                setShadowShowFirstTime(false)
            }
            setUserList([...userList, addValue])
            setInputValue("")
        }
    }

    const handleRefresh = () => {
        setRefresh(true)
        dispatch(sendDataToApi(userList, props.userData))
        setUserList([])
        setRefresh(false)
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ width: width - 32, backgroundColor: 'grey', borderRadius: 10, }}>
                <Text style={{ padding: 10, fontSize: 20, fontWeight: "bold" }}>{item?.title}</Text>
                
            </View>
        )
    }

    const closePopup = () => {
        inputRef.current.close()
    }
        
       
    const Component = () => {
        return (
            <View>
                <View style={{  flexDirection: "row" }}>
                    <View style={{ alignItems: "center", flex: .9 }}>
                        <Text style={{ fontSize: 25, color: 'red', fontWeight: 'bold' }}>NOTE</Text>
                    </View>
                    <TouchableOpacity
                        onPress={closePopup}
                        activeOpacity={1}
                        style={{ flex: .1, position:"relative", top:-20,right:-15 }}> 
                        <Icon name="cross" size={35} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: "center", alignItems: 'center', paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, color: "grey", fontWeight: 'bold' }}>You are offline, but still
                        you can add name,once you get available list will get updated </Text>
                </View>
            </View>

        )
    }

    return (

        <>
            <StatusBar
                backgroundColor={network ? 'green' : 'red'}
                barStyle="dark-content"
                style={{ height: 70 }}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputfieldStyle}
                    placeholder='Please Enter your name'
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />
                <TouchableOpacity
                    style={[styles.buttomContainerStyle, network ? { backgroundColor: "green" } : { backgroundColor: "red" }]}
                    onPress={addUserNameHandler}>
                    <Text style={styles.textstyle}>clickToAddUserName</Text>
                </TouchableOpacity>
                <View style={{ paddingVertical: 10 }}>
                    <FlatList
                        data={props.userData}
                        renderItem={renderItem}
                        keyExtractor={(item) => `${item.title}`}
                        ItemSeparatorComponent={() => <View style={{ paddingVertical: 10 }}></View>}
                        refreshing={refresh}
                        onRefresh={handleRefresh}
                    />
                </View>
                <CustomPopup inputRef={inputRef}
                    component={Component}
                >
                </CustomPopup>
            </View>
        </>
    )
}
const mapStateToProps = (state) => {
    const { userData } = state.HomeReducer
    console.log("store", userData)
    return {
        userData,
    }
}

export default connect(mapStateToProps, {
    hitApi, sendDataToApi
})(HomeScreen)

const styles = StyleSheet.create({

    inputContainer: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
        alignItems: 'center'

    },
    inputfieldStyle: {
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
        backgroundColor: 'grey',
        borderRadius: 10,
        width: "100%"
    },
    textstyle: {
        fontSize: 16,
        fontWeight: '400',
        padding: 10,

    },
    buttomContainerStyle: {
        alignItems: 'flex-end',
        // backgroundColor: 'green',
        borderRadius: 10,
        marginTop: 10

    }

})