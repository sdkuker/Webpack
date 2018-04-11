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
        myMap.set('Moscow' + this.LocationTypes.PIECE, new Location('505', '226'));
        myMap.set('Moscow' + this.LocationTypes.CAPITAL, new Location('481', '234'));
        myMap.set('Munich' + this.LocationTypes.PIECE, new Location('243', '347'));
        myMap.set('Munich' + this.LocationTypes.CAPITAL, new Location('258', '359'));
        myMap.set('Naples' + this.LocationTypes.PIECE, new Location('299', '505'));
        myMap.set('Naples' + this.LocationTypes.CAPITAL, new Location('278', '469'));
        myMap.set('North_Atlantic_Ocean' + this.LocationTypes.PIECE, new Location('65', '140'));
        myMap.set('North_Africa' + this.LocationTypes.PIECE, new Location('100', '536'));
        myMap.set('North_Sea' + this.LocationTypes.PIECE, new Location('204', '215'));
        myMap.set('Norway' + this.LocationTypes.PIECE, new Location('264', '160'));
        myMap.set('Norawy' + this.LocationTypes.CAPITAL, new Location('270', '187'));
        myMap.set('Norwegian_Sea' + this.LocationTypes.PIECE, new Location('220', '90'));
        myMap.set('Paris' + this.LocationTypes.PIECE, new Location('162', '346'));
        myMap.set('Paris' + this.LocationTypes.CAPITAL, new Location('173', '334'));
        myMap.set('Picardy' + this.LocationTypes.PIECE, new Location('168', '319'));
        myMap.set('Piedmont' + this.LocationTypes.PIECE, new Location('220', '399'));
        myMap.set('Portugal' + this.LocationTypes.PIECE, new Location('34', '417'));
        myMap.set('Portugal' + this.LocationTypes.CAPITAL, new Location('15', '434'));
        myMap.set('Prussia' + this.LocationTypes.PIECE, new Location('315', '283'));
        myMap.set('Rome' + this.LocationTypes.PIECE, new Location('264', '452'));
        myMap.set('Rome' + this.LocationTypes.CAPITAL, new Location('252', '443'));
        myMap.set('Ruhr' + this.LocationTypes.PIECE, new Location('223', '320'));
        myMap.set('Rumania' + this.LocationTypes.PIECE, new Location('415', '405'));
        myMap.set('Rumania' + this.LocationTypes.CAPITAL, new Location('402', '413'));
        myMap.set('Serbia' + this.LocationTypes.PIECE, new Location('351', '438'));
        myMap.set('Serbia' + this.LocationTypes.CAPITAL, new Location('343', '419'));
        myMap.set('Sevastopol' + this.LocationTypes.PIECE, new Location('515', '330'));
        myMap.set('Sevastopol' + this.LocationTypes.CAPITAL, new Location('483', '396'));
        myMap.set('Silesia' + this.LocationTypes.PIECE, new Location('304', '314'));
        myMap.set('Skagerrak' + this.LocationTypes.PIECE, new Location('260', '212'));
        myMap.set('Smyrna' + this.LocationTypes.PIECE, new Location('490', '505'));
        myMap.set('Smyrna' + this.LocationTypes.CAPITAL, new Location('424', '502'));
        myMap.set('Spain' + this.LocationTypes.PIECE, new Location('64', '439'));
        myMap.set('Spain' + this.LocationTypes.CAPITAL, new Location('80', '432'));
        myMap.set('Spain_nc' + this.LocationTypes.PIECE, new Location('80', '404'));
        myMap.set('Spain_sc' + this.LocationTypes.PIECE, new Location('52', '475'));
        myMap.set('StPetersburg' + this.LocationTypes.PIECE, new Location('500', '140'));
        myMap.set('StPetersburg' + this.LocationTypes.CAPITAL, new Location('418', '187'));
        myMap.set('StPetersburg_nc' + this.LocationTypes.PIECE, new Location('472', '122'));
        myMap.set('StPetersburg_sc' + this.LocationTypes.PIECE, new Location('418', '205'));
        myMap.set('Sweden' + this.LocationTypes.PIECE, new Location('315', '140'));
        myMap.set('Sweden' + this.LocationTypes.CAPITAL, new Location('323', '196'));
        myMap.set('Syria' + this.LocationTypes.PIECE, new Location('570', '520'));
        myMap.set('Trieste' + this.LocationTypes.PIECE, new Location('305', '412'));
        myMap.set('Trieste' + this.LocationTypes.CAPITAL, new Location('384', '396'));
        myMap.set('Tunis' + this.LocationTypes.PIECE, new Location('212', '542'));
        myMap.set('Tunis' + this.LocationTypes.CAPITAL, new Location('220', '529'));
        myMap.set('Tuscany' + this.LocationTypes.PIECE, new Location('247', '430'));
        myMap.set('Tyrolia' + this.LocationTypes.PIECE, new Location('277', '378'));
        myMap.set('Tyrrhenian_Sea' + this.LocationTypes.PIECE, new Location('246', '483'));
        myMap.set('Ukraine' + this.LocationTypes.PIECE, new Location('427', '327'));
        myMap.set('Venice' + this.LocationTypes.PIECE, new Location('250', '408'));
        myMap.set('Venice' + this.LocationTypes.CAPITAL, new Location('261', '397'));
        myMap.set('Vienna' + this.LocationTypes.PIECE, new Location('314', '360'));
        myMap.set('Vienna' + this.LocationTypes.CAPITAL, new Location('301', '363'));
        myMap.set('Wales' + this.LocationTypes.PIECE, new Location('125', '285'));
        myMap.set('Warsaw' + this.LocationTypes.PIECE, new Location('361', '315'));
        myMap.set('Warsaw' + this.LocationTypes.CAPITAL, new Location('346', '302'));
        myMap.set('Western_Mediterranean' + this.LocationTypes.PIECE, new Location('140', '492'));
        myMap.set('Yorkshire' + this.LocationTypes.PIECE, new Location('161', '254'));

        this.locations = myMap;
    }

}

export const Warehouse = new LocationWarehouse();