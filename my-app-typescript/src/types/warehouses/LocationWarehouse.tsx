import { Location } from './Location';
import { LocationTypes } from './DomainTypes';

class LocationWarehouse {

    locations = new Map<String, Location>();

    constructor() {
        this.initilizeLocations();
    }

    public getLocations = () => {
        return this.locations;
    }
   
    initilizeLocations = () => {

        const myMap = new Map<String, Location>();

        myMap.set('Switzerland' + LocationTypes.PIECE, new Location('219', '376'));
        myMap.set('Adriatic_Sea' + LocationTypes.PIECE, new Location('296', '441'));
        myMap.set('Aegean_Sea' + LocationTypes.PIECE, new Location('403', '524'));
        myMap.set('Albania' + LocationTypes.PIECE, new Location('339', '469'));
        myMap.set('Ankara' + LocationTypes.CAPITAL, new Location('482', '469'));
        myMap.set('Ankara' + LocationTypes.PIECE, new Location('500', '460'));
        myMap.set('Apulia' + LocationTypes.PIECE, new Location('302', '472'));
        myMap.set('Armenia' + LocationTypes.PIECE, new Location('576', '456'));
        myMap.set('Baltic_Sea' + LocationTypes.PIECE, new Location('323', '250'));
        myMap.set('Barents_Sea' + LocationTypes.PIECE, new Location('445', '41'));
        myMap.set('Belgium' + LocationTypes.PIECE, new Location('197', '317'));
        myMap.set('Belgium' + LocationTypes.CAPITAL, new Location('186', '305'));
        myMap.set('Berlin' + LocationTypes.PIECE, new Location('279', '283'));
        myMap.set('Berlin' + LocationTypes.CAPITAL, new Location('281', '298'));
        myMap.set('Black_Sea' + LocationTypes.PIECE, new Location('484', '420'));
        myMap.set('Bohemia' + LocationTypes.PIECE, new Location('289', '336'));
        myMap.set('Brest' + LocationTypes.PIECE, new Location('125', '334'));
        myMap.set('Brest' + LocationTypes.CAPITAL, new Location('106', '322'));
        myMap.set('Budapest' + LocationTypes.PIECE, new Location('353', '378'));
        myMap.set('Budapest' + LocationTypes.CAPITAL, new Location('326', '376'));
        myMap.set('Bulgaria' + LocationTypes.PIECE, new Location('395', '443'));
        myMap.set('Bulgaria' + LocationTypes.CAPITAL, new Location('377', '444'));
        myMap.set('Bulgaria_East_Coast' + LocationTypes.PIECE, new Location('410', '440'));
        myMap.set('Bulgaria_South_Coast' + LocationTypes.PIECE, new Location('399', '462'));
        myMap.set('Burgundy' + LocationTypes.PIECE, new Location('191', '360'));
        myMap.set('Clyde' + LocationTypes.PIECE, new Location('139', '188'));
        myMap.set('Constantinople' + LocationTypes.PIECE, new Location('439', '473'));
        myMap.set('Constantinople' + LocationTypes.CAPITAL, new Location('429', '460'));
        myMap.set('Denmark' + LocationTypes.PIECE, new Location('256', '245'));
        myMap.set('Denmark' + LocationTypes.CAPITAL, new Location('272', '252'));
        myMap.set('Eastern_Mediterranean' + LocationTypes.PIECE, new Location('474', '546'));
        myMap.set('Edinburgh' + LocationTypes.PIECE, new Location('157', '210'));
        myMap.set('Edinburgh' + LocationTypes.CAPITAL, new Location('154', '219'));
        myMap.set('English_Channel' + LocationTypes.PIECE, new Location('119', '307'));
        myMap.set('Finland' + LocationTypes.PIECE, new Location('385', '143'));
        myMap.set('Galicia' + LocationTypes.PIECE, new Location('377', '343'));
        myMap.set('Gascony' + LocationTypes.PIECE, new Location('137', '388'));
        myMap.set('Greece' + LocationTypes.PIECE, new Location('366', '515'));
        myMap.set('Greece' + LocationTypes.CAPITAL, new Location('378', '507'));
        myMap.set('Gulf_of_Lyon' + LocationTypes.PIECE, new Location('180', '444'));
        myMap.set('Gulf_of_Bothnia' + LocationTypes.PIECE, new Location('348', '199'));
        myMap.set('Helgoland_Bight' + LocationTypes.PIECE, new Location('226', '252'));
        myMap.set('Holland' + LocationTypes.PIECE, new Location('205', '297'));
        myMap.set('Holland' + LocationTypes.CAPITAL, new Location('205', '284'));
        myMap.set('Ionian_Sea' + LocationTypes.PIECE, new Location('324', '540'));
        myMap.set('Irish_Sea' + LocationTypes.PIECE, new Location('90', '276'));
        myMap.set('Kiel' + LocationTypes.PIECE, new Location('243', '295'));
        myMap.set('Kiel' + LocationTypes.CAPITAL, new Location('254', '278'));
        myMap.set('Liverpool' + LocationTypes.PIECE, new Location('142', '241'));
        myMap.set('Liverpool' + LocationTypes.CAPITAL, new Location('144', '257'));
        myMap.set('Livonia' + LocationTypes.PIECE, new Location('382', '245'));
        myMap.set('London' + LocationTypes.CAPITAL, new Location('162', '290'));
        myMap.set('London' + LocationTypes.PIECE,  new Location('162', '281'));
        myMap.set('Marseilles' + LocationTypes.PIECE, new Location('184', '402'));
        myMap.set('Marseilles' + LocationTypes.CAPITAL, new Location('186', '417'));
        myMap.set('Mid_Atlantic_Ocean' + LocationTypes.PIECE, new Location('23', '355'));
        myMap.set('Moscow' + LocationTypes.PIECE, new Location('505', '226'));
        myMap.set('Moscow' + LocationTypes.CAPITAL, new Location('481', '234'));
        myMap.set('Munich' + LocationTypes.PIECE, new Location('243', '347'));
        myMap.set('Munich' + LocationTypes.CAPITAL, new Location('258', '359'));
        myMap.set('Naples' + LocationTypes.PIECE, new Location('299', '505'));
        myMap.set('Naples' + LocationTypes.CAPITAL, new Location('278', '469'));
        myMap.set('North_Atlantic_Ocean' + LocationTypes.PIECE, new Location('65', '140'));
        myMap.set('North_Africa' + LocationTypes.PIECE, new Location('100', '536'));
        myMap.set('North_Sea' + LocationTypes.PIECE, new Location('204', '215'));
        myMap.set('Norway' + LocationTypes.PIECE, new Location('264', '160'));
        myMap.set('Norawy' + LocationTypes.CAPITAL, new Location('270', '187'));
        myMap.set('Norwegian_Sea' + LocationTypes.PIECE, new Location('220', '90'));
        myMap.set('Paris' + LocationTypes.PIECE, new Location('162', '346'));
        myMap.set('Paris' + LocationTypes.CAPITAL, new Location('173', '334'));
        myMap.set('Picardy' + LocationTypes.PIECE, new Location('168', '319'));
        myMap.set('Piedmont' + LocationTypes.PIECE, new Location('220', '399'));
        myMap.set('Portugal' + LocationTypes.PIECE, new Location('34', '417'));
        myMap.set('Portugal' + LocationTypes.CAPITAL, new Location('15', '434'));
        myMap.set('Prussia' + LocationTypes.PIECE, new Location('315', '283'));
        myMap.set('Rome' + LocationTypes.PIECE, new Location('264', '452'));
        myMap.set('Rome' + LocationTypes.CAPITAL, new Location('252', '443'));
        myMap.set('Ruhr' + LocationTypes.PIECE, new Location('223', '320'));
        myMap.set('Rumania' + LocationTypes.PIECE, new Location('415', '405'));
        myMap.set('Rumania' + LocationTypes.CAPITAL, new Location('402', '413'));
        myMap.set('Serbia' + LocationTypes.PIECE, new Location('351', '438'));
        myMap.set('Serbia' + LocationTypes.CAPITAL, new Location('343', '419'));
        myMap.set('Sevastopol' + LocationTypes.PIECE, new Location('515', '330'));
        myMap.set('Sevastopol' + LocationTypes.CAPITAL, new Location('483', '396'));
        myMap.set('Silesia' + LocationTypes.PIECE, new Location('304', '314'));
        myMap.set('Skagerrak' + LocationTypes.PIECE, new Location('260', '212'));
        myMap.set('Smyrna' + LocationTypes.PIECE, new Location('490', '505'));
        myMap.set('Smyrna' + LocationTypes.CAPITAL, new Location('424', '502'));
        myMap.set('Spain' + LocationTypes.PIECE, new Location('64', '439'));
        myMap.set('Spain' + LocationTypes.CAPITAL, new Location('80', '432'));
        myMap.set('Spain_nc' + LocationTypes.PIECE, new Location('80', '404'));
        myMap.set('Spain_sc' + LocationTypes.PIECE, new Location('52', '475'));
        myMap.set('StPetersburg' + LocationTypes.PIECE, new Location('500', '140'));
        myMap.set('StPetersburg' + LocationTypes.CAPITAL, new Location('418', '187'));
        myMap.set('StPetersburg_nc' + LocationTypes.PIECE, new Location('472', '122'));
        myMap.set('StPetersburg_sc' + LocationTypes.PIECE, new Location('418', '205'));
        myMap.set('Sweden' + LocationTypes.PIECE, new Location('315', '140'));
        myMap.set('Sweden' + LocationTypes.CAPITAL, new Location('323', '196'));
        myMap.set('Syria' + LocationTypes.PIECE, new Location('570', '520'));
        myMap.set('Trieste' + LocationTypes.PIECE, new Location('305', '412'));
        myMap.set('Trieste' + LocationTypes.CAPITAL, new Location('384', '396'));
        myMap.set('Tunis' + LocationTypes.PIECE, new Location('212', '542'));
        myMap.set('Tunis' + LocationTypes.CAPITAL, new Location('220', '529'));
        myMap.set('Tuscany' + LocationTypes.PIECE, new Location('247', '430'));
        myMap.set('Tyrolia' + LocationTypes.PIECE, new Location('277', '378'));
        myMap.set('Tyrrhenian_Sea' + LocationTypes.PIECE, new Location('246', '483'));
        myMap.set('Ukraine' + LocationTypes.PIECE, new Location('427', '327'));
        myMap.set('Venice' + LocationTypes.PIECE, new Location('250', '408'));
        myMap.set('Venice' + LocationTypes.CAPITAL, new Location('261', '397'));
        myMap.set('Vienna' + LocationTypes.PIECE, new Location('314', '360'));
        myMap.set('Vienna' + LocationTypes.CAPITAL, new Location('301', '363'));
        myMap.set('Wales' + LocationTypes.PIECE, new Location('125', '285'));
        myMap.set('Warsaw' + LocationTypes.PIECE, new Location('361', '315'));
        myMap.set('Warsaw' + LocationTypes.CAPITAL, new Location('346', '302'));
        myMap.set('Western_Mediterranean' + LocationTypes.PIECE, new Location('140', '492'));
        myMap.set('Yorkshire' + LocationTypes.PIECE, new Location('161', '254'));

        this.locations = myMap;
    }

}

export const Warehouse = new LocationWarehouse();