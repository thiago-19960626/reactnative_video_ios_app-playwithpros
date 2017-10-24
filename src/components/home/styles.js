import { Colors } from '../../constants/';
import {
    Dimensions
} from 'react-native';
const  { width } = Dimensions.get('window');

export default  styles = {
    header: {
        backgroundColor: Colors.main,
        paddingTop: 20,
        height: 119,
        borderBottomWidth: 0,
        borderTopWidth: 0
    },

    searchContainer: {
        height: 53,
        width: width,
        alignItems: 'center',
        justifyContent: 'center'
    },

    searchInput: {
        height: 34,
        width:  (width - 24),
        textAlign: 'center',
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },

    searchInputPlaceholderContainer: {
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: (width -  24),
        flexDirection: 'row'
    },

    searchInputPlaceholderIcon: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 18,
        marginRight: 5
    },

    searchInputPlaceholderText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)'
    },

    content: {
        backgroundColor: '#fff'
    },

    tabContainer: {
        backgroundColor: '#fff',
        height: 46,
        flex: 1,
        paddingTop: 7,
        paddingBottom: 7
    },

    tabItemButton: {
        height: 31,
        borderRadius: 0,
        backgroundColor: '#fff'
    },

    tabItemActiveButton: {
        backgroundColor: Colors.main
    },

    tabItemText: {
        color: '#000',
        fontSize: 13
    },

    tabItemActiveText: {
        color: '#fff',
        fontSize: 13
    },

    wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },

    gridItemContainer: {
        borderTopWidth:0.5,
        borderTopColor: '#000',
        borderBottomWidth: 1.5,
        borderBottomColor: '#000',
        borderRightWidth: 1.5,
        borderRightColor: '#000'
    },

    gridItemImage: {
        width: (width - 4.5) / 3,
        height: (width -  4.5) / 3
    },

    bottomContainer: {
        position: 'absolute',
        left: 0,
        width: width,
        bottom: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },

    bottomBtnWrapper: {
        width: 86,
        height: 86
    },

    bottomCircleBtn: {
        width: 86,
        height: 86,
        borderWidth: 6,
        borderColor: Colors.main,
        backgroundColor: '#fff',
        borderRadius: 43,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0
    },

    bottomCircleBtnWrapper: {
        width: 74,
        height: 74,
        borderRadius: 37,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    },

    bottomPlusIcon: {
        width: 32,
        height: 32
    }
}