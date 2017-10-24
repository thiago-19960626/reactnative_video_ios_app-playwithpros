import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
    Container,
    Header,
    Body,
    Text,
    Button,
    Left,
    Right,
    Icon,
    Content,
    List,
    ListItem,
    Title,
    Thumbnail
} from 'native-base';
import { Categories } from '../../constants/';
import styles from './styles';
import {
    StatusBar
} from 'react-native';

class ChooseScreen extends Component{
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            selectedIndex: 0
        };
    }

    onSelect(index){
        this.setState({
            selectedIndex: index
        });
    }

    goBack(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.back());
    }

    goNext(){
        var  { dispatch } = this.props;
        if(this.state.selectedIndex >= 0){
            dispatch(NavigationActions.navigate({routeName: 'Submit', params: { video_link: this.props.navigation.state.params.video_link, category: Categories[this.state.selectedIndex] }}));
        }       
    }

    render(){
        return (
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent icon onPress={() => this.goBack()}>
                            <Thumbnail square source={require('../../assets/back.png')} style={{width: 25, height: 15}}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.title}>Choose Sport</Title>
                    </Body>
                    <Right>
                        <Button transparent icon onPress={() => this.goNext()}>
                            <Thumbnail square source={require('../../assets/next.png')} style={{width: 25, height: 15}}/>
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.content}>
                    <List>
                        {
                            Categories.map((item, index) => {
                                return (
                                    <ListItem 
                                        key={index}
                                        onPress={() => this.onSelect(index)}
                                        style={[styles.listItem, (this.state.selectedIndex == index) && styles.listItemActive]}>
                                        <Text style={[styles.listItemText, (this.state.selectedIndex == index) && styles.listItemActiveText]}>{item}</Text>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Content>
            </Container>
        );
    }
}

export default connect()(ChooseScreen);