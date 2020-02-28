import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class ReadMore extends Component {
  state = {
    measured: false,
    shouldShowReadMore: false,
    showAllText: false
  };

  async componentDidMount() {
    this._isMounted = true;
    await nextFrameAsync();

    if (!this._isMounted) {
      return;
    }

    const fullHeight = await measureHeightAysnc(this._text);
    this.setState({ measured: true });
    await nextFrameAsync();

    if (!this._isMounted) {
      return;
    }

    const limitedHeight = await measureHeightAysnc(this._text);

    if (fullHeight > limitedHeight) {
      this.setState({ shouldShowReadMore: true }, () => {
        this.props.onReady && this.props.onReady();
      });
    } else {
      this.props.onReady && this.props.onReady();
    }
  }

  componentWillMount() {
    this._isMounted = false;
  }

  render() {
    let { measured, showAllText } = this.state;

    let { numberOfLines } = this.props;

    return (
      <View>
        <Text
          numberOfLines={measured && !showAllText ? numberOfLines : 0}
          style={this.props.textStyle}
          ref={text => {
            this._text = text;
          }}
        >
          {this.props.children}
        </Text>

        {this._maybeRenderReadMore()}
      </View>
    );
  }

  _handlePressReadMore = () => {
    this.setState({ showAllText: true });
  };

  _handlePressReadLess = () => {
    this.setState({ showAllText: false });
  };

  _maybeRenderReadMore() {
    let { shouldShowReadMore, showAllText } = this.state;

    if (shouldShowReadMore && !showAllText) {
      if (this.props.renderTruncatedFooted) {
        return this.props.renderTruncatedFooted(this._handlePressReadMore);
      }

      return <View style={styles.button}><Button title="Read More" color="white" onPress={this._handlePressReadMore}/></View>;
    } else if (shouldShowReadMore && showAllText) {
      if (this.props.renderRevealedFooter) {
        return this.props.renderRevealedFooter(this._handlePressReadLess);
      }

      return <View style={styles.button}><Button title="Hide" color="white" onPress={this._handlePressReadLess}/></View>;
    }
  }
}

function measureHeightAysnc(component) {
  return new Promise(resolve => {
    component.measure((x, y, w, h) => {
      resolve(h);
    });
  });
}

function nextFrameAsync() {
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

const styles = StyleSheet.create({
    button:{
    
        backgroundColor:'#4DDBC8',
        padding:5,
        alignSelf:'center',
        margin:10,
        borderRadius:10,
        width:350

    }
})
