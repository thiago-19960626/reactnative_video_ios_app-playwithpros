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
    Spinner
} from 'native-base';
import {
    Dimensions
} from 'react-native';
import { Video } from 'react-native-media-kit';
import { Colors, SERVER_URL } from '../../constants/';
import styles from './styles';
import RNFS from 'react-native-fs';

const { width, height } = Dimensions.get('window');

class SelectScreen extends Component{
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            progress: 0,
            playing: true,
            percent: 0,
            localPath: RNFS.DocumentDirectoryPath + "/" + this.props.navigation.state.params.id + ".mov",
            downloading: true
        }
    }

    componentWillMount(){
        const progress = data => {
            this.setState({
                percent: (((100 * data.bytesWritten) / data.contentLength) | 0 )
            });
            console.log("File Downloading", (((100 * data.bytesWritten) / data.contentLength) | 0 ) + "%");
        };

        const begin = res => {
            console.log("File Downloading", "Start");
            this.setState({
                percent: 0
            });
        };
        
        const ret = RNFS.downloadFile({ fromUrl: SERVER_URL + "/videos/" + this.props.navigation.state.params.video_link, toFile: this.state.localPath, begin: begin, progress: progress, background: false, progressDivider: 1 });
        ret.promise.then(() => {
            console.log("File Downloading", "Finished");            
            this.setState({
                playing: false,
                downloading: false
            });
        })
        .catch(err => {
            console.log("File Downloading", err); 
            alert("Please check your  wifi or network.");
            dispatch(NavigationActions.back());         
        });
    }

    onPlay(){
        if(this.videoobj){
            this.videoobj.play();
            this.setState({
                playing: true
            });
        }
    }

    onProgress(cur, total){
        this.setState({
            progress: (cur/ total)
        });
    }

    onEnd(){
        this.setState({
            playing: false
        });
    }

    goBack(){
        var { dispatch } = this.props;
        RNFS.unlink(this.state.localPath)
        .then(() => {
            console.log("deleting temp video file success", this.state.localPath);
        })
        .catch(err => {
            console.log("deleting temp video file error", err);
        });
        dispatch(NavigationActions.back());
    }

    goToRecord(title){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'Record', params: { title: title, video_link: this.state.localPath, image_link: this.props.navigation.state.params.image_link}}))
    }

    render(){
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent icon onPress={()=> this.goBack()}>
                            <Thumbnail square source={require('../../assets/close.png')} style={{width: 15, height: 15}}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.title}>Select Video</Title>
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
                    {this.state.downloading==false?
                    <Video
                        ref={(video) => {
                            this.videoobj = video
                        }}
                        src={"file://" + this.state.localPath}
                        autoplay={false}
                        preload={'auto'}
                        loop={false}
                        controls={false}
                        muted={true}
                        style={{
                            width: width,
                            height: width,
                            zIndex: 5
                        }}
                        onPlayerProgress={(cur, total) => this.onProgress(cur, total)}
                        onPlayerFinished={() => this.onEnd()}
                        />:null
                    }
                    {this.state.playing==false?
                    <Button transparent style={styles.playBtn} onPress={() => this.onPlay()}>
                        <Thumbnail square source={require('../../assets/playBtn.png')} style={styles.playBtnIcon}/>
                    </Button>: null}                                       
                </Content>
                <Footer style={styles.footer}>
                    <View style={styles.btnContainer}>
                        <Button block style={styles.btn} onPress={() => this.goToRecord('Play like')}>
                            <Text style={styles.btnText}>Play like pros</Text>
                        </Button>
                        <View style={styles.divider}/>
                        <Button block style={styles.btn} onPress={() => this.goToRecord('Play with')}>
                            <Text style={styles.btnText}>Play with pros</Text>
                        </Button>
                    </View>
                </Footer>
                {this.state.downloading?
                <View style={styles.backdrop}>
                    <Text style={styles.percentText}>{this.state.percent}%</Text>
                </View>: null
                }
            </Container>
        );
    }
}

export default connect()(SelectScreen);