import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';

const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu },
        Dishdetail: { screen: Dishdetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }
);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }
  onDishSelect(dishId) {
      this.setState({selectedDish: dishId});
  }
  render() {

    return (
      // <View style={{flex:1, paddingTop:0 }}>
            <MenuNavigator />
        // </View>
    );
  }
}

export default Main;
