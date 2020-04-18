import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Picker, Switch, Button, Alert, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import * as Calendar from 'expo-calendar';

export default class Reservation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(Date.UTC(2019, 2, 18)),
            mode: 'date',
            show: false,
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reservation Table'
    }

    obtainNotificationPermission = async () => {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)

        if ( permission.status !== 'granted' ){
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
            if ( permission.status !== 'granted' ){
                Alert.alert("Permission not granted")
            }
        }
        return permission
    }

    obtainCalenderPermission = async () => {
        let permission = await Permissions.getAsync(Permissions.CALENDAR)

        if ( permission.status !== 'granted' ){
            permission = await Permissions.askAsync(Permissions.CALENDAR)
            if ( permission.status !== 'granted' ){
                Alert.alert("Permission not granted")
            }
        }
        return permission
    }

    getDefaultCalendarSource = async () => {
        const calendars = await Calendar.getCalendarsAsync()
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default')
        return defaultCalendars[0].source
    }
    handleReservationToCalendar = async ( date ) => {
        await this.obtainCalenderPermission()

        const defaultCalendarSource = Platform.OS === 'ios' ?
            await getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Expo Calendar' };

        const tempDate = Date.parse(date)
        const startDate = new Date(tempDate)
        const endDate = new Date(tempDate + 2 * 60 * 60 * 1000)

        const calendarID = await Calendar.createCalendarAsync({
            title: 'Expo Calendar',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        })

        await Calendar.createEventAsync(calendarID, {
            title: 'Con Fusion Table Reservation',
            startDate: startDate,
            endDate: endDate,
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        })
    }

    presentLocalNotification = async ( date ) => {
        await this.obtainNotificationPermission()

        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation!',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        })
    }

    handeReservation = () => {
        console.log(JSON.stringify(this.state))
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guests + '\nSmoking? ' + ( this.state.smoking ? 'YES' : 'NO' ) + '\nDate and Time: ' + this.state.date,
            [
                {
                    text: 'Cancel',
                    onPress: () => this.resetForm(),
                    style: 'cancel' },
                {
                    text: 'OK',
                    onPress: () => {
                        this.presentLocalNotification( this.state.date )
                        this.handleReservationToCalendar( this.state.date )
                        this.resetForm()
                    }
                },
            ],
            { cancelable: false }
        );
    }

    resetForm = () => {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        })
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                    <View style = { styles.formRow } >
                        <Text style = { styles.formLabel } >Number of Guest(s)</Text>
                        <Picker
                            style = { styles.formItem }
                            selectedValue = { this.state.guests }
                            onValueChange = {( itemValue, itemIndex ) => this.setState({ guests: itemValue })}
                        >
                            <Picker.Item label = '1' value = '1' />
                            <Picker.Item label = '2' value = '2' />
                            <Picker.Item label = '3' value = '3' />
                            <Picker.Item label = '4' value = '4' />
                            <Picker.Item label = '5' value = '5' />
                            <Picker.Item label = '6' value = '6' />
                        </Picker>
                    </View>
                    <View style = { styles.formRow }>
                        <Text style = { styles.formLabel }>Smoking/Non-Smoking?</Text>
                        <Switch
                            style = { styles.formItem }
                            value = { this.state.smoking }
                            trackColor = '#512DA8'
                            onValueChange = {( value ) => this.setState({ smoking: value })}
                        >
                        </Switch>
                    </View>
                    <View style = { styles.formRow }>
                        <Text style = { styles.formLabel }>Date and Time</Text>
                        <DatePicker
                            style={{flex: 2, marginRight: 20}}
                            date={this.state.date}
                            format=''
                            mode="datetime"
                            placeholder="select date and Time"
                            minDate="2017-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                    </View>
                    <View style = { styles.formRow }>
                        <Button
                            title = 'Reserve'
                            color = '#512DA8'
                            onPress = {() => this.handeReservation()}
                            accessibilityLabel = 'Learn more about this purple button!'
                        />
                    </View>
                </Animatable.View>
            </ScrollView>
        );
    }

    onDateOrTimeChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({ mode: Platform.OS === 'ios' });
        this.setState({ date: currentDate });
    }

    showMode = currentMode => {
        this.setState({ show: true });
        this.setState({ mode: currentMode});
    };

    showDatepicker = () => {
        this.showMode('date');
    };

    showTimepicker = () => {
        this.showMode('time');
    };
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10
    }
})
