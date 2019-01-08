import { Location } from './Location';
import { LocationTypes } from '../DomainTypes';

class LocationWarehouse {

    locations = new Map<String, Location>();

    constructor() {
        this.initilizeLocations();
    }

    public isValidLocationName = (potentialLocationName: string) => {
        return this.locations.get(potentialLocationName + LocationTypes.Piece) ||
            this.locations.get(potentialLocationName + LocationTypes.Capital);

    }

    initilizeLocations = () => {

        const myMap = new Map<String, Location>();

        myMap.set('Switzerland' + LocationTypes.Piece, new Location('Switzerland' + LocationTypes.Piece, '219', '376'));
        myMap.set('Adriatic_Sea' + LocationTypes.Piece,
            new Location('Adriatic_Sea' + LocationTypes.Piece, '296', '441'));
        myMap.set('Aegean_Sea' + LocationTypes.Piece, new Location('Aegean_Sea' + LocationTypes.Piece, '403', '524'));
        myMap.set('Albania' + LocationTypes.Piece, new Location('Albania' + LocationTypes.Piece, '339', '469'));
        myMap.set('Ankara' + LocationTypes.Capital, new Location('Ankara' + LocationTypes.Capital, '482', '469'));
        myMap.set('Ankara' + LocationTypes.Piece, new Location('Ankara' + LocationTypes.Piece, '500', '460'));
        myMap.set('Apulia' + LocationTypes.Piece, new Location('Apulia' + LocationTypes.Piece, '302', '472'));
        myMap.set('Armenia' + LocationTypes.Piece, new Location('Armenia' + LocationTypes.Piece, '576', '456'));
        myMap.set('Baltic_Sea' + LocationTypes.Piece, new Location('Baltic_Sea' + LocationTypes.Piece, '323', '250'));
        myMap.set('Barents_Sea' + LocationTypes.Piece, new Location('Barents_Sea' + LocationTypes.Piece, '445', '41'));
        myMap.set('Belgium' + LocationTypes.Piece, new Location('Belgium' + LocationTypes.Piece, '197', '317'));
        myMap.set('Belgium' + LocationTypes.Capital, new Location('Belgium' + LocationTypes.Capital, '186', '305'));
        myMap.set('Berlin' + LocationTypes.Piece, new Location('Berlin' + LocationTypes.Piece, '279', '280'));
        myMap.set('Berlin' + LocationTypes.Capital, new Location('Berlin' + LocationTypes.Capital, '281', '298'));
        myMap.set('Black_Sea' + LocationTypes.Piece, new Location('Black_Sea' + LocationTypes.Piece, '484', '420'));
        myMap.set('Bohemia' + LocationTypes.Piece, new Location('Bohemia' + LocationTypes.Piece, '289', '336'));
        myMap.set('Brest' + LocationTypes.Piece, new Location('Brest' + LocationTypes.Piece, '125', '334'));
        myMap.set('Brest' + LocationTypes.Capital, new Location('Brest' + LocationTypes.Capital, '106', '322'));
        myMap.set('Budapest' + LocationTypes.Piece, new Location('Budapest' + LocationTypes.Piece, '353', '370'));
        myMap.set('Budapest' + LocationTypes.Capital, new Location('Budapest' + LocationTypes.Capital, '336', '386'));
        myMap.set('Bulgaria' + LocationTypes.Piece, new Location('Bulgaria' + LocationTypes.Piece, '395', '443'));
        myMap.set('Bulgaria' + LocationTypes.Capital, new Location('Bulgaria' + LocationTypes.Capital, '415', '437'));
        myMap.set('Bulgaria_East_Coast' + LocationTypes.Piece,
            new Location('Bulgaria_East_Coast' + LocationTypes.Piece, '410', '440'));
        myMap.set('Bulgaria_South_Coast' + LocationTypes.Piece,
            new Location('Bulgaria_South_Coast' + LocationTypes.Piece, '399', '462'));
        myMap.set('Burgundy' + LocationTypes.Piece, new Location('Burgundy' + LocationTypes.Piece, '191', '360'));
        myMap.set('Clyde' + LocationTypes.Piece, new Location('Clyde' + LocationTypes.Piece, '139', '188'));
        myMap.set('Constantinople' + LocationTypes.Piece,
            new Location('Constantinople' + LocationTypes.Piece, '451', '471'));
        myMap.set('Constantinople' + LocationTypes.Capital,
            new Location('Constantinople' + LocationTypes.Capital, '429', '460'));
        myMap.set('Denmark' + LocationTypes.Piece, new Location('Denmark' + LocationTypes.Piece, '256', '245'));
        myMap.set('Denmark' + LocationTypes.Capital, new Location('Denmark' + LocationTypes.Capital, '272', '252'));
        myMap.set('Eastern_Mediterranean' + LocationTypes.Piece,
            new Location('Eastern_Mediterranean' + LocationTypes.Piece, '474', '546'));
        myMap.set('Edinburgh' + LocationTypes.Piece, new Location('Edinburgh' + LocationTypes.Piece, '157', '210'));
        myMap.set('Edinburgh' + LocationTypes.Capital, new Location('Edinburgh' + LocationTypes.Capital, '154', '219'));
        myMap.set('English_Channel' + LocationTypes.Piece,
            new Location('English_Channel' + LocationTypes.Piece, '119', '307'));
        myMap.set('Finland' + LocationTypes.Piece, new Location('Finland' + LocationTypes.Piece, '385', '143'));
        myMap.set('Galicia' + LocationTypes.Piece, new Location('Galicia' + LocationTypes.Piece, '377', '343'));
        myMap.set('Gascony' + LocationTypes.Piece, new Location('Gascony' + LocationTypes.Piece, '137', '388'));
        myMap.set('Greece' + LocationTypes.Piece, new Location('Greece' + LocationTypes.Piece, '366', '515'));
        myMap.set('Greece' + LocationTypes.Capital, new Location('Greece' + LocationTypes.Capital, '378', '507'));
        myMap.set('Gulf_of_Lyon' + LocationTypes.Piece,
            new Location('Gulf_of_Lyon' + LocationTypes.Piece, '180', '444'));
        myMap.set('Gulf_of_Bothnia' + LocationTypes.Piece,
            new Location('Gulf_of_Bothnia' + LocationTypes.Piece, '348', '199'));
        myMap.set('Helgoland_Bight' + LocationTypes.Piece,
            new Location('Helgoland_Bight' + LocationTypes.Piece, '226', '252'));
        myMap.set('Holland' + LocationTypes.Piece, new Location('Holland' + LocationTypes.Piece, '205', '297'));
        myMap.set('Holland' + LocationTypes.Capital, new Location('Holland' + LocationTypes.Capital, '205', '284'));
        myMap.set('Ionian_Sea' + LocationTypes.Piece, new Location('Ionian_Sea' + LocationTypes.Piece, '324', '540'));
        myMap.set('Irish_Sea' + LocationTypes.Piece, new Location('Irish_Sea' + LocationTypes.Piece, '90', '276'));
        myMap.set('Kiel' + LocationTypes.Piece, new Location('Kiel' + LocationTypes.Piece, '243', '300'));
        myMap.set('Kiel' + LocationTypes.Capital, new Location('Kiel' + LocationTypes.Capital, '254', '278'));
        myMap.set('Liverpool' + LocationTypes.Piece, new Location('Liverpool' + LocationTypes.Piece, '142', '241'));
        myMap.set('Liverpool' + LocationTypes.Capital, new Location('Liverpool' + LocationTypes.Capital, '144', '257'));
        myMap.set('Livonia' + LocationTypes.Piece, new Location('Livonia' + LocationTypes.Piece, '382', '245'));
        myMap.set('London' + LocationTypes.Capital, new Location('London' + LocationTypes.Capital, '162', '290'));
        myMap.set('London' + LocationTypes.Piece, new Location('London' + LocationTypes.Piece, '162', '281'));
        myMap.set('Marseilles' + LocationTypes.Piece, new Location('Marseilles' + LocationTypes.Piece, '190', '398'));
        myMap.set('Marseilles' + LocationTypes.Capital,
            new Location('Marseilles' + LocationTypes.Capital, '186', '417'));
        myMap.set('Mid_Atlantic_Ocean' + LocationTypes.Piece,
            new Location('Mid_Atlantic_Ocean' + LocationTypes.Piece, '23', '355'));
        myMap.set('Moscow' + LocationTypes.Piece, new Location('Moscow' + LocationTypes.Piece, '505', '226'));
        myMap.set('Moscow' + LocationTypes.Capital, new Location('Moscow' + LocationTypes.Capital, '481', '234'));
        myMap.set('Munich' + LocationTypes.Piece, new Location('Munich' + LocationTypes.Piece, '250', '337'));
        myMap.set('Munich' + LocationTypes.Capital, new Location('Munich' + LocationTypes.Capital, '258', '359'));
        myMap.set('Naples' + LocationTypes.Piece, new Location('Naples' + LocationTypes.Piece, '299', '505'));
        myMap.set('Naples' + LocationTypes.Capital, new Location('Naples' + LocationTypes.Capital, '278', '469'));
        myMap.set('North_Atlantic_Ocean' + LocationTypes.Piece,
            new Location('North_Atlantic_Ocean' + LocationTypes.Piece, '65', '140'));
        myMap.set('North_Africa' + LocationTypes.Piece,
            new Location('North_Africa' + LocationTypes.Piece, '100', '536'));
        myMap.set('North_Sea' + LocationTypes.Piece, new Location('North_Sea' + LocationTypes.Piece, '204', '215'));
        myMap.set('Norway' + LocationTypes.Piece, new Location('Norway' + LocationTypes.Piece, '264', '160'));
        myMap.set('Norway' + LocationTypes.Capital, new Location('Norway' + LocationTypes.Capital, '270', '187'));
        myMap.set('Norwegian_Sea' + LocationTypes.Piece,
            new Location('Norwegian_Sea' + LocationTypes.Piece, '220', '90'));
        myMap.set('Paris' + LocationTypes.Piece, new Location('Paris' + LocationTypes.Piece, '162', '346'));
        myMap.set('Paris' + LocationTypes.Capital, new Location('Paris' + LocationTypes.Capital, '173', '334'));
        myMap.set('Picardy' + LocationTypes.Piece, new Location('Picardy' + LocationTypes.Piece, '168', '319'));
        myMap.set('Piedmont' + LocationTypes.Piece, new Location('Piedmont' + LocationTypes.Piece, '220', '399'));
        myMap.set('Portugal' + LocationTypes.Piece, new Location('Portugal' + LocationTypes.Piece, '34', '417'));
        myMap.set('Portugal' + LocationTypes.Capital, new Location('Portugal' + LocationTypes.Capital, '15', '434'));
        myMap.set('Prussia' + LocationTypes.Piece, new Location('Prussia' + LocationTypes.Piece, '315', '283'));
        myMap.set('Rome' + LocationTypes.Piece, new Location('Rome' + LocationTypes.Piece, '264', '452'));
        myMap.set('Rome' + LocationTypes.Capital, new Location('Rome' + LocationTypes.Capital, '252', '443'));
        myMap.set('Ruhr' + LocationTypes.Piece, new Location('Ruhr' + LocationTypes.Piece, '223', '320'));
        myMap.set('Rumania' + LocationTypes.Piece, new Location('Rumania' + LocationTypes.Piece, '415', '405'));
        myMap.set('Rumania' + LocationTypes.Capital, new Location('Rumania' + LocationTypes.Capital, '422', '410'));
        myMap.set('Serbia' + LocationTypes.Piece, new Location('Serbia' + LocationTypes.Piece, '351', '438'));
        myMap.set('Serbia' + LocationTypes.Capital, new Location('Serbia' + LocationTypes.Capital, '343', '419'));
        myMap.set('Sevastopol' + LocationTypes.Piece, new Location('Sevastopol' + LocationTypes.Piece, '515', '330'));
        myMap.set('Sevastopol' + LocationTypes.Capital,
            new Location('Sevastopol' + LocationTypes.Capital, '483', '396'));
        myMap.set('Silesia' + LocationTypes.Piece, new Location('Silesia' + LocationTypes.Piece, '304', '314'));
        myMap.set('Skagerrak' + LocationTypes.Piece, new Location('Skagerrak' + LocationTypes.Piece, '260', '212'));
        myMap.set('Smyrna' + LocationTypes.Piece, new Location('Smyrna' + LocationTypes.Piece, '490', '505'));
        myMap.set('Smyrna' + LocationTypes.Capital, new Location('Smyrna' + LocationTypes.Capital, '424', '502'));
        myMap.set('Spain' + LocationTypes.Piece, new Location('Spain' + LocationTypes.Piece, '64', '439'));
        myMap.set('Spain' + LocationTypes.Capital, new Location('Spain' + LocationTypes.Capital, '80', '432'));
        myMap.set('Spain_nc' + LocationTypes.Piece, new Location('Spain_nc' + LocationTypes.Piece, '80', '404'));
        myMap.set('Spain_sc' + LocationTypes.Piece, new Location('Spain_sc' + LocationTypes.Piece, '52', '475'));
        myMap.set('StPetersburg' + LocationTypes.Piece,
            new Location('StPetersburg' + LocationTypes.Piece, '500', '140'));
        myMap.set('StPetersburg' + LocationTypes.Capital,
            new Location('StPetersburg' + LocationTypes.Capital, '418', '187'));
        myMap.set('StPetersburg_nc' + LocationTypes.Piece,
            new Location('StPetersburg_nc' + LocationTypes.Piece, '472', '122'));
        myMap.set('StPetersburg_sc' + LocationTypes.Piece,
            new Location('StPetersburg_sc' + LocationTypes.Piece, '418', '205'));
        myMap.set('Sweden' + LocationTypes.Piece, new Location('Sweden' + LocationTypes.Piece, '315', '140'));
        myMap.set('Sweden' + LocationTypes.Capital, new Location('Sweden' + LocationTypes.Capital, '323', '196'));
        myMap.set('Syria' + LocationTypes.Piece, new Location('Syria' + LocationTypes.Piece, '570', '520'));
        myMap.set('Trieste' + LocationTypes.Piece, new Location('Trieste' + LocationTypes.Piece, '305', '412'));
        myMap.set('Trieste' + LocationTypes.Capital, new Location('Trieste' + LocationTypes.Capital, '295', '396'));
        myMap.set('Tunis' + LocationTypes.Piece, new Location('Tunis' + LocationTypes.Piece, '212', '542'));
        myMap.set('Tunis' + LocationTypes.Capital, new Location('Tunis' + LocationTypes.Capital, '220', '529'));
        myMap.set('Tuscany' + LocationTypes.Piece, new Location('Tuscany' + LocationTypes.Piece, '247', '430'));
        myMap.set('Tyrolia' + LocationTypes.Piece, new Location('Tyrolia' + LocationTypes.Piece, '277', '378'));
        myMap.set('Tyrrhenian_Sea' + LocationTypes.Piece,
            new Location('Tyrrhenian_Sea' + LocationTypes.Piece, '246', '483'));
        myMap.set('Ukraine' + LocationTypes.Piece, new Location('Ukraine' + LocationTypes.Piece, '427', '327'));
        myMap.set('Venice' + LocationTypes.Piece, new Location('Venice' + LocationTypes.Piece, '250', '408'));
        myMap.set('Venice' + LocationTypes.Capital, new Location('Venice' + LocationTypes.Capital, '261', '397'));
        myMap.set('Vienna' + LocationTypes.Piece, new Location('Vienna' + LocationTypes.Piece, '316', '357'));
        myMap.set('Vienna' + LocationTypes.Capital, new Location('Vienna' + LocationTypes.Capital, '301', '360'));
        myMap.set('Wales' + LocationTypes.Piece, new Location('Wales' + LocationTypes.Piece, '125', '285'));
        myMap.set('Warsaw' + LocationTypes.Piece, new Location('Warsaw' + LocationTypes.Piece, '361', '315'));
        myMap.set('Warsaw' + LocationTypes.Capital, new Location('Warsaw' + LocationTypes.Capital, '337', '307'));
        myMap.set('Western_Mediterranean' + LocationTypes.Piece,
            new Location('Western_Mediterranean' + LocationTypes.Piece, '140', '492'));
        myMap.set('Yorkshire' + LocationTypes.Piece, new Location('Yorkshire' + LocationTypes.Piece, '161', '254'));

        this.locations = myMap;
    }

}

export const Warehouse = new LocationWarehouse();