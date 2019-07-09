class Config {
    gameWarehouseDataProvider = 'firebase';
    turnWarehouseDataProvider = 'firebase';
    countryWarehouseDataProvider = 'firebase';
    moveWarehouseDataProvider = 'firebase';
    pieceWarehouseDataProvider = 'firebase';
    capitalWarehouseDataProvider = 'firebase';
    environment = 'TEST';
    awsEnvironment = 'LOCAL';
    awsLocalConnectionURL = 'http://localhost:3000/administer?';
    awsRemoteConnectionURL = 'https://ayjak7h1j9.execute-api.us-west-1.amazonaws.com/Prod/administer?';
}

export const myConfig = new Config();