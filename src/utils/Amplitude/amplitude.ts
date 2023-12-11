import * as amplitude from '@amplitude/analytics-browser';

const AMPLITUDE_API_KEY = process.env.REACT_APP_AMPLITUDE_API_KEY;
const isProdEnvironment = () => true;

export const initAmplitude = () => {
  amplitude.init(AMPLITUDE_API_KEY as string);
};

// export const trackSessionEvents = () => {
//   amplitude.getInstance().trackingSessionEvents(true);
// };

export const sendAmplitudeData = (eventType: string, eventProperties = undefined) => {
  if (isProdEnvironment()) {
    amplitude.track(eventType, eventProperties);
  }
};
