import React, { useEffect } from 'react';
import { FlatList, Text, View, Pressable, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, minusCart, updateUser } from '../redux/dataSlice';

const cart = () => {

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.dataAPI)

    const { productArr, user } = dataredux;

    const handleAdd = (item) => {
        dispatch(addCart(item))
    }

    const handleminus = (item) => {
        if (item.sl > 1) {
            dispatch(minusCart(item))
        }
    }

    const handleSave = async () => {
        let update = await dispatch(updateUser(user));
        if (update) {
            alert("update success!");
        } else {
            alert("update error");
        }
    }

    // useEffect(() =>{

    // },[user])

    const Child = ({ item }) => {
        return (
            <View style={{
                marginTop: 5, height: 100, width: 350, flexDirection: "row"
                , justifyContent: "space-between", alignItems: "center"
            }}>
                <View style={{ width: 50, height: 100 }}>
                    <Image source={item.img} style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                    }} />
                </View>
                <View>
                    <Text>{item.price}</Text>
                </View>
                <View>{item.sl}</View>
                <View style={{ gap: 10, flexDirection: "row" }}>
                    <Pressable style={{
                        height: 40, width: 40, backgroundColor: "blue", borderRadius: 5, justifyContent: "center",
                        alignItems: "center"
                    }}
                        onPress={() => handleAdd(item)}
                    >
                        <Text style={{ fontSize: 15, color: "white", fontWeight: "600" }}>+</Text>
                    </Pressable>
                    <Pressable style={{
                        height: 40, width: 40, backgroundColor: "blue", borderRadius: 5, justifyContent: "center",
                        alignItems: "center"
                    }}
                        onPress={() => handleminus(item)}
                    >
                        <Text style={{ fontSize: 15, color: "white", fontWeight: "600" }}>-</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>Cart</Text>
            </View>
            <View style={{ alignItems: "center" }}>
                <FlatList
                    data={user && user.cart && user.cart.length > 0 ? user.cart : []}
                    renderItem={({ item }) => <Child item={item} />}
                />
            </View>
            <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                <Pressable style={{
                    height: 40, width: 80, backgroundColor: "blue", borderRadius: 5, justifyContent: "center",
                    alignItems: "center", marginRight: 20
                }}
                    onPress={() => handleSave()}
                >
                    <Text style={{ fontSize: 15, color: "white", fontWeight: "600" }}>Save</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default cart;