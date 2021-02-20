import { LocationHook, Navigate } from '../types';

export const useStaticLocation: LocationHook = ({ staticPath = '/' } = {}) => {
  const navigate: Navigate = () => {};
  return [staticPath, navigate];
};
