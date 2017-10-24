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
    Thumbnail,
    Grid,
    Col
} from 'native-base';
import {
    Dimensions,
    Alert
} from 'react-native';
import { Video } from 'react-native-media-kit';
import Camera from  'react-native-camera';
import { Colors, SERVER_URL } from '../../constants/';
import styles from './styles';
import RNVideoEditor from 'react-native-video-editor';
import RNFS from 'react-native-fs';

const { width, height } = Dimensions.get('window');

class RecordScreen extends Component{
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            recording: false,
            cameraType: false,
            progress: 0,
            ratio: 0,
            temp: [],
            title: this.props.navigation.state.params.title,
            processing: false
        }

        //get video size
        RNVideoEditor.getSize(this.props.navigation.state.params.video_link, (ratio) => {
            console.log("Video Ratio", ratio);
            this.setState({ratio: ratio});
        });

        this.enableNext = this.enableNext.bind(this);
        this.enableTrash = this.enableTrash.bind(this);
    }

    componentWillMount(){
        this.setState({
            temp: [],
            progress: 0,
            cameraType: false,
            recording: false
        });
    }

    componentDidMount(){
        if(this.videoobj){
            this.videoobj.seekTo(0);
        }
    }

    removeTemp(){
        //delte temp files
        this.state.temp.map((file, index) => {
            RNFS.unlink(file).then(() => {
                console.log("temp file deleting success");
            })
            .catch(err => {
                console.log("temp file deleting error");
            })
        });
    }

    goBack(){
        var  { dispatch } = this.props;

        Alert.alert(
            'Discard VIdeo',
            'If you go back now, your progress will be discarded',
            [
                {
                    text: 'Cancel',
                    onPress: () => {

                    }
                },
                {
                    text: 'Discard',
                    onPress: () => {
                        this.removeTemp();
                        dispatch(NavigationActions.back());
                    }
                }
            ],
            {cancelable: false}
        );
    }

    goNext(){
        //show progress
        this.setState({
            processing: true
        });

        var  { dispatch } = this.props;
        
        //merge temp video files
        this.state.temp.push(this.props.navigation.state.params.video_link);
        RNVideoEditor.merge(
            this.state.temp,
            (this.props.navigation.state.params.title == 'Play with'),
            (result) => {
                console.log("Video Merging Error", result);
                //hide progress
                this.setState({
                    processing: false
                });

                setTimeout(() => {
                    this.removeTemp();
                }, 500);                

                alert("Processing Error");

                dispatch(NavigationActions.back());
            },
            (result, file) => {
                console.log("Video Merging Success", file);

                setTimeout(() => {
                    this.removeTemp();
                }, 500);

                //hide progress
                this.setState({
                    processing: false
                });

                dispatch(NavigationActions.navigate({routeName: 'Save', params: {video_link: file, title: this.props.navigation.state.params.title}}));
            }
        );
        //init
        this.setState({
            recording: false,
            temp: [],
            progress: 0
        });
        if(this.videoobj){
            this.videoobj.stop();
        }        
    }

    onPressIn(){
        if(this.videoobj && this.cameraobj){
            this.setState({
                recording: true
            });
            this.videoobj.play();
            this.cameraobj.capture({mode: Camera.constants.CaptureMode.video})
            .then(data => {
                console.log("Add Video Temp File",data.path);
                this.state.temp.push(data.path);
                //refresh
                this.setState({
                    cameraType: this.state.cameraType
                });
            })
            .catch(err => {
                
            });            
        }
    }

    onPressOut(){
        if(this.videoobj && this.cameraobj){
            this.setState({
                recording: false
            });
            this.cameraobj.stopCapture();
            this.videoobj.pause();
        }        
    }

    onProgress(cur, total){
        this.setState({
            progress: (cur/ total)
        });
    }

    onEnd(){
        if(this.videoobj && this.cameraobj){
            this.cameraobj.stopCapture();
            setTimeout(() => {
                this.goNext();
            }, 500);
        }        
    }

    getCameraType(){
        if(this.state.cameraType == false){
            return Camera.constants.Type.back;
        }else{
            return Camera.constants.Type.front;
        }
    }

    onFlip(){
        this.setState({
            cameraType: !this.state.cameraType
        });
    }

    onTrash(){
        this.removeTemp();  
        if(this.videoobj){
            this.setState({
                progress: 0,
                temp: [],
                recording: false
            });
            this.videoobj.seekTo(0);
        }       
    }

    enableNext(){
        if(this.props.navigation.state.params.title == 'Play like' && this.state.temp.length > 0){
            return true;
        }else{
            return false;
        }
    }

    enableTrash(){
        if(this.state.temp.length > 0){
            return true;
        }else{
            return false;
        }
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
                    <Body>
                        <Title style={styles.title}>{this.props.navigation.state.params.title}</Title>
                    </Body>
                    <Right>
                        {this.enableNext()?
                        <Button transparent icon onPress={() => this.goNext()}>
                            <Thumbnail square source={require('../../assets/next.png')} style={{width: 25, height: 15}}/>
                        </Button>:
                        <Button transparent>
                            <Text> </Text>
                        </Button>
                        }
                    </Right>
                </Header>
                <Content>
                    <Grid>
                        <Col>
                            <View style={{width: width/ 2, height: (1 /this.state.ratio) * (width / 2), overflow: 'hidden', alignItems: 'center', justifyContent: 'center'}}>
                                <Camera
                                    ref={(cam) => {
                                        this.cameraobj = cam;
                                    }}
                                    style={styles.cameraview}
                                    aspect={Camera.constants.Aspect.fill}
                                    captureTarget={Camera.constants.CaptureTarget.temp}
                                    type={this.getCameraType()}
                                    defaultTouchToFocus
                                    mirroeImage={false} 
                                    />
                            </View>
                        </Col>
                        <Col style={{position: 'relative'}}>
                            <Video
                                ref={(video) => {
                                    this.videoobj = video;
                                }}
                                src={"file://" + this.props.navigation.state.params.video_link}
                                autoplay={false}
                                preload={'auto'}
                                loop={false}
                                controls={false}
                                muted={true}
                                style={{
                                    width: width / 2,
                                    height: (this.props.navigation.state.params.title == 'Play like')? 0: (1 /this.state.ratio) * (width / 2)
                                }}
                                onPlayerProgress={(cur, total) => this.onProgress(cur, total)}
                                onPlayerFinished={() => this.onEnd()}
                                />
                            {this.props.navigation.state.params.title == 'Play like'?
                            <Thumbnail 
                                square 
                                style={{
                                    width: width/ 2,
                                    height: (1 /this.state.ratio) * (width / 2)
                                }}
                                source={{uri: SERVER_URL + '/videos/' + this.props.navigation.state.params.image_link}}/>
                            :null}
                            {!this.state.recording?
                            <View style={styles.videoBackdrop}/>: null}
                        </Col>
                    </Grid>
                    <View style={{
                        width: width,
                        height: 9,
                        backgroundColor: 'rgb(50,50,50)'
                    }}>
                        <View style={{
                            width: (width * this.state.progress),
                            height: 9,
                            backgroundColor: 'white'
                        }}/>
                    </View>
                </Content>
                <Footer style={styles.footer}>
                    <Grid>
                        <Col style={styles.flipBtnContainer}>
                            <View style={styles.flipBtnWrapper}>
                                <Button
                                    style={styles.flipBtn}
                                    transparent
                                    onPress={() => this.onFlip()}>
                                    <Thumbnail square source={require('../../assets/flip.png')} style={styles.flipBtnContent} />
                                </Button>
                            </View>
                        </Col>
                        <Col style={styles.recBtnContainer}>
                            <View style={[styles.recBtnWrapper, this.state.recording && styles.recActiveBtnWrapper]}>
                                <Button
                                    style={[styles.recBtn, this.state.recording && styles.recActiveBtn]} 
                                    transparent 
                                    active={false}
                                    onPressIn={() => this.onPressIn()} 
                                    onPressOut={() => this.onPressOut()}
                                    >
                                    <View style={[styles.recBtnContent, this.state.recording && styles.recActiveBtnContent]} />
                                </Button>
                            </View>
                        </Col>
                        <Col style={styles.trashBtnContainer}>
                            <View style={styles.trashBtnWrapper}>
                                {this.enableTrash()?
                                <Button 
                                    style={styles.trashBtn}
                                    transparent
                                    onPress={() => this.onTrash()}>
                                    <Thumbnail square source={require('../../assets/trash.png')} style={styles.trashBtnContent}/>
                                </Button>: null}
                            </View>
                        </Col>
                    </Grid>
                </Footer>
                {this.state.processing?
                <View style={styles.backdrop}>
                    <Text style={styles.progressText}>Processing</Text>
                </View>: null}
            </Container>
        );
    }
}

export default connect()(RecordScreen);