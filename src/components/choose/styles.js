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

    content: {
        backgroundColor: '#fff'
    },

    listItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 0
    },

    listItemActive: {
        backgroundColor: Colors.main
    },

    listItemText: {
        fontSize: 15,
        color: '#000'
    },

    listItemActiveText: {
        fontSize: 15,
        color: '#fff'
    }
}