import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginuser } from '../redux/dataSlice';

const login = ({ navigation, route }) => {

    const [arr, setarr] = useState([]);
    const [user, setuser] = useState("");
    const [password, setpassword] = useState("");

    const dispatch = useDispatch();
    const data = useSelector((state) => state.dataAPI)


    const handleGetAlluser = async () => {
        try {
            let res = await fetch("https://656fe9796529ec1c62384de6.mockapi.io/api/v1/user", {
                method: "GET"
            })
            if (!res) {
                throw new Error("get data arror");
            } else {
                let data = await res.json();
                setarr(data)
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    const handleLogin = () => {
        if (arr && arr.length > 0) {
            let userlogin = arr.findIndex((item) => item.name === user && item.password === password)
            if (userlogin !== -1) {
                dispatch(loginuser(arr[userlogin]))
                navigation.navigate("home")

            } else {
                alert("login error")
            }
        }
    }


    useEffect(() => {
        handleGetAlluser();
    }, [])




    return (
        <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>Login</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TextInput
                    style={{
                        height: 40, width: 350, borderWidth: 1,
                        borderStyle: "solid", outline: "none", borderRadius: 5,
                        marginTop: 10
                    }} placeholder='user'
                    value={user}
                    onChange={(e) => setuser(e.target.value)}
                />
                <TextInput
                    style={{
                        height: 40, width: 350, borderWidth: 1,
                        borderStyle: "solid", outline: "none", borderRadius: 5,
                        marginTop: 10
                    }}
                    placeholder='password' secureTextEntry={true}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}

                />
            </View>
            <View style={{ marginTop: 10, alignItems: "flex-end" }}>
                <Pressable style={{
                    width: 80, height: 35, borderRadius: 5, backgroundColor: "blue",
                    justifyContent: "center", alignItems: 'center', marginRight: 20
                }}
                    onPress={() => handleLogin()}
                >
                    <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>Login</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default login;