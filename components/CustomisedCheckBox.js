import React, { Component } from "react";
import {
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons";
import styles, { iconContainer, textStyle } from "./css/CheckBox.style";
import PropTypes from "prop-types";

class CustomisedCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      springValue: new Animated.Value(1)
    };
  }

  componentDidMount() {
    this.setState({ checked: this.props.isChecked });
  }

  spring = () => {
    const { checked, springValue } = this.state;
    this.setState({ checked: !checked }, () => {
      springValue.setValue(0.7);
      Animated.spring(springValue, {
        toValue: 1,
        friction: 3
      }).start();
      const { onPress } = this.props;
      if (onPress) onPress(this.state.checked);
    });
  };

  renderCheckIcon = () => {
    const { checked, springValue } = this.state;
    const {
      checkboxSize,
      borderColor,
      fillColor,
      borderRadius,
      unfillColor,
      iconComponent
    } = this.props;

    return (
      <Animated.View
        style={[
          iconContainer(
            checkboxSize,
            checked,
            borderRadius,
            borderColor,
            fillColor,
            unfillColor
          ),
          { transform: [{ scale : springValue }]}
        ]}
      >
        {iconComponent || (
          <Icon
            {...this.props}
            name="check"
            type="Entypo"
            size={15}
            color="white"
          />
        )}
      </Animated.View>
    );
  };

  render() {
    const { text, textColor, fontFamily, fontSize } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.spring.bind(this, Easing.bounce)}
      >
        {this.renderCheckIcon()}
        <View style={styles.textContainer}>
          <Text
            style={textStyle(
              this.state.checked,
              textColor,
              fontFamily,
              fontSize
            )}
          >
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

CustomisedCheckBox.propTypes = {
  text: PropTypes.string,
  textColor: PropTypes.string,
  fontFamily: PropTypes.string,
  borderColor: PropTypes.string,
  borderRadius: PropTypes.number,
  fontSize: PropTypes.number,
  isChecked: PropTypes.bool,
  checkboxSize: PropTypes.number,
  fillColor: PropTypes.string,
  unfillColor: PropTypes.string
};

CustomisedCheckBox.defaultProps = {
  fontSize: 16,
  checkboxSize: 25,
  borderRadius: 25 / 2,
  isChecked: false,
  text: "finish building component?",
  textColor: "#757575",
  fillColor: "#ffc484",
  borderColor: "#ffc484",
  unfillColor: "transparent"
};

export default CustomisedCheckBox;