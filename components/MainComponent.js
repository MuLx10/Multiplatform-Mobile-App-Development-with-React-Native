import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Text, ScrollView, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import { DISHES } from '../shared/dishes';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home ,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () => (<Icon name="menu" size={30} color='black' onPress={() => navigation.toggleDrawer()} iconStyle={{marginLeft:15}}/>)
    })}
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTitleStyle: {
        color: '#fff'
      },
      headerTintColor: '#fff',
    })
  }
);

const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu,
          navigationOptions: ({ navigation }) => ({
            headerLeft: () => (<Icon name="menu" size={30} color='black' onPress={() => navigation.toggleDrawer()} iconStyle={{marginLeft:15}}/>)
        })},
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

const ContactNavigator = createStackNavigator({
  Contact: { screen: Contact,
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => (<Icon name="menu" size={30} color='black' onPress={() => navigation.toggleDrawer()} iconStyle={{marginLeft:15}}/>)
  })}
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"
    },
    headerTintColor: "#fff"
  })
});

const AboutNavigator = createStackNavigator({
  About: { screen: About,
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => (<Icon name="menu" size={30} color='black' onPress={() => navigation.toggleDrawer()} iconStyle={{marginLeft:15}}/>)
  })}
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"
    },
    headerTintColor: "#fff"
  })
});

const ReservationNavigator = createStackNavigator({
  Reservation: { screen: Reservation,
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => (<Icon name="menu" size={30} color='black' onPress={() => navigation.toggleDrawer()} iconStyle={{marginLeft:15}}/>)
  })}
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"
    },
    headerTintColor: "#fff",
  })
});

const FavoritesNavigator = createStackNavigator({
    Favorites: { screen: Favorites,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () => (<Icon name="menu" size={30} color='black' onPress={() => navigation.toggleDrawer()} iconStyle={{marginLeft:15}}/>)
    })}
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"
      },
      headerTintColor: "#fff"
    })
})


const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Home:
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='home'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }
      },
    Menu:
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          ),
        },
      },
    Contact:
      {
        screen: ContactNavigator,
        navigationOptions: {
          title: 'Contact Us',
          drawerLabel: 'Contact Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='address-card'
              type='font-awesome'
              size={22}
              color={tintColor}
            />
          ),
        }
     },
    About:
      {
        screen: AboutNavigator,
        navigationOptions: {
          title: 'About Us',
          drawerLabel: 'About Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info-circle'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          ),
        }
     },
    Reservation:
     { screen: ReservationNavigator,
       navigationOptions: {
         title: 'Reserve Table',
         drawerLabel: 'Reserve Table',
         drawerIcon: ({ tintColor, focused }) => (
           <Icon
             name='cutlery'
             type='font-awesome'
             size={24}
             color={tintColor}
           />
         ),
       }
     },
    Favorites:
      { screen: FavoritesNavigator,
        navigationOptions: {
          title: 'My Favorites',
          drawerLabel: 'My Favorites',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='heart'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }
      }
}, {
  drawerBackgroundColor: '#fff',//'#D1C4E9',
  contentComponent: CustomDrawerContentComponent
});

const MainNavigatorApp = createAppContainer(MainNavigator);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }
  componentDidMount() {
     this.props.fetchDishes();
     this.props.fetchComments();
     this.props.fetchPromos();
     this.props.fetchLeaders();
   }
  render() {

    return (
        <View style={{flex:1, paddingTop:0 }}>
            <MainNavigatorApp />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
