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

    videoContainer: {
        width: width,
        height: (height - 65 - (width - 4.5) / 3 * 2),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent:'center',
        position: 'relative'
    },

    wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderTopWidth: 1.5,
        borderTopColor: '#000'
    },

    gridItemContainer: {
        borderBottomWidth: 1.5,
        borderBottomColor: '#000',
        borderRightWidth: 1.5,
        borderRightColor: '#000',
        position: 'relative'
    },
    
    gridItemSelectedContainer: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        opacity: 0.65,
        width: (width - 4.5) / 3,
        height: (width -  4.5) / 3,
        position: 'absolute',
        left: 0,
        top: 0
    },

    gridItemImage: {
        width: (width - 4.5) / 3,
        height: (width -  4.5) / 3,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
    },

    gridItemTimeText: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 2,
        paddingRight: 2,
        backgroundColor: 'rgba(0,0,0,0.4)',
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
    },

    playBtn: {
        position: 'absolute',
        left: width / 2 - 55
    },

    playIcon: {
        width: 80,
        height: 80
    }
}