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
    Title,
    Content,
    View,
    Thumbnail
} from 'native-base';
import {
    CameraRoll,
    Dimensions,
    TouchableWithoutFeedback,
    Image,
    StatusBar
} from 'react-native';
import { Video } from 'react-native-media-kit';
import { Colors } from '../../constants/';
import RNAssetThumbnail from  'react-native-asset-thumbnail';
import RNVideoEditor from 'react-native-video-editor';
import {PullView} from 'react-native-pull';
import styles from './styles';

const { width, height } = Dimensions.get('window');

class ImportScreen extends Component{

    selectedVideoObj = null;

    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            videos: [],
            images: [],
            time: [],
            end_cursor: null,
            hasNext: false,
            selectedIndex: -1,
            progress: 0,
            playing: false,
            times: []
        }
    }

    componentWillMount(){
        this.loadVideos(null);
    }

    goBack(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.back());
    }

    goNext(){
        var { dispatch } = this.props;
        if(this.state.selectedIndex >= 0){            
            dispatch(NavigationActions.navigate({routeName: 'Choose', params: { video_link: this.state.videos[this.state.selectedIndex].node.image.uri }}));
        }        
    }

    showTimeFormat(time){
        return (time / 60).toFixed(0) + ":" + (time % 60);
    }

    loadVideos(next){
        if(next){
            CameraRoll.getPhotos({
                first: 6,
                assetType: 'Videos',
                after: next
            }).then(results => {
                console.log(results);
                let promiseArr = [];
                for(var i = 0; i < results.edges.length; i++){
                    this.state.videos.push(results.edges[i]);
                    promiseArr.push(RNAssetThumbnail.generateThumbnail(results.edges[i].node.image.uri, 70, 70));
                    RNVideoEditor.getTime(results.edges[i].node.image.uri, this.state.videos.length - 1, (index1, time) => {
                        console.log("video " + index1 + ": " + time);
                        this.state.time[index1] = time;
                        this.setState({
                            time: this.state.time
                        });
                    })
                }
                this.setState({
                    end_cursor: results.page_info.end_cursor,
                    hasNext: results.page_info.has_next_page
                })

                //create thumbnail
                Promise.all(promiseArr).then(images => { 
                    for(var i = 0; i < images.length; i++){
                        this.state.images.push(images[i]);
                    }
                    this.setState({
                        images: this.state.images
                    });
                });
                
            }).catch(err => {

            });
        }else{
            CameraRoll.getPhotos({
                first: 6,
                assetType: 'Videos',
            }).then(results => {
                console.log(results);
                this.setState({
                    videos: results.edges,
                    end_cursor: results.page_info.end_cursor,
                    hasNext: results.page_info.has_next_page,
                    selectedIndex: 0
                });

                let promiseArr = [];
                for(var i = 0; i < results.edges.length; i++){
                    promiseArr.push(RNAssetThumbnail.generateThumbnail(results.edges[i].node.image.uri, 70, 70));
                    RNVideoEditor.getTime(results.edges[i].node.image.uri, i, (index1, time) => {
                        console.log("video " + index1 + ": " + time);
                        this.state.time[index1] = time;
                        this.setState({
                            time: this.state.time
                        });
                    })
                }
                //create thumbnail
                Promise.all(promiseArr).then(images => { 
                    this.state.images = images;
                    console.log(images);
                    this.setState({
                        images: this.state.images
                    });
                });
            }).catch(err => {

            });
        }        
    }

    onPlay(){
        if(this.selectedVideoObj){
            this.selectedVideoObj.play();
            this.setState({
                playing: true
            });
        }
    }

    onPreview(index){
        if(this.selectedVideoObj){
            this.selectedVideoObj.stop();
        }
        this.setState({
            selectedIndex: index,
            playing: false
        });
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

    handleScroll(e){
        console.log("scroll y =" + e.nativeEvent.contentOffset.y);
        if(e.nativeEvent.contentOffset.y > 3.6 && this.state.hasNext){
            console.log("more work");
            this.loadVideos(this.state.end_cursor);
        }
    }

    render(){
        StatusBar.setHidden(true);
        return (
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent icon onPress={() => this.goBack()}>
                            <Thumbnail square source={require('../../assets/close.png')} style={{width: 15, height: 15}}/>
                        </Button>                        
                    </Left>
                    <Body style={styles.headerBody}>
                        <Title style={styles.title}>Import</Title>
                    </Body>
                    <Right>
                        <Button transparent icon onPress={() => this.goNext()}>
                            <Thumbnail square source={require('../../assets/next.png')} style={{width: 25, height: 15}}/>
                        </Button>
                    </Right>
                </Header>
                {this.state.selectedIndex != -1?
                    <View style={styles.videoContainer}>                    
                    <Video
                        ref={(video) => {
                            this.selectedVideoObj = video;
                        }}
                        src={this.state.videos[this.state.selectedIndex].node.image.uri}
                        autoplay={false}
                        preload={'auto'}
                        loop={false}
                        controls={false}
                        muted={true}
                        style={{
                            width: width,
                            height: (this.state.videos[this.state.selectedIndex].node.image.height / this.state.videos[this.state.selectedIndex].node.image.width) * width,
                            position: 'relative',
                            zIndex: 5
                        }}
                        onPlayerProgress={(cur, total) => this.onProgress(cur, total)}
                        onPlayerFinished={() => this.onEnd()}
                        >
                        {this.state.playing == false?
                            <Button 
                                onPress={() => this.onPlay()}
                                transparent 
                                style={[styles.playBtn, {top: ((this.state.videos[this.state.selectedIndex].node.image.height / this.state.videos[this.state.selectedIndex].node.image.width) * width / 2 - 40)}]}>
                                <Thumbnail square source={require('../../assets/playBtn.png')} style={styles.playIcon}/>
                            </Button>: null}
                        </Video>
                        <View style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: 5,
                            width: (width * this.state.progress),
                            zIndex: 10,
                            backgroundColor: 'white'
                        }}/>
                        </View>
                        : null
                }
                <Content onScroll={(e) => this.handleScroll(e)}>              
                    <View style={styles.wrapper}>
                        {
                            this.state.images.map((image, index) => {
                                return (
                                    <TouchableWithoutFeedback onPress={() => this.onPreview(index)}  key={index}>
                                        <View style={styles.gridItemContainer}>
                                            <View style={styles.gridItemImage}>
                                                    <Image source={{uri: image}} style={{width: (width - 4.5)/ 3, height: (width - 4.5) / 3}}/>
                                                    <Text style={styles.gridItemTimeText}>{this.showTimeFormat(this.state.time[index])}</Text>
                                            </View>
                                            {this.state.selectedIndex == index?
                                            <View style={styles.gridItemSelectedContainer}/>: null}
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                            })
                        }                        
                    </View>
                </Content>
            </Container>
        )
    }
}

export default connect()(ImportScreen);