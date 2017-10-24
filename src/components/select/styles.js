import { Colors } from '../../constants/';
import {
    Dimensions
} from 'react-native';
const  { width , height} = Dimensions.get('window');

export default  styles = {
    container: {
        backgroundColor: '#000'
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

    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 35,
        paddingBottom: 35
    },

    divider: {
        height: 12
    },

    btn: {
        borderRadius: 0,
        backgroundColor: '#fff',
        width: (width - 24)
    },

    btnText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500'
    },

    footer: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        height: 170
    },

    playBtn: {
        position: 'absolute',
        left: (width - 90)/ 2,
        top: (width - 80)/ 2,
        width: 80,
        height: 80,
        zIndex: 10
    },

    playBtnIcon: {
        width: 80,
        height: 80
    },

    backdrop: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center'
    },

    percentText: {
        color: 'white'
    }
}