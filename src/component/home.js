import React, { useEffect } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, getAllProduct } from '../redux/dataSlice';

const home = () => {

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.dataAPI)

    const { productArr } = dataredux;

    useEffect(() => {
        dispatch(getAllProduct())
    }, [])

    const Child = ({ item }) => {

        const handleAdd = (item) => {
            dispatch(addCart({ ...item, sl: 1 }));
            console.log('check item', item)
        }

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
                <View>
                    <Pressable style={{
                        height: 40, width: 80, backgroundColor: "blue", borderRadius: 5, justifyContent: "center",
                        alignItems: "center"
                    }}
                        onPress={() => handleAdd(item)}
                    >
                        <Text style={{ fontSize: 15, color: "white", fontWeight: "600" }}>Add</Text>
                    </Pressable>
                </View>
            </View>
        )
    }


    return (
        <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>Home</Text>
            </View>
            <View style={{ alignItems: "center" }}>
                <FlatList
                    data={productArr && productArr.length > 0 ? productArr : []}
                    renderItem={({ item }) => <Child item={item} />}
                />
            </View>


        </View>
    );
};

export default home;