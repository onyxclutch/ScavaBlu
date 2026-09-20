# SCAVABLU

Local development dashboard for the SCAVABLU ocean and environmental monitoring system.

## Run locally

```bash
npm install
npm run dev
```

The ESP32 status indicator calls `/esp32/` on the Vite development server. Vite
forwards that request to the device, so the browser does not need CORS access to
the ESP32's small HTTP server.

By default the local development target is `http://192.168.1.17`. If DHCP gives
the ESP32 a different address, copy `.env.example` to `.env.local`, update
`VITE_ESP32_URL`, and restart `npm run dev`.

The dashboard's environmental readings are currently example data. The ESP32
connection check only reports whether its HTTP endpoint is reachable.
