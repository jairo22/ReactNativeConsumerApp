"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactNative = require("react-native");
var _reactNativeMeasureme = _interopRequireDefault(require("react-native-measureme"));
var _util = require("../util");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/*
* Draws fully customizable dashed lines vertically or horizontally
*
* @providesModule Dash
*/

var Dash = function Dash(props) {
  var isRow = (0, _util.isStyleRow)(props.style);
  var length = isRow ? props.width : props.height;
  var n = Math.ceil(length / (props.dashGap + props.dashLength));
  var calculatedDashStyles = (0, _util.getDashStyle)(props);
  var dash = [];
  for (var i = 0; i < n; i++) {
    dash.push(/*#__PURE__*/_react["default"].createElement(_reactNative.View, {
      key: i,
      style: [calculatedDashStyles, props.dashStyle]
    }));
  }
  return /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
    onLayout: props.onLayout,
    style: [props.style, isRow ? styles.row : styles.column]
  }, dash);
};
var styles = _reactNative.StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  }
});
Dash.propTypes = {
  style: _reactNative.ViewPropTypes.style,
  dashGap: _propTypes["default"].number.isRequired,
  dashLength: _propTypes["default"].number.isRequired,
  dashThickness: _propTypes["default"].number.isRequired,
  dashColor: _propTypes["default"].string,
  dashStyle: _reactNative.ViewPropTypes.style
};
Dash.defaultProps = {
  dashGap: 2,
  dashLength: 4,
  dashThickness: 2,
  dashColor: 'black'
};
var _default = exports["default"] = (0, _reactNativeMeasureme["default"])(Dash);
