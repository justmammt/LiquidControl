import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";


const eventEmitter = new EventEmitter();

function subscribe(eventName: string, listener: any) {
  eventEmitter.addListener(eventName, listener);
}

function unsubscribeAll(eventName: string) {
  eventEmitter.removeAllListeners(eventName);
}

function publish(eventName: string, data?: any) {
  eventEmitter.emit(eventName);
}

export { publish, subscribe, unsubscribeAll };
