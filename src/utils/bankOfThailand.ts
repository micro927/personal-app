import { format, subDays } from 'date-fns';

export const botApi = {
  endpoint:
    'https://apigw1.bot.or.th/bot/public/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/',
  paramKeys: {
    startPeriod: 'start_period',
    endPeriod: 'end_period',
    currency: 'currency',
  },
  headerKeys: {
    clientId: 'X-IBM-Client-Id',
  },
};

type CurrencyRateProps = Record<
  keyof (typeof botApi)['paramKeys'],
  string | undefined
>;

export const createCurrencyRateEndpoint = (props?: CurrencyRateProps) => {
  const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
  const twoDayBefore = format(subDays(new Date(), 2), 'yyyy-MM-dd');
  const {
    currency = 'JPY',
    endPeriod = yesterday,
    startPeriod = twoDayBefore,
  } = props || {};

  const { endpoint, paramKeys } = botApi;

  const url = new URL(endpoint);
  url.search = new URLSearchParams({
    [paramKeys.currency]: currency,
    [paramKeys.startPeriod]: startPeriod,
    [paramKeys.endPeriod]: endPeriod,
  }).toString();

  return url;
};
