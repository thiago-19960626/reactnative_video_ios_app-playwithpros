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
    Grid,
    Col,
    Title,
    Footer,
    List,
    ListItem,
    Thumbnail
} from 'native-base';
import {
    View,
    TextInput,
    Dimensions,
    Alert
} from 'react-native';
import { Video } from 'react-native-media-kit';
import styles from './styles';
import RNFS from 'react-native-fs';
import { API_URL } from '../../constants/';
import RNCompress from 'react-native-compress';

const { width, height } = Dimensions.get('window');

class SubmitScreen extends Component{
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            tags: [
                "#chelsea", "#championsleague", "#champion", "#champs"
            ],
            progress: 0,
            uploading: false
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(){
        var  { dispatch } = this.props;

        //show progress
        this.setState({
            uploading: true
        });

        RNCompress.compressVideo(this.props.navigation.state.params.video_link, "medium").then(data => {
            console.log("Video compress", data.path);

            //upload
            const progress = response => {           
                var percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100);
                this.setState({
                    progress: percentage
                });
                console.log("File Uploading", percentage + "%");                
            };

            const begin = res => {
                console.log("File Uploading", "Start");            
            };
            var ret = RNFS.uploadFiles({
                toUrl: API_URL + "createvideo",
                files: [
                {
                    name: 'data',
                    filename: 'merged_video.mov',
                    filepath: data.path,
                    filetype: 'video/mov'
                }
                ],
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                fields: {
                    'category': this.props.navigation.state.params.category ,
                },
                begin: begin,
                progress: progress
            });
            ret.promise.then((res1) => {
                console.log("Video uploading Success", res1);
                //hide progress
                this.setState({
                    uploading: false
                });

                Alert.alert(
                    "Video Submitted",
                    "You have successfully submitted. We will review your video shorthly",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                dispatch(NavigationActions.reset({index: 0, actions: [NavigationActions.navigate({routeName:'Home'})]}));
                            }
                        }
                    ],
                    {cancelable: false}
                );
            })
            .catch(err1 => {
                console.log("Video uploading Error", err1);
                //hide progress
                this.setState({
                    uploading: false
                });

                alert("Please confirm your wifi or network.");
            })
        });
    }

    goBack(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.back());
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
                        <Title style={styles.title}>Submit</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text> </Text>
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.content}>
                    <Grid>
                        <Col>
                            <TextInput multiline={true} style={styles.textarea} placeholder="Add #tags..."/>
                        </Col>
                        <Col style={styles.videoContainer}>
                            <View style={styles.videoWrapper}>
                                <Video
                                    src={this.props.navigation.state.params.video_link}
                                    autoplay={false}
                                    preload={'auto'}
                                    loop={false}
                                    controls={false}
                                    muted={true}
                                    style={{
                                        width: width / 3,
                                        height: width / 3
                                    }}
                                    />
                            </View>
                        </Col>
                    </Grid>
                    {false?
                    <List style={styles.listContainer}>
                        {
                            this.state.tags.map((item, index) => {
                                return (
                                    <ListItem key={index} style={styles.listItem}>
                                        <Text>{item}</Text>
                                    </ListItem>
                                )
                            })
                        }
                    </List>: null}
                </Content>
                <Footer style={styles.footer}>
                    <Button block style={styles.submitBtn} onPress={() => this.onSubmit()}>
                        <Text style={styles.submitBtnText}>Submit</Text>
                    </Button>
                </Footer>
                {this.state.uploading?
                <View style={styles.backdrop}>
                    <Text style={styles.progressText}>{this.state.progress}%</Text>
                </View>:null}
            </Container>
        );
    }
}

export default connect()(SubmitScreen);