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

        myMap.set('Switzerland' + LocationTypes.Piece, new Location('219', '376'));
        myMap.set('Adriatic_Sea' + LocationTypes.Piece, new Location('296', '441'));
        myMap.set('Aegean_Sea' + LocationTypes.Piece, new Location('403', '524'));
        myMap.set('Albania' + LocationTypes.Piece, new Location('339', '469'));
        myMap.set('Ankara' + LocationTypes.Capital, new Location('482', '469'));
        myMap.set('Ankara' + LocationTypes.Piece, new Location('500', '460'));
        myMap.set('Apulia' + LocationTypes.Piece, new Location('302', '472'));
        myMap.set('Armenia' + LocationTypes.Piece, new Location('576', '456'));
        myMap.set('Baltic_Sea' + LocationTypes.Piece, new Location('323', '250'));
        myMap.set('Barents_Sea' + LocationTypes.Piece, new Location('445', '41'));
        myMap.set('Belgium' + LocationTypes.Piece, new Location('197', '317'));
        myMap.set('Belgium' + LocationTypes.Capital, new Location('186', '305'));
        myMap.set('Berlin' + LocationTypes.Piece, new Location('279', '280'));
        myMap.set('Berlin' + LocationTypes.Capital, new Location('281', '298'));
        myMap.set('Black_Sea' + LocationTypes.Piece, new Location('484', '420'));
        myMap.set('Bohemia' + LocationTypes.Piece, new Location('289', '336'));
        myMap.set('Brest' + LocationTypes.Piece, new Location('125', '334'));
        myMap.set('Brest' + LocationTypes.Capital, new Location('106', '322'));
        myMap.set('Budapest' + LocationTypes.Piece, new Location('353', '370'));
        myMap.set('Budapest' + LocationTypes.Capital, new Location('326', '376'));
        myMap.set('Bulgaria' + LocationTypes.Piece, new Location('395', '443'));
        myMap.set('Bulgaria' + LocationTypes.Capital, new Location('377', '444'));
        myMap.set('Bulgaria_East_Coast' + LocationTypes.Piece, new Location('410', '440'));
        myMap.set('Bulgaria_South_Coast' + LocationTypes.Piece, new Location('399', '462'));
        myMap.set('Burgundy' + LocationTypes.Piece, new Location('191', '360'));
        myMap.set('Clyde' + LocationTypes.Piece, new Location('139', '188'));
        myMap.set('Constantinople' + LocationTypes.Piece, new Location('451', '471'));
        myMap.set('Constantinople' + LocationTypes.Capital, new Location('429', '460'));
        myMap.set('Denmark' + LocationTypes.Piece, new Location('256', '245'));
        myMap.set('Denmark' + LocationTypes.Capital, new Location('272', '252'));
        myMap.set('Eastern_Mediterranean' + LocationTypes.Piece, new Location('474', '546'));
        myMap.set('Edinburgh' + LocationTypes.Piece, new Location('157', '210'));
        myMap.set('Edinburgh' + LocationTypes.Capital, new Location('154', '219'));
        myMap.set('English_Channel' + LocationTypes.Piece, new Location('119', '307'));
        myMap.set('Finland' + LocationTypes.Piece, new Location('385', '143'));
        myMap.set('Galicia' + LocationTypes.Piece, new Location('377', '343'));
        myMap.set('Gascony' + LocationTypes.Piece, new Location('137', '388'));
        myMap.set('Greece' + LocationTypes.Piece, new Location('366', '515'));
        myMap.set('Greece' + LocationTypes.Capital, new Location('378', '507'));
        myMap.set('Gulf_of_Lyon' + LocationTypes.Piece, new Location('180', '444'));
        myMap.set('Gulf_of_Bothnia' + LocationTypes.Piece, new Location('348', '199'));
        myMap.set('Helgoland_Bight' + LocationTypes.Piece, new Location('226', '252'));
        myMap.set('Holland' + LocationTypes.Piece, new Location('205', '297'));
        myMap.set('Holland' + LocationTypes.Capital, new Location('205', '284'));
        myMap.set('Ionian_Sea' + LocationTypes.Piece, new Location('324', '540'));
        myMap.set('Irish_Sea' + LocationTypes.Piece, new Location('90', '276'));
        myMap.set('Kiel' + LocationTypes.Piece, new Location('243', '300'));
        myMap.set('Kiel' + LocationTypes.Capital, new Location('254', '278'));
        myMap.set('Liverpool' + LocationTypes.Piece, new Location('142', '241'));
        myMap.set('Liverpool' + LocationTypes.Capital, new Location('144', '257'));
        myMap.set('Livonia' + LocationTypes.Piece, new Location('382', '245'));
        myMap.set('London' + LocationTypes.Capital, new Location('162', '290'));
        myMap.set('London' + LocationTypes.Piece,  new Location('162', '281'));
        myMap.set('Marseilles' + LocationTypes.Piece, new Location('190', '398'));
        myMap.set('Marseilles' + LocationTypes.Capital, new Location('186', '417'));
        myMap.set('Mid_Atlantic_Ocean' + LocationTypes.Piece, new Location('23', '355'));
        myMap.set('Moscow' + LocationTypes.Piece, new Location('505', '226'));
        myMap.set('Moscow' + LocationTypes.Capital, new Location('481', '234'));
        myMap.set('Munich' + LocationTypes.Piece, new Location('243', '347'));
        myMap.set('Munich' + LocationTypes.Capital, new Location('258', '359'));
        myMap.set('Naples' + LocationTypes.Piece, new Location('299', '505'));
        myMap.set('Naples' + LocationTypes.Capital, new Location('278', '469'));
        myMap.set('North_Atlantic_Ocean' + LocationTypes.Piece, new Location('65', '140'));
        myMap.set('North_Africa' + LocationTypes.Piece, new Location('100', '536'));
        myMap.set('North_Sea' + LocationTypes.Piece, new Location('204', '215'));
        myMap.set('Norway' + LocationTypes.Piece, new Location('264', '160'));
        myMap.set('Norawy' + LocationTypes.Capital, new Location('270', '187'));
        myMap.set('Norwegian_Sea' + LocationTypes.Piece, new Location('220', '90'));
        myMap.set('Paris' + LocationTypes.Piece, new Location('162', '346'));
        myMap.set('Paris' + LocationTypes.Capital, new Location('173', '334'));
        myMap.set('Picardy' + LocationTypes.Piece, new Location('168', '319'));
        myMap.set('Piedmont' + LocationTypes.Piece, new Location('220', '399'));
        myMap.set('Portugal' + LocationTypes.Piece, new Location('34', '417'));
        myMap.set('Portugal' + LocationTypes.Capital, new Location('15', '434'));
        myMap.set('Prussia' + LocationTypes.Piece, new Location('315', '283'));
        myMap.set('Rome' + LocationTypes.Piece, new Location('264', '452'));
        myMap.set('Rome' + LocationTypes.Capital, new Location('252', '443'));
        myMap.set('Ruhr' + LocationTypes.Piece, new Location('223', '320'));
        myMap.set('Rumania' + LocationTypes.Piece, new Location('415', '405'));
        myMap.set('Rumania' + LocationTypes.Capital, new Location('402', '413'));
        myMap.set('Serbia' + LocationTypes.Piece, new Location('351', '438'));
        myMap.set('Serbia' + LocationTypes.Capital, new Location('343', '419'));
        myMap.set('Sevastopol' + LocationTypes.Piece, new Location('515', '330'));
        myMap.set('Sevastopol' + LocationTypes.Capital, new Location('483', '396'));
        myMap.set('Silesia' + LocationTypes.Piece, new Location('304', '314'));
        myMap.set('Skagerrak' + LocationTypes.Piece, new Location('260', '212'));
        myMap.set('Smyrna' + LocationTypes.Piece, new Location('490', '505'));
        myMap.set('Smyrna' + LocationTypes.Capital, new Location('424', '502'));
        myMap.set('Spain' + LocationTypes.Piece, new Location('64', '439'));
        myMap.set('Spain' + LocationTypes.Capital, new Location('80', '432'));
        myMap.set('Spain_nc' + LocationTypes.Piece, new Location('80', '404'));
        myMap.set('Spain_sc' + LocationTypes.Piece, new Location('52', '475'));
        myMap.set('StPetersburg' + LocationTypes.Piece, new Location('500', '140'));
        myMap.set('StPetersburg' + LocationTypes.Capital, new Location('418', '187'));
        myMap.set('StPetersburg_nc' + LocationTypes.Piece, new Location('472', '122'));
        myMap.set('StPetersburg_sc' + LocationTypes.Piece, new Location('418', '205'));
        myMap.set('Sweden' + LocationTypes.Piece, new Location('315', '140'));
        myMap.set('Sweden' + LocationTypes.Capital, new Location('323', '196'));
        myMap.set('Syria' + LocationTypes.Piece, new Location('570', '520'));
        myMap.set('Trieste' + LocationTypes.Piece, new Location('305', '412'));
        myMap.set('Trieste' + LocationTypes.Capital, new Location('295', '396'));
        myMap.set('Tunis' + LocationTypes.Piece, new Location('212', '542'));
        myMap.set('Tunis' + LocationTypes.Capital, new Location('220', '529'));
        myMap.set('Tuscany' + LocationTypes.Piece, new Location('247', '430'));
        myMap.set('Tyrolia' + LocationTypes.Piece, new Location('277', '378'));
        myMap.set('Tyrrhenian_Sea' + LocationTypes.Piece, new Location('246', '483'));
        myMap.set('Ukraine' + LocationTypes.Piece, new Location('427', '327'));
        myMap.set('Venice' + LocationTypes.Piece, new Location('250', '408'));
        myMap.set('Venice' + LocationTypes.Capital, new Location('261', '397'));
        myMap.set('Vienna' + LocationTypes.Piece, new Location('314', '360'));
        myMap.set('Vienna' + LocationTypes.Capital, new Location('301', '363'));
        myMap.set('Wales' + LocationTypes.Piece, new Location('125', '285'));
        myMap.set('Warsaw' + LocationTypes.Piece, new Location('361', '315'));
        myMap.set('Warsaw' + LocationTypes.Capital, new Location('346', '302'));
        myMap.set('Western_Mediterranean' + LocationTypes.Piece, new Location('140', '492'));
        myMap.set('Yorkshire' + LocationTypes.Piece, new Location('161', '254'));

        this.locations = myMap;
    }

}

export const Warehouse = new LocationWarehouse();