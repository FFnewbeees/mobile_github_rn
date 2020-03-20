import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  Animated,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
  View
} from "react-native";

const DEFAULT_PREVIEW_OPEN_DELAY = 700;
const PREVIEW_CLOSE_DELAY = 300;
const MAX_VELOCITY_CONTRIBUTION = 5;
const SCROLL_LOCK_MILLISECONDS = 300;

class SwipeRow extends Component {
  constructor(props) {
    super(props);
    this.isOpen = false;
    this.previousTrackedTranslateX = 0;
    this.currentTranslateX = 0;
    this.previousTrackedDirection = null;
    this.horizontalSwipeGestureBegan = false;
    this.swipeInitialX = null;
    this.parentScrollEnabled = true;
    this.ranPreview = false;
    this._ensureScrollEnabledTimer = null;
    this.isForceClosing = false;
    this.state = {
      previewRepeatInterval: null,
      timeBetweenPreviewRepeats: null,
      dimensionSet: false,
      hiddenHeight: this.props.disableHiddenLayoutCalculation ? "100%" : 0,
      hiddenWidth: this.props.disableHiddenLayoutCalculation
    };
  }
}
