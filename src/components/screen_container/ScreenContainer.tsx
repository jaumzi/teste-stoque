import React from 'react';
import {
  StyleSheet,
  StatusBar
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
// import { ScrollView } from 'react-native-gesture-handler';

// class ScreenContainer extends React.PureComponent {
//   constructor (props) {
//     super(props)
//     this.state = {
//       keyboardVerticalOffset: 0,
//     }
//   }

//   _view = null

//   _onLayout = (event) => {
//     if (this._view) {
//       this._view.measure((x, y, width, height, pageX, pageY) => {

//         if (this.state.keyboardVerticalOffset !== pageY) {
//           this.setState({ keyboardVerticalOffset: pageY })
//         }
//       })
//     }

//     this.props.onLayout && this.props.onLayout(event)
//   }

//   render () {
//     const {
//       children,
//       keyboardAvoidingViewProps,
//       props,
//       scrollViewProps,
//     } = this.props

//     const { keyboardVerticalOffset } = this.state

//     return <View
//     {...props}
//       flex={1}
//       ref={(component) => { this._view = component }}
//       onLayout={this._onLayout}
//     >
//       <SafeAreaView />

//       <KeyboardAvoidingView
//         {...keyboardAvoidingViewProps}
//         behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
//         style={styles.keyboardAvoidingView}
//         keyboardVerticalOffset={keyboardVerticalOffset}
//       >
//         <ScrollView
//           {...scrollViewProps}
//           style={styles.scrollView}
//         >
//           <SafeAreaView>
//             {children}
//           </SafeAreaView>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </View>
//   }
// }

// const styles = StyleSheet.create({
//   keyboardAvoidingView: { flexGrow: 1, flexShrink: 1 },
//   scrollView: { flexGrow: 1, flexShrink: 1 },
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
  },
});

interface Props {
  dark?: Boolean
}

const ScreenContainer: React.FC<Props> = (props) => {
  const { children, dark } = props;

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={[{ flexGrow: 1, flexShrink: 1 }, styles.main_container, style]}
        > */}
        <StatusBar
          barStyle={dark ? 'dark-content' : 'light-content'}
          // backgroundColor="transparent"
          // translucent
        />

        {children}
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>
    </>
  );
};

export { ScreenContainer };
