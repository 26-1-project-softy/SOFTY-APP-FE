export const fonts = {
  title1: {
    fontFamily: 'PretendardBlack',
    fontSize: 36,
    lineHeight: 54,
  },
  title2: {
    fontFamily: 'PretendardBold',
    fontSize: 24,
    lineHeight: 36,
  },
  title3: {
    fontFamily: 'PretendardBold',
    fontSize: 18,
    lineHeight: 21,
  },
  labelL: {
    fontFamily: 'PretendardBold',
    fontSize: 24,
    lineHeight: 30,
  },
  labelM: {
    fontFamily: 'PretendardBold',
    fontSize: 20,
    lineHeight: 24,
  },
  labelS: {
    fontFamily: 'PretendardSemiBold',
    fontSize: 16,
    lineHeight: 19,
  },
  labelXS: {
    fontFamily: 'PretendardSemiBold',
    fontSize: 15,
    lineHeight: 18,
  },
  body1: {
    fontFamily: 'PretendardRegular',
    fontSize: 20,
    lineHeight: 30,
  },
  body2: {
    fontFamily: 'PretendardRegular',
    fontSize: 15,
    lineHeight: 18,
  },
  body3: {
    fontFamily: 'PretendardRegular',
    fontSize: 14,
    lineHeight: 21,
  },
  caption: {
    fontFamily: 'PretendardRegular',
    fontSize: 12,
    lineHeight: 18,
  },
} as const;

export type FontsType = typeof fonts;
