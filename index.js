import React, { Component } from 'react';
import { View, Text, Animated, Image, TouchableOpacity, StyleSheet, Platform, AppRegistry } from 'react-native';

import PropTypes from 'prop-types';

class SnackBar extends Component
{
   constructor()
   {
      super();

      this.animatedValue = new Animated.Value(60);

      this.snackBarShown = false;

      this.snackBarHidden = true;

      this.state = { message: '' };
   }

   componentWillUnmount()
   {
   		clearTimeout(this.timerID);
   }

  show(message="Default Message...", duration=3000)
  {
    if( this.snackBarShown === false )
    {
      this.setState({ message: message });

      this.snackBarShown = true;

      Animated.timing
      (
          this.animatedValue,
          { 
              toValue: 0,
              duration: 350
          }
      ).start(this.hide(duration));
    }     
  }

    hide = (duration) =>
    {
      this.timerID = setTimeout(() =>
      {
        if(this.snackBarHidden === true)
        {
            this.snackBarHidden = false;

            Animated.timing
            (
              this.animatedValue,
              { 
                toValue: 60,
                duration: 350
              }
            ).start(() =>
            {
              this.snackBarHidden = true;
              this.snackBarShown = false;

              clearTimeout(this.timerID);
            })
        }
      }, duration); 
    }

    closeSnackBar = () =>
    {
      if(this.snackBarHidden === true)
      {
          this.snackBarHidden = false;

          clearTimeout(this.timerID);

          Animated.timing
          (
              this.animatedValue,
              { 
                toValue: 60,
                duration: 350
              }
          ).start(() =>
          {
              this.snackBarShown = false;
              this.snackBarHidden = true;
          });
      }
    }

    render()
    {
      return(
         <Animated.View style = {[{ transform: [{ translateY: this.animatedValue }], backgroundColor: this.props.snackBarBackColor }, styles.animatedView ]}>
            <Text numberOfLines = { 2 } style = {[ styles.snackBarText, { color: this.props.snackBarTextColor } ]}>{ this.state.message }</Text>
            <TouchableOpacity onPress = { this.closeSnackBar } activeOpacity = { 1 } style = { styles.closeBtn }>
            {
            	(this.props.closeText === undefined || this.props.closeText === '')
            	?
            		( <Image source = { require('./assets/close.png') } style = {[ styles.closeBtnImage, { tintColor: this.props.imageColor }]} /> )
        		:
        			( <Text style = {{ color: this.props.closeTextColor, fontWeight: 'bold' }}>{ this.props.closeText.toUpperCase() }</Text> )
            }
            </TouchableOpacity>
         </Animated.View>
      );
    }
}

const styles = StyleSheet.create(
{
  animatedView:
  {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 60, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 75
  },

  snackBarText:
  {
    fontSize: 15
  },

  closeBtn:
  {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    padding: 5
  },

  closeBtnImage:
  {
    resizeMode: 'contain',
    width: 23,
    height: 23
  }
});

SnackBar.propTypes =
{
	snackBarBackColor: PropTypes.string,
	closeText: PropTypes.string,
	closeTextColor: PropTypes.string,
	snackBarTextColor: PropTypes.string,
	imageColor: PropTypes.string
}

SnackBar.defaultProps =
{
	snackBarBackColor: 'rgba(0,0,0,0.8)',
	closeTextColor: 'rgb(253,85,82)',
	snackBarTextColor: 'white',
	imageColor: 'rgb(253,85,82)'
};

module.exports = SnackBar;
