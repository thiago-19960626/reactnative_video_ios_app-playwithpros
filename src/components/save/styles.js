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
        position: 'relative'
    },

    footer: {
        height: 45
    },

    saveBtn: {
        borderRadius: 0,
        width: width,
        backgroundColor: Colors.main
    },

    saveBtnText: {
        color: '#fff',
        fontSize: 16
    }
}