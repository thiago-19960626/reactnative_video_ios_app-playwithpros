import { Colors } from '../../constants/';
import {
    Dimensions
} from 'react-native';
const  { width , height} = Dimensions.get('window');

export default  styles = {
    header: {
        backgroundColor: '#000',
        paddingTop: 0
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

    footer: {
        height: 45
    },

    submitBtn: {
        width: width,
        backgroundColor: Colors.main,
        borderRadius: 0,
    },

    submitBtnText: {
        color: '#fff',
        fontSize: 16
    },

    textarea: {
        backgroundColor: '#fff',
        height: (width/ 3), 
        fontSize: 15, 
        paddingLeft: 13, 
        paddingRight: 13
    },

    videoWrapper: {
        width: width/ 3, 
        height: width/ 3, 
        overflow: 'hidden', 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    videoContainer: {
        width: width / 3
    },

    listContainer: {
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
        borderTopColor: '#c9c9c9'
    },

    listItem: {
        marginLeft: 0,
        paddingLeft: 13,
        paddingRight: 13
    },

    backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },

    progressText: {
        color: Colors.main
    }
};