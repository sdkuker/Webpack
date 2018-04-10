import { Location } from './Location';

class LocationWarehouse {

    LocationTypes = Object.freeze({
        CAPITAL: ' - Capital',
        PIECE : '- Piece'
    });

    locations = new Map<String, Location>();

    constructor() {
        this.initilizeLocations();
    }

    public getLocations = () => {
        return this.locations;
    }
   
    initilizeLocations = () => {

        const myMap = new Map<String, Location>();

        myMap.set('Switzerland' + this.LocationTypes.PIECE, new Location('219', '376'));
        myMap.set('Adriatic_Sea' + this.LocationTypes.PIECE, new Location('296', '441'));
        myMap.set('Aegean_Sea' + this.LocationTypes.PIECE, new Location('403', '524'));
        myMap.set('Albania' + this.LocationTypes.PIECE, new Location('339', '469'));
        myMap.set('Ankara' + this.LocationTypes.CAPITAL, new Location('482', '469'));
        myMap.set('Ankara' + this.LocationTypes.PIECE, new Location('500', '460'));
        myMap.set('Apulia' + this.LocationTypes.PIECE, new Location('302', '472'));
        myMap.set('Armenia' + this.LocationTypes.PIECE, new Location('576', '456'));
        myMap.set('Baltic_Sea' + this.LocationTypes.PIECE, new Location('323', '250'));
        myMap.set('Barents_Sea' + this.LocationTypes.PIECE, new Location('445', '41'));
        myMap.set('Belgium' + this.LocationTypes.PIECE, new Location('197', '317'));
        myMap.set('Belgium' + this.LocationTypes.CAPITAL, new Location('186', '305'));
        myMap.set('Berlin' + this.LocationTypes.PIECE, new Location('279', '283'));
        myMap.set('Berlin' + this.LocationTypes.CAPITAL, new Location('281', '298'));
        myMap.set('Black_Sea' + this.LocationTypes.PIECE, new Location('484', '420'));
        myMap.set('Bohemia' + this.LocationTypes.PIECE, new Location('289', '336'));
        myMap.set('Brest' + this.LocationTypes.PIECE, new Location('125', '334'));
        myMap.set('Brest' + this.LocationTypes.CAPITAL, new Location('106', '322'));
        myMap.set('Budapest' + this.LocationTypes.PIECE, new Location('353', '378'));
        myMap.set('Budapest' + this.LocationTypes.CAPITAL, new Location('326', '376'));
        myMap.set('Bulgaria' + this.LocationTypes.PIECE, new Location('395', '443'));
        myMap.set('Bulgaria' + this.LocationTypes.CAPITAL, new Location('377', '444'));
        myMap.set('Bulgaria_East_Coast' + this.LocationTypes.PIECE, new Location('410', '440'));
        myMap.set('Bulgaria_South_Coast' + this.LocationTypes.PIECE, new Location('399', '462'));
        myMap.set('Burgundy' + this.LocationTypes.PIECE, new Location('191', '360'));
        myMap.set('Clyde' + this.LocationTypes.PIECE, new Location('139', '188'));
        myMap.set('Constantinople' + this.LocationTypes.PIECE, new Location('439', '473'));
        myMap.set('Constantinople' + this.LocationTypes.CAPITAL, new Location('429', '460'));
        myMap.set('Denmark' + this.LocationTypes.PIECE, new Location('256', '245'));
        myMap.set('Denmark' + this.LocationTypes.CAPITAL, new Location('272', '252'));
        myMap.set('Eastern_Mediterranean' + this.LocationTypes.PIECE, new Location('474', '546'));
        myMap.set('Edinburgh' + this.LocationTypes.PIECE, new Location('157', '210'));
        myMap.set('Edinburgh' + this.LocationTypes.CAPITAL, new Location('154', '219'));
        myMap.set('English_Channel' + this.LocationTypes.PIECE, new Location('119', '307'));
        myMap.set('Finland' + this.LocationTypes.PIECE, new Location('385', '143'));
        myMap.set('Galicia' + this.LocationTypes.PIECE, new Location('377', '343'));
        myMap.set('Gascony' + this.LocationTypes.PIECE, new Location('137', '388'));
        myMap.set('Greece' + this.LocationTypes.PIECE, new Location('366', '515'));
        myMap.set('Greece' + this.LocationTypes.CAPITAL, new Location('378', '507'));
        myMap.set('Gulf_of_Lyon' + this.LocationTypes.PIECE, new Location('180', '444'));
        myMap.set('Gulf_of_Bothnia' + this.LocationTypes.PIECE, new Location('348', '199'));
        myMap.set('Helgoland_Bight' + this.LocationTypes.PIECE, new Location('226', '252'));
        myMap.set('Holland' + this.LocationTypes.PIECE, new Location('205', '297'));
        myMap.set('Holland' + this.LocationTypes.CAPITAL, new Location('205', '284'));
        myMap.set('Ionian_Sea' + this.LocationTypes.PIECE, new Location('324', '540'));
        myMap.set('Irish_Sea' + this.LocationTypes.PIECE, new Location('90', '276'));
        myMap.set('Kiel' + this.LocationTypes.PIECE, new Location('243', '295'));
        myMap.set('Kiel' + this.LocationTypes.CAPITAL, new Location('254', '278'));
        myMap.set('Liverpool' + this.LocationTypes.PIECE, new Location('142', '241'));
        myMap.set('Liverpool' + this.LocationTypes.CAPITAL, new Location('144', '257'));
        myMap.set('Livonia' + this.LocationTypes.PIECE, new Location('382', '245'));
        myMap.set('London' + this.LocationTypes.CAPITAL, new Location('162', '290'));
        myMap.set('London' + this.LocationTypes.PIECE,  new Location('162', '281'));
        myMap.set('Marseilles' + this.LocationTypes.PIECE, new Location('184', '402'));
        myMap.set('Marseilles' + this.LocationTypes.CAPITAL, new Location('186', '417'));
        myMap.set('Mid_Atlantic_Ocean' + this.LocationTypes.PIECE, new Location('23', '355'));

        this.locations = myMap;
    }

}

export const Warehouse = new LocationWarehouse();