import React, { useState } from 'react';
import './DigitalTwin.css';

export default function DigitalTwin({ latest, online }) {
  const [isRotating, setIsRotating] = useState(true);
  const [angle, setAngle] = useState(0);

  const handleMouseMove = (e) => {
    if (!isRotating && e.buttons === 1) {
      setAngle((prev) => prev + e.movementX * 0.5);
    }
  };

  // Bind directly to real incoming telemetry from latest state
  const flow = latest?.flow_rate ?? '1.8';
  const temp = latest?.temperature ?? '37.2';
  const level = latest?.water_level ?? '65';
  const status = latest?.status || 'Normal';

  return (
    <div className="digital-twin-card">
      <div className="twin-header">
        <h3>DialySense AI - Hardware Prototype Digital Twin</h3>
        <div className="twin-controls">
          <button onClick={() => setIsRotating(!isRotating)}>
            {isRotating ? 'Pause Rotation' : 'Auto Rotate'}
          </button>
        </div>
      </div>

      <div className="twin-viewport" onMouseMove={handleMouseMove}>
        <div 
          className={`scene-container ${isRotating ? 'rotating' : ''}`}
          style={{ transform: `rotateY(${angle}deg)` }}
        >
          {/* Physical Cabinet Structure */}
          <div className="physical-cabinet">
            
            <div className="cabinet-header-banner">
              DIALYSENSE - AI
            </div>

            {/* UPPER SHELF */}
            <div className="cabinet-upper-shelf">
              <div className="hardware-container outlet-container">
                <div className="pink-lid"></div>
                <div className="container-body">
                  <div className="liquid-fill waste-fluid" style={{ height: `${Math.min(level * 3, 100)}%` }}></div>
                </div>
                <div className="box-name-tag">OUTLET</div>
              </div>

              <div className="arch-tube tube-left-arc"></div>

              <div className="hardware-filter-wrapper">
                <div className="hardware-filter">
                  <div className="filter-cap-top"></div>
                  <div className="filter-cylinder">
                    <div className="filter-core-fluid" style={{ height: `${Math.min(level * 3, 100)}%` }}></div>
                  </div>
                  <div className="filter-valve"></div>
                </div>
                <div className="box-name-tag filter-tag-fixed">FILTER</div>
              </div>

              <div className="arch-tube tube-right-arc"></div>

              <div className="hardware-container inlet-container">
                <div className="pink-lid"></div>
                <div className="container-body">
                  <div className="liquid-fill inlet-fluid"></div>
                </div>
                <div className="box-name-tag">INLET</div>
              </div>

              <div className="esp32-hardware-module">
                <span className="esp-chip-label">ESP32 + Sensors</span>
              </div>
            </div>

            {/* MIDDLE BAR: Live Dynamic LCD Display */}
            <div className="cabinet-middle-bar">
              <div className="hardware-lcd active-lcd">
                <span className="lcd-text">FLOW: {flow} mL/m</span>
                <span className="lcd-text">TEMP: {temp}°C</span>
                <span className="lcd-text">LVL: {level} cm</span>
              </div>
            </div>

            {/* LOWER SHELF */}
            <div className="cabinet-lower-shelf">
              <div className="hardware-phone-mockup">
                <div className="phone-screen-mini">
                  <div className="mini-app-header">App UI</div>
                  <div className="mini-metric">Flow: {flow}</div>
                </div>
              </div>

              <div className="hardware-gauges-panel">
                <div className="gauge-dial">
                  <div className="gauge-needle" style={{ transform: `rotate(${Number(flow || 0) * 0.25}deg)` }}></div>
                </div>
                <div className="gauge-dial">
                  <div className="gauge-needle" style={{ transform: `rotate(${Number(temp || 0) * 4}deg)` }}></div>
                </div>
                <span className="gauges-label-text">PRESSURE GAUGES</span>
              </div>

              <div className="hardware-info-card">
                <div className="info-title">FEATURES:</div>
                <ul>
                  <li>Real Time Monitoring</li>
                  <li>Predictive Maintenance</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="twin-footer-status">
        <span>Hardware Link: <strong className={online ? 'connected' : 'disconnected'}>{online ? 'Live ESP32 Synced' : 'Standby Mode'}</strong></span>
        <span>Model Status: <strong className="status-normal">{status}</strong></span>
      </div>
    </div>
  );
}