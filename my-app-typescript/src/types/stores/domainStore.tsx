import { observable } from 'mobx';

class DomainState {
    @observable name: string;
    @observable enthusiasmLevel: number;
    constructor(aName: string, anEnthusisamLevel: number) {
        this.name = aName;
        this.enthusiasmLevel = anEnthusisamLevel;
    }
    public incrementEnthusiasmLevel = () => {
        this.enthusiasmLevel ++;
    }

    public decrementEnthusiasmLevel = () => {
        if (this.enthusiasmLevel > 0) {
            this.enthusiasmLevel --;
        }
    }
}

export const domainState = new DomainState('Stevie', 1);