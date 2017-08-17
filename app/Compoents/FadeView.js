
import React, { Component } from 'react';
import {
 
  Animated, Text, View 
} from 'react-native';

 class FadeInView extends Component {
    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
      }
    
    componentDidMount() {
        Animated.timing(                  // Animate over time
          this.state.fadeAnim,            // The animated value to drive
          {
            toValue: 100,                   // Animate to opacity: 1 (opaque)
            duration: 1000,              // Make it take a while
            useNativeDriver: true, // <-- 加上这一行
          }
        ).start();                        // Starts the animation
      }
      render() {
        let { fadeAnim } = this.state;
    
        return (
          <Animated.View                 // Special animatable View
            style={{
             
              opacity: fadeAnim,         // Bind opacity to animated value
             
              backgroundColor: '#fc4b4e'
            }}
          >
            {this.props.children}
          </Animated.View>
        );
      }
    }


export default FadeInView;