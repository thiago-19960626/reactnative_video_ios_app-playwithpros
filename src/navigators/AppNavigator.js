import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    addNavigationHelpers,
    StackNavigator
} from 'react-navigation';

import HomeScreen from '../components/home/';
import ImportScreen from '../components/import/';
import ChooseScreen from '../components/choose/';
import SubmitScreen from '../components/submit/';
import SelectScreen from '../components/select/';
import RecordScreen from '../components/record/';
import SaveScreen from '../components/save/';

export const AppNavigator = StackNavigator({
    Home: { screen: HomeScreen },
    Import: { screen: ImportScreen },
    Choose: { screen: ChooseScreen },
    Submit: { screen: SubmitScreen },
    Select: { screen: SelectScreen },
    Record: { screen: RecordScreen },
    Save: { screen: SaveScreen }
})

const AppWithNavigationState = ({dispatch, nav}) => (
    <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav})}/>
)

AppWithNavigationState.PropTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);