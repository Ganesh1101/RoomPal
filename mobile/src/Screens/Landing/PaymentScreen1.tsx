import React from "react"
import { Image, Text, TouchableOpacity, SafeAreaView, View } from "react-native"
import { primaryColor } from "../Styles/Styles"
import { ScrollView } from "react-native-gesture-handler"

const paymentScreen1 = ({ navigation }) => {
    return (
        <ScrollView>
            <SafeAreaView style={{ backgroundColor: primaryColor, flex: 1 }}>
                <View style={{ flexDirection: 'row', gap: 80 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()} style={{ marginLeft: 20, marginTop: 25 }}>
                        <Image source={require('../Images/ic_backArrow.png')} tintColor={'#FFFFFF'} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, marginTop: 20, color: '#FFFFFF' }}>Payment Methods</Text>
                </View>
                <View style={{ backgroundColor: '#FFFFFF', flex: 1, borderTopLeftRadius: 35, borderTopRightRadius: 35, marginTop: 130,  }} >

                    <TouchableOpacity style={{
                        height: 150, width: 65, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderRadius: 20, top: -110, shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.50,
                        shadowRadius: 3.84,
                        // Android
                        elevation: 5,
                        marginLeft:25

                    }}>
                        <Image source={require('../Images/ic_plusIcon.png')} tintColor={primaryColor} />
                    </TouchableOpacity>
                    <View style={{ top: -85,paddingLeft:25,paddingRight:25,paddingTop:25, }}>
                        <Text style={{ fontSize: 18 }}>Other Payment Methods</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', gap: 20 }}>
                            <View style={{ height: 35, width: 35, backgroundColor: '#76B3E0', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Image source={require('../Images/ic_credit_and_debit.png')} tintColor={'#FFFFFF'} />
                            </View>
                            <Text style={{ fontSize: 18, color: '#000' }}>Credit/Debit Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', gap: 20 }}>
                            <View style={{ height: 35, width: 35, backgroundColor: '#F7B0AC', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Image source={require('../Images/ic_netBanking.png')} tintColor={'#FFFFFF'} />
                            </View>
                            <Text style={{ fontSize: 18, color: '#000' }}>Net Bancking</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', gap: 20 }}>
                            <View style={{ height: 35, width: 35, backgroundColor: '#A88EFB', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Image source={require('../Images/ic_googleWallet.png')} tintColor={'#FFFFFF'} />
                            </View>
                            <Text style={{ fontSize: 18, color: '#000' }}>Google Wallete</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', gap: 20 }}>
                            <View style={{ height: 35, width: 35, backgroundColor: '#CE93FD', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Image source={require('../Images/ic_phonePe.png')} tintColor={'#FFFFFF'} />
                            </View>
                            <Text style={{ fontSize: 18, color: '#000' }}>PhonePe</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', gap: 20 }}>
                            <View style={{ height: 35, width: 35, backgroundColor: '#A9F879', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Image source={require('../Images/ic_otherWallet.png')} tintColor={'#FFFFFF'} />
                            </View>
                            <Text style={{ fontSize: 18, color: '#000' }}>Other Walletes</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: primaryColor, marginBottom: 70, borderTopLeftRadius:35,borderTopRightRadius:35,padding:30,flexDirection:'row',flex:1,gap:80 }}>
                       <View>
                           <Text style={{fontSize:18,color:'#FFFFFF'}}>$ 200</Text>
                           <Text style={{fontSize:16,color:'#FFFFFF'}}>View Details</Text>
                        </View> 
                        <TouchableOpacity style={{height:40,width:150,backgroundColor:'#FFFFFF',alignItems:'center',justifyContent:'center',borderRadius:20}}>
                            <Text style={{fontSize:18,color:primaryColor}}>Pay Now</Text>
                        </TouchableOpacity>
                    </View>

                </View>



            </SafeAreaView>
        </ScrollView>
    )
}

export default paymentScreen1