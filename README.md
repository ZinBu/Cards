# Cards

The mobile game with soul of 90s (16+)

Run:

    sh setup.sh


Build .apk

    expo prebuild --platform android --clean
    eas build:configure
    # eas build --platform android
    eas build -p android --profile preview

Build web

    npx expo export:web
    cd web-build
    vercel
