import { domainState } from '.././domainStore';

it('initial state', () => {
    expect(domainState.enthusiasmLevel).toEqual(1);
})
it('increment 1', () => {
    domainState.incrementEnthusiasmLevel();
    expect(domainState.enthusiasmLevel).toEqual(2);
})
it('decrement 1', () => {
    domainState.decrementEnthusiasmLevel();
    expect(domainState.enthusiasmLevel).toEqual(1);
})
it('decrement to zero', () => {
    domainState.decrementEnthusiasmLevel();
    expect(domainState.enthusiasmLevel).toEqual(0);
})
it('decrement past zero', () => {
    domainState.decrementEnthusiasmLevel();
    expect(domainState.enthusiasmLevel).toEqual(0);
})