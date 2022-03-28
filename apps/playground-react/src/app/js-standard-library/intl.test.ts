import { englishFormatter, polishFormatter } from './intl';

export const vehiclesEn = ['Motorcycle', 'Bus', 'Car'];
export const vehiclesPl = ['Motor', 'Autobus', 'Auto'];

test('list formatter in english', () => {
  expect(englishFormatter.format(vehiclesEn)).toBe('Motorcycle, Bus, and Car');
});

test('list formatter in polish', () => {
  expect(polishFormatter.format(vehiclesPl)).toBe('Motor, Autobus i Auto');
});
