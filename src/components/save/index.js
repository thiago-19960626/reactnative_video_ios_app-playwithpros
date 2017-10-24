import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
    Container,
    Header,
    Button,
    Text,
    Left,
    Right,
    Icon,
    Body,
    Title,
    Content,
    View,
    Footer,
    Thumbnail
} from 'native-base';
import {
    Dimensions,
    Alert,
    CameraRoll
} from 'react-native';
import { Video } from 'react-native-media-kit';
import styles from './styles';
import RNVideoEditor from 'react-native-video-editor';
import { Colors } from '../../constants/';

const { width, height } = Dimensions.get('window');

class SaveScreen extends Component{
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            ratio: 1,
            progress: 0
        };

        RNVideoEditor.getSize(this.props.navigation.state.params.video_link, (ratio) => {
            this.setState({ratio: ratio});
        });
    }


    goBack(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.back());
    }

    onSave(){
        var  { dispatch } = this.props;
        CameraRoll.saveToCameraRoll(this.props.navigation.state.params.video_link, "video")
        .then(() => {
            Alert.alert(
                "Alert",
                "Video successfully saved.",
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            dispatch(NavigationActions.reset({index: 0, actions: [NavigationActions.navigate({routeName:'Home'})]}));
                        }
                    }
                ],
                {cancelable: false}
            );
        })
        .catch(err => {
            alert("Cannot Save merged video to Camera roll.");
        });        
    }

    onProgress(cur, total){
        this.setState({
            progress: (cur/ total)
        });
    }

    render(){
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent icon onPress={() => this.goBack()}>
                            <Thumbnail square source={require('../../assets/back.png')} style={{width: 25, height: 15}}/>
                        </Button>
                    </Left>
                    <Body style={styles.headerBody}>
                        <Title style={styles.title}>{this.props.navigation.state.params.title}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text> </Text>
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.content}>
                    <View style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: 5,
                        backgroundColor: 'white',
                        width: (width) * this.state.progress,
                        zIndex: 10
                    }}/>
                    <Video
                        src={"file://" + this.props.navigation.state.params.video_link}
                        autoplay={true}
                        preload={'auto'}
                        loop={true}
                        controls={false}
                        muted={true}
                        style={{
                            width: width,
                            height: width * (1 /this.state.ratio)
                        }}
                        onPlayerProgress={(cur, total) => this.onProgress(cur, total)}
                        />
                </Content>
                <Footer style={styles.footer}>
                    <Button block style={styles.saveBtn} onPress={() => this.onSave()}>
                        <Text style={styles.saveBtnText}>Save</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}

export default connect()(SaveScreen);