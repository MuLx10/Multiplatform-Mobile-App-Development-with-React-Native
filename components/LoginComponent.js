import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native'
import { Input, Icon, CheckBox, Button } from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Asset } from "expo-asset"
import * as ImageManipulator from "expo-image-manipulator"
import { baseUrl } from '../shared/baseUrl'


class LoginTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount = () => {
        SecureStore.getItemAsync('userinfo')
        .then( userdata => {
            const userinfo = JSON.parse( userdata )
            if ( userinfo ){
                this.setState({ username: userinfo.username })
                this.setState({ password: userinfo.password })
                this.setState({ remember: true })
            }
        } )
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name = 'sign-in'
                type = 'font-awesome'
                size = { 24 }
                iconStyle = {{ color: tintColor }}
            />
        )
    }

    handeLogin = () => {
        console.log(JSON.stringify(this.state))

        if ( this.state.remember ){
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                    // remember: this.state.remember
                })
            )
            .catch( error => console.log("Couldn't save user info due to error: ", error))
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
            .catch( error => console.log("Couldn't delete user info due to error: ", error))
        }
    }
    render() {
        return (
            <View style = { styles.container }>
                <Input
                    placeholder = "Username"
                    leftIcon = {{ type: "font-awesome", name: "user-o" }}
                    onChangeText = {( username ) => this.setState({ username })}
                    value = { this.state.username }
                    containerStyle = { styles.formInput }
                />
                <Input
                    placeholder = "Password"
                    secureTextEntry
                    leftIcon = {{ type: "font-awesome", name: "key" }}
                    onChangeText = {( password ) => this.setState({ password })}
                    value = { this.state.password }
                    containerStyle = { styles.formInput }
                />
                <CheckBox
                    title = "Remember Me"
                    checked = { this.state.remember }
                    center
                    onPress = {() => this.setState({ remember: !this.state.remember })}
                    containerStyle = { styles.formCheckbox }
                />
                <View style = { styles.formButton }>
                    <Button
                        title = 'Login'
                        onPress = {() => this.handeLogin()}
                        icon = {<Icon name = 'sign-in' type = 'font-awesome' color = 'white' size = { 24 } />}
                        buttonStyle = {{ backgroundColor: '#512DA8' }}
                    />
                </View>
                <View style = { styles.formButton }>
                    <Button
                        title = 'Register'
                        onPress = {() => this.props.navigation.navigate('Register')}
                        icon = {<Icon name = 'user-plus' type = 'font-awesome' color = 'blue' size = { 24 } />}
                        titleStyle = {{ color: 'blue' }}
                        clear
                    />
                </View>
            </View>
        )
    }
}

class RegisterTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name = 'user-plus'
                type = 'font-awesome'
                size = { 24 }
                iconStyle = {{ color: tintColor }}
            />
        )
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            })
            if (!capturedImage.cancelled) {
                // console.log(capturedImage)
                this.processImage( capturedImage.uri )
            }
        }
    }

    getImageFromGallery = async () => {
        const selectImage = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        })
        if (!selectImage.cancelled) {
            console.log(selectImage)
            this.processImage(selectImage.uri)
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                {resize: {width: 400}}
            ],
            {format: 'png'}
        );
        console.log(processedImage)
        this.setState({imageUrl: processedImage.uri })
    }

    handeRegister = () => {
        console.log(JSON.stringify(this.state))

        if ( this.state.remember ){
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                    // remember: this.state.remember
                })
            )
            .catch( error => console.log("Couldn't save user info due to error: ", error))
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
            .catch( error => console.log("Couldn't delete user info due to error: ", error))
        }
    }

    render() {
        return (
            <ScrollView>
                <View style = { styles.container }>
                    <View style = { styles.imageContainer } >
                        <Image
                            source = {{ uri: this.state.imageUrl }}
                            loadingIndicatorSource = { require('./images/logo.png')}
                            style = { styles.image }
                        />
                        <Button
                            title = 'Camera'
                            onPress={ this.getImageFromCamera }
                        />
                        <Button
                            title = 'Gallery'
                            onPress={ this.getImageFromGallery }
                        />
                    </View>
                    <Input
                        placeholder = "Username"
                        leftIcon = {{ type: "font-awesome", name: "user-o" }}
                        onChangeText = {( username ) => this.setState({ username })}
                        value = { this.state.username }
                        containerStyle = { styles.formInput }
                    />
                    <Input
                        placeholder = "Password"
                        secureTextEntry
                        leftIcon = {{ type: "font-awesome", name: "key" }}
                        onChangeText = {( password ) => this.setState({ password })}
                        value = { this.state.password }
                        containerStyle = { styles.formInput }
                    />
                    <Input
                        placeholder = "First Name"
                        leftIcon = {{ type: "font-awesome", name: "user-o" }}
                        onChangeText = {( firstname ) => this.setState({ firstname })}
                        value = { this.state.firstname }
                        containerStyle = { styles.formInput }
                    />
                    <Input
                        placeholder = "Last Name"
                        leftIcon = {{ type: "font-awesome", name: "user-o" }}
                        onChangeText = {( lastname ) => this.setState({ lastname })}
                        value = { this.state.lastname }
                        containerStyle = { styles.formInput }
                    />
                    <Input
                        placeholder = "Email"
                        leftIcon = {{ type: "font-awesome", name: "envelope-o" }}
                        onChangeText = {( email ) => this.setState({ email })}
                        value = { this.state.email }
                        containerStyle = { styles.formInput }
                    />
                    <CheckBox
                        title = "Remember Me"
                        checked = { this.state.remember }
                        center
                        onPress = {() => this.setState({ remember: !this.state.remember })}
                        containerStyle = { styles.formCheckbox }
                    />
                    <View style = { styles.formButton }>
                        <Button
                            title = 'Register'
                            onPress = {() => this.handeRegister()}
                            icon = {<Icon name = 'user-plus' type = 'font-awesome' color = 'white' size = { 24 } />}
                            buttonStyle = {{ backgroundColor: '#512DA8' }}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
}, {
    tabBarOptions: {
        activeBackgroundColor: "#9575CD",
        inactiveBackgroundColor: "#D1C4E9",
        activeTintColor: "white",
        inactiveTintColor: 'gray'
    }
})

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },
    formInput: {
        marginHorizontal: "2.5%"
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
})
