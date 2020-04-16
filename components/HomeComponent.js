import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

function RenderItem(props) {
    if (props.isLoading) {
        return(
                <Loading />
        );
    }
    else if (props.errMess) {
        return(
            <View>
                <Text>{props.erreMess}</Text>
            </View>
        );
    }
    else {
         const item = props.item;   
        if (item != null) {
            return(
                <Card
                    featuredTitle={item.name}
                    featuredSubtitle={item.designation}
                    image={{uri: baseUrl + item.image}}>
                    <Text
                        style={{margin: 10}}>
                        {item.description}</Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dishes: DISHES,
          promotions: PROMOTIONS,
          leaders: LEADERS
        };
    }

    static navigationOptions = {
        title: 'Home',
    };

    render() {

        return(
            <ScrollView>
              <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    isLoading={this.props.dishes.isLoading}
                    erreMess={this.props.dishes.erreMess}
                    />
                <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    erreMess={this.props.promotions.erreMess}
                    />
                <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    isLoading={this.props.leaders.isLoading}
                    erreMess={this.props.leaders.erreMess}
                    />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);
