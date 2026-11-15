import { Component } from 'react';

// Keep the arithmetic HUD alive if the shared WebGL scene cannot initialise.
export default class SolarSceneBoundary extends Component {
  state = { unavailable: false };
  static getDerivedStateFromError() { return { unavailable: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.unavailable ? null : this.props.children; }
}
