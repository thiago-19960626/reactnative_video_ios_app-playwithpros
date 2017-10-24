import { Colors } from '../../constants/';
import {
    Dimensions
} from 'react-native';
const  { width , height} = Dimensions.get('window');

export default  styles = {
    container: {
        backgroundColor: '#000',
        position: 'relative'
    },
    header: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0
    },

    headerBody: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        color: '#fff',
        textAlign: 'center'
    },

    headerIcon: {
        color: '#fff',
        fontSize: 30
    },

    content: {
        backgroundColor: 'transparent',
        position: 'relative',
    },

    footer: {
        height: 160,
        backgroundColor: 'transparent',
        borderTopWidth: 0
    },

    recBtnContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    recBtnWrapper: {
        width: 74,
        height: 74
    },

    recActiveBtnWrapper: {
        width: 102,
        height: 102
    },

    recBtn: {
        width: 74,
        height: 74,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0
    },

    recActiveBtn: {
        width: 102,
        height: 102,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0
    },

    recBtnContent: {
        width: 74,
        height: 74,
        borderRadius: 37,
        backgroundColor: 'white',
        borderWidth: 9.5,
        borderColor: '#e0e0e0'
    },

    recActiveBtnContent: {
        width: 102,
        height: 102,
        borderRadius: 51,
        backgroundColor: 'white',
        borderWidth: 23.5,
        borderColor: '#e0e0e0'
    },

    flipBtnContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center'
    },

    flipBtnWrapper: {
        width: 45,
        height: 45
    },
    
    flipBtn: {
        width: 45,
        height: 45,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0
    },

    flipBtnContent: {
        width: 45,
        height: 45
    },

    trashBtnContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    trashBtnWrapper: {
        width: 45,
        height: 45
    },

    trashBtn: {
        width: 45,
        height: 45,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0
    },

    trashBtnContent: {
        width: 45,
        height: 45
    },

    cameraview: {
        width: width / 2,
        height: height / 2
    },
    videoBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },

    backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center'
    },

    progressText: {
        color: Colors.main
    }
};