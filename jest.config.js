module.exports = {
    testEnvironment: "jest-environment-jsdom",

    // Archivo que configura pruebas antes de ejecutarlas (por ejemplo, configuración de testing-library)
    setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js"],

    // Ignorar estos directorios al buscar pruebas
    // Alias para importar rutas y mock de estilos
    moduleNameMapper: {
        "^@/globals.css$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock estilos
        "^@/(.*)$": "<rootDir>/src/app/$1", // Alias "@/"
    },

    // Tratar los archivos JSX como módulos ES
    extensionsToTreatAsEsm: [".jsx"],

    // Usar Babel para transformar los archivos de JS/TS/JSX/TSX
    transform: {
        "^.+\\.(js|jsx)$": ["babel-jest", { configFile: "./babel.config.test.js" }],
    },

    // Ignorar la transformación de estos módulos (excepto si necesitas hacer alguna transformación adicional)
    transformIgnorePatterns: ["/node_modules/"],
    
    testPathIgnorePatterns: ["/node_modules/", "<rootDir>/babel.config.test.js"]

};
