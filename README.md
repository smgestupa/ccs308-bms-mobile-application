# CCS309 Book Management System

This is an updated version of our [previous mobile application project](https://github.com/smgestupa/bms-mobile). This application was built using SvelteKit and Capacitor, and DaisyUI as this application's UI library.

## Cloning the Repository
1. Choose a preferred directory
2. Open a terminal and clone the repository: `git clone git@github.com:laazyCmd/ccs308-bms-mobile-application.git`
3. Import the directory with your preferred IDE
4. Open a terminal inside the root project directory and execute: `npm install`
5. Append this inside `capacitor.config.json`:
    ```
    ...,
    "server": {
        "hostname": "http://10.0.2.2:5173",
        "cleartext": true
    }
    ```
6. Run `npm run dev -- --host`
7. Do `npm run android:build` then `npm run android:dev`
> You must have an Android Emulator installed beforehand

## Devices(s) Used
- `Pixel 3 API 30` (Virtual)
- `Samsung Galaxy A04` (Physical)