import * as amplitude from '@amplitude/analytics-browser';

const AMPLITUDE_API_KEY = process.env.REACT_APP_AMPLITUDE_API_KEY;
const isProdEnvironment = () => process.env.REACT_APP_ENV === 'production';

export const initAmplitude = (organisation: string) => {
  amplitude.init(AMPLITUDE_API_KEY as string, organisation);
};

// export const trackSessionEvents = () => {
//   amplitude.getInstance().trackingSessionEvents(true);
// };

export const sendAmplitudeData = (eventType: string, eventProperties = undefined) => {
  if (isProdEnvironment()) {
    amplitude.track(eventType, eventProperties);
  }
};
