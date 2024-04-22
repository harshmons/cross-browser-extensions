
// import { tabCreation } from "../../../src/scripts/background/tabsListeners";
import { tabCreation } from "@background-scripts/tabsListeners";

console.log("I am from index.ts :::::: ",this)

const bindFunction = (funtion:any) => funtion.bind(null,"chromes..")

chrome.tabs.onCreated.addListener(bindFunction(tabCreation))
