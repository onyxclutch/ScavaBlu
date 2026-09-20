import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import AIAssistant from "./AIAssistant";

function OceanMap() {
  const chennai = [13.0827, 80.2707];

  return (
    <div className="real-map">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={chennai}>
          <Popup>
            <strong>SCAVABLU-01</strong>
            <br />
            Chennai Monitoring Unit
            <br />
            Pollution Score: 27/100
          </Popup>
        </Marker>

        <Circle
          center={[12.8, 80.4]}
          radius={35000}
          pathOptions={{
            color: "#ff5252",
            fillColor: "#ff5252",
            fillOpacity: 0.18,
          }}
        />

        <Circle
          center={[13.5, 79.8]}
          radius={25000}
          pathOptions={{
            color: "#00e5ff",
            fillColor: "#00e5ff",
            fillOpacity: 0.12,
          }}
        />
      </MapContainer>
    </div>
  );
}

/* =========================
   FAKE DASHBOARD MAP
========================= */

function FakeDashboardMap() {
  return (
    <div className="fake-map">

      <div className="fake-map-grid"></div>

      <div className="ocean-glow"></div>

      <div className="fake-india">
        <div className="india-inner"></div>
      </div>

      <div className="fake-label india-text">
        INDIA
      </div>

      <div className="fake-label ocean-text">
        BAY OF BENGAL
      </div>

      <div className="fake-label chennai-text">
        CHENNAI
      </div>

      <div className="monitoring-zone">
        <div className="zone-ring ring-one"></div>
        <div className="zone-ring ring-two"></div>
      </div>

      <div className="dashboard-marker">

        <div className="marker-radar"></div>

        <div className="marker-core"></div>

        <div className="marker-card">
          <strong>SCAVABLU-01</strong>
          <span>CHENNAI MONITORING UNIT</span>
        </div>

      </div>

      <div className="pollution-hotspot">
        <div></div>
        <span>POLLUTION HOTSPOT</span>
      </div>

      <div className="fake-map-status">
        <span></span>
        LIVE MONITORING
      </div>

      <div className="fake-coordinates">
        13.0827° N
        <br />
        80.2707° E
      </div>

      <div className="fake-legend">

        <div>
          <span className="legend-cyan"></span>
          MONITORING ZONE
        </div>

        <div>
          <span className="legend-red"></span>
          POLLUTION
        </div>

      </div>

      <div className="map-scan-line"></div>

    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  // =========================
  // ESP32 CONNECTION
  // =========================

  const [esp32Status, setEsp32Status] = useState("checking");

  useEffect(() => {
    let isMounted = true;
    let nextCheck;
    let activeRequest;

    const checkESP32 = async () => {
      const controller = new AbortController();
      activeRequest = controller;
      const timeout = setTimeout(() => controller.abort(), 3500);

      try {
        const response = await fetch("/esp32/", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (isMounted) {
          setEsp32Status(response.ok ? "online" : "offline");
        }
      } catch {
        if (isMounted) {
          setEsp32Status("offline");
        }
      } finally {
        clearTimeout(timeout);

        // Schedule only after the current attempt finishes so a slow device
        // cannot leave several overlapping requests in flight.
        if (isMounted) {
          nextCheck = setTimeout(checkESP32, 5000);
        }
      }
    };

    checkESP32();

    return () => {
      isMounted = false;
      clearTimeout(nextCheck);
      activeRequest?.abort();
    };
  }, []);

  const navItems = [
    "Dashboard",
    "Live Map",
    "Analytics",
    "AI Assistant",
  ];

  const renderPage = () => {

    /* =========================
       DASHBOARD
    ========================= */

    if (activePage === "Dashboard") {
      return (
        <main className="dashboard">

          <section className="hero">

            <div>

              <p className="eyebrow">
                OCEAN INTELLIGENCE SYSTEM
              </p>

              <h1>
                SCAVA<span>BLU</span>
              </h1>

              <p className="hero-text">
                Smart environmental monitoring for cleaner and safer oceans.
              </p>

            </div>

            <div className="status-card">
              <span className="status-dot"></span>
              SYSTEM ONLINE
            </div>

          </section>

          <section className="score-section">

            <div className="score-card">

              <div>

                <p className="card-label">
                  CURRENT POLLUTION SCORE
                </p>

                <div className="score-number">
                  27<span>/100</span>
                </div>

                <p className="score-status">
                  LOW POLLUTION LEVEL
                </p>

              </div>

              <div className="score-ring">

                <div className="score-ring-inner">
                  27
                </div>

              </div>

            </div>

          </section>

          <section className="sensor-grid">

            <div className="sensor-card">

              <p className="card-label">
                WATER QUALITY
              </p>

              <h3>
                GOOD
              </h3>

              <span>
                pH 7.4
              </span>

            </div>

            <div className="sensor-card">

              <p className="card-label">
                TURBIDITY
              </p>

              <h3>
                18 NTU
              </h3>

              <span>
                NORMAL
              </span>

            </div>

            <div className="sensor-card">

              <p className="card-label">
                TEMPERATURE
              </p>

              <h3>
                28.6°C
              </h3>

              <span>
                STABLE
              </span>

            </div>

            <div className="sensor-card">

              <p className="card-label">
                GPS STATUS
              </p>

              <h3>
                ACTIVE
              </h3>

              <span>
                13.0827° N
              </span>

            </div>

          </section>

          <section className="activity-card">

            <div className="section-heading">

              <div>

                <p className="eyebrow">
                  REAL-TIME DATA
                </p>

                <h2>
                  Live Activity
                </h2>

              </div>

              <span className="live-badge">
                <span></span>
                LIVE
              </span>

            </div>

            <div className="graph">

              <div className="graph-line">

                <span style={{ height: "35%" }}></span>
                <span style={{ height: "48%" }}></span>
                <span style={{ height: "42%" }}></span>
                <span style={{ height: "61%" }}></span>
                <span style={{ height: "52%" }}></span>
                <span style={{ height: "72%" }}></span>
                <span style={{ height: "63%" }}></span>
                <span style={{ height: "78%" }}></span>
                <span style={{ height: "68%" }}></span>
                <span style={{ height: "82%" }}></span>

              </div>

            </div>

          </section>

          <section className="map-card">

            <div className="map-header">

              <div>

                <p className="eyebrow">
                  MONITORING REGION
                </p>

                <h2>
                  Chennai Ocean Zone
                </h2>

              </div>

              <div className="map-status">
                <span></span>
                MONITORING
              </div>

            </div>

            <div className="fake-map-wrapper">
              <FakeDashboardMap />
            </div>

            <button
              className="map-button"
              onClick={() => setActivePage("Live Map")}
            >
              VIEW FULL MAP →
            </button>

          </section>

        </main>
      );
    }

    /* =========================
       LIVE MAP
    ========================= */

    if (activePage === "Live Map") {
      return (
        <main className="dashboard">

          <section className="page-title">

            <p className="eyebrow">
              SCAVABLU MONITORING NETWORK
            </p>

            <h1>
              Live Map
            </h1>

            <p>
              Explore active monitoring locations and detected pollution
              zones around the world.
            </p>

          </section>

          <section className="map-card">

            <div className="map-header">

              <div>

                <p className="eyebrow">
                  GLOBAL OCEAN MONITORING
                </p>

                <h2>
                  SCAVABLU Live Network
                </h2>

              </div>

              <div className="map-status">
                <span></span>
                LIVE DATA
              </div>

            </div>

            <div className="real-map-wrapper full-map">
              <OceanMap />
            </div>

          </section>

        </main>
      );
    }

    /* =========================
       ANALYTICS
    ========================= */

    if (activePage === "Analytics") {
      return (
        <main className="dashboard">

          <section className="page-title">

            <p className="eyebrow">
              DATA INTELLIGENCE
            </p>

            <h1>
              Analytics
            </h1>

            <p>
              Track environmental conditions and pollution trends over time.
            </p>

          </section>

          <section className="sensor-grid">

            <div className="sensor-card">

              <p className="card-label">
                AVERAGE POLLUTION
              </p>

              <h3>
                31/100
              </h3>

              <span>
                ↓ 8% THIS WEEK
              </span>

            </div>

            <div className="sensor-card">

              <p className="card-label">
                WATER QUALITY
              </p>

              <h3>
                94%
              </h3>

              <span>
                GOOD
              </span>

            </div>

            <div className="sensor-card">

              <p className="card-label">
                MONITORING TIME
              </p>

              <h3>
                142 HRS
              </h3>

              <span>
                THIS MONTH
              </span>

            </div>

            <div className="sensor-card">

              <p className="card-label">
                ALERTS
              </p>

              <h3>
                06
              </h3>

              <span>
                RESOLVED
              </span>

            </div>

          </section>

          <section className="activity-card">

            <div className="section-heading">

              <div>

                <p className="eyebrow">
                  HISTORICAL DATA
                </p>

                <h2>
                  Pollution Trend
                </h2>

              </div>

            </div>

            <div className="graph analytics-graph">

              <div className="graph-line">

                <span style={{ height: "72%" }}></span>
                <span style={{ height: "65%" }}></span>
                <span style={{ height: "70%" }}></span>
                <span style={{ height: "55%" }}></span>
                <span style={{ height: "48%" }}></span>
                <span style={{ height: "42%" }}></span>
                <span style={{ height: "35%" }}></span>
                <span style={{ height: "40%" }}></span>
                <span style={{ height: "31%" }}></span>
                <span style={{ height: "27%" }}></span>

              </div>

            </div>

          </section>

        </main>
      );
    }

    /* =========================
       AI ASSISTANT
    ========================= */

    if (activePage === "AI Assistant") {
      return <AIAssistant />;
    }

    return null;
  };

  return (
    <div className="app">

      <div className="background-glow"></div>

      <div className="waves"></div>

      <header className="navbar">

        <div
          className="logo"
          onClick={() => setActivePage("Dashboard")}
        >
          SCAVA<span>BLU</span>
        </div>

        <nav>

          {navItems.map((item) => (
            <button
              key={item}
              className={activePage === item ? "active" : ""}
              onClick={() => setActivePage(item)}
            >
              {item}
            </button>
          ))}

        </nav>

        <div
          className={`nav-status ${esp32Status}`}
          aria-live="polite"
          title={
            esp32Status === "online"
              ? "ESP32 is responding through the local development connection."
              : esp32Status === "checking"
                ? "Checking the local ESP32 connection."
                : "ESP32 did not respond to the latest local connection check."
          }
        >

          <span></span>

          {esp32Status === "online"
            ? "ESP32 ONLINE"
            : esp32Status === "checking"
              ? "ESP32 CHECKING"
              : "ESP32 OFFLINE"}

        </div>

      </header>

      {renderPage()}

    </div>
  );
}

export default App;
