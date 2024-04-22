import {tabCreation} from "./tabsListeners"

describe("Testing Listeners",()=>{
    it('should return true',()=>{
        expect(tabCreation('chrome',{} as any)).toBeTruthy();
    })
})