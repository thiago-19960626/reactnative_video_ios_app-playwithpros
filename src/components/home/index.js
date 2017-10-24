import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
    Container,
    Header,
    Content,
    Button,
    Icon,
    View,
    Thumbnail
} from 'native-base';
import {
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    RefreshControl,
    Text,
    StatusBar
} from 'react-native';
import styles  from './styles';
import { Colors, Categories, API_URL, SERVER_URL } from '../../constants/';

class HomeScreen extends Component{
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            selectedTabIndex: 1,
            tag: Categories[1],
            videos: [],
            refresh: false,
            inputing: true,
            searchText: ""
        }

        this.loadVideos = this.loadVideos.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentWillMount(){
        this.onRefresh();
    }

    onFocus(){
        this.setState({
            inputing: false
        })
    }

    onSearch(){
        if(this.state.searchText == ""){
            this.setState({
                inputing: true
            })
        }
    }

    loadVideos(){
        fetch(API_URL + 'videos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tag: this.state.tag
            })
        })
        .then((res) => res.json())
        .then(data => {
            console.log("Get Videos API Success", data);
            if(!data.err){
                this.setState({
                    videos: data.list,
                    refresh: false
                });
            }else{
                console.log("Get Videos API Error2", data.err);
                this.setState({
                    refresh: false
                });
            }
        })
        .catch(err => {
            console.log("Get Videos API Error", err);
            this.setState({
                refresh: false
            });
        });
    }

    onRefresh(){
        this.setState({
            refresh: true
        });
        this.loadVideos();
    }

    onSelectTab(index){
        this.state.selectedTabIndex = index;
        this.state.tag = Categories[index];
        this.onRefresh();     
    }

    onChangeText(text){
        this.setState({
            searchText: text
        })
    }

    goToImport(){
        var { dispatch }  =  this.props;
        dispatch(NavigationActions.navigate({routeName: 'Import'}));
    }

    goToSelect(video_link, image_link, id){
        var { dispatch }  =  this.props;
        dispatch(NavigationActions.navigate({routeName: 'Select', params: { video_link: video_link , image_link: image_link, id: id}}));
    }

    render(){
        StatusBar.setHidden(false);
        return (
            <Container>
                <Header searchBar style={styles.header}>
                    <View>
                        <View style={styles.searchContainer}>
                            {this.state.inputing?
                            <TouchableWithoutFeedback onPress={() => this.onFocus()}>
                                <View style={styles.searchInputPlaceholderContainer}>
                                    <Icon style={styles.searchInputPlaceholderIcon} name="search"></Icon>
                                    <Text style={styles.searchInputPlaceholderText}>Search highlights</Text>
                                </View>
                            </TouchableWithoutFeedback>:
                            <TextInput
                                autoCorrect={false}
                                style={styles.searchInput}
                                onEndEditing={() => this.onSearch()}
                                autoFocus={true}
                                value={this.state.searchText}
                                onChangeText={(text) => this.onChangeText(text)}
                                />
                            }
                        </View>
                        <ScrollView style={styles.tabContainer} horizontal={true}>
                            {
                                Categories.map((tabItemText, index) => {
                                    return (
                                        <Button 
                                            key={index}
                                            onPress={() => this.onSelectTab(index)}
                                            style={[styles.tabItemButton, (this.state.selectedTabIndex == index) && styles.tabItemActiveButton]}>
                                            <Text style={[styles.tabItemText, (this.state.selectedTabIndex == index) && styles.tabItemActiveText]}>{tabItemText.toUpperCase()}</Text>
                                        </Button>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </Header>
                <Content 
                    style={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refresh}
                            onRefresh={this.onRefresh}
                        />
                    }
                    >
                    <View style={styles.wrapper}>
                        {
                            this.state.videos.map((video, index) => {
                                return (
                                    <TouchableWithoutFeedback onPress={() => this.goToSelect(video.video_link, video.image_link, video._id)} key={index}>
                                        <View style={styles.gridItemContainer}>
                                            <Thumbnail square source={{uri: SERVER_URL + 'videos/' + video.image_link}} style={styles.gridItemImage}/>
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                            })
                        }
                    </View>                    
                </Content>
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomBtnWrapper}>
                        <Button icon style={styles.bottomCircleBtn} onPress={() => this.goToImport()}>
                            <View style={styles.bottomCircleBtnWrapper}>
                                <Thumbnail square source={require('../../assets/plus.png')} style={styles.bottomPlusIcon}/>
                            </View>
                        </Button>
                    </View>
                </View>
            </Container>
        );
    }
}

export default connect()(HomeScreen);