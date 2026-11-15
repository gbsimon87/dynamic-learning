export const spaceArithmeticRoute = {
  path: 'skills/space-arithmetic',
  lazy: () => import('../pages/skills/math/SpaceArithmetic.jsx').then(m => ({ Component: m.default })),
};
