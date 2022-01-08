import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from 'src/models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationPaneService {
  newsHeadlines: Array<Notification>;
  notifications: Array<Notification>;
  display: BehaviorSubject<Array<Notification>>;

  constructor() {
    const alert = new Notification('Deposit Made', `
    Your deposit of 20 GBP was made successfully
      `, '2022-01-05 12:23:14.429+00');

    this.newsHeadlines = [
      new Notification(
        "RIAs see M&A momentum gaining steam in ’22",
        `Eight straight years of record-breaking consolidation in the wealth management 
        space are seen as just an onramp to more of the same this year, according to 
        the latest research from DeVoe & Co. The new report, which includes findings from a 
        survey of registered investment advisers, in some respects contradicts the outlook 
        of the firm’s managing director, David DeVoe. In late November, in a discussion of 
        2021’s record-level M&A activity, DeVoe tamped down expectations for another record 
        year in 2022.`,
        '2022-01-05 12:23:14.429+00',
        'https://www.investmentnews.com/rias-ma-momentum-gaining-steam-22-215546'
      ),
      new Notification(
        "Acorns finalizes plans to offer individual stock trades",
        `While investing in single stocks can expose investors to more volatility, the feature 
        lets customers stay diversified while also allowing them to buy shares of their favorite 
        companies. Acorns Grow Inc. has become the latest online investing app — aimed at helping 
        retail investors plan and save their spare change for long-term retirement goals — to 
        announce plans to allow users to trade individual stocks. `,
        '2022-01-06 08:55:40.429+00',
        'https://www.investmentnews.com/acorns-finalizes-plans-to-offer-free-stock-trades-215585'
      ),
      new Notification(
        "Kamila Elliott becomes first Black chair of CFP Board",
        `Elliott, president of Grid 202 Partners, an RIA in Washington, D.C., takes on the 
        role as the organization has been promoting diversity in the financial advice profession.        `,
        '2022-01-06 08:55:40.429+00',
        'https://www.investmentnews.com/elliott-first-black-chair-cfp-board-215541'
      ),
      new Notification(
        "SageView buys $3.5 billion RPA Channel Financial",
        `The deal represents the fourth such acquisition over a year for Newport Beach, 
        California-based SageView, which last year sold a majority stake to Aquiline Capital 
        Partners. SageView Advisory Group on Thursday announced its first deal of the year, 
        picking up Minneapolis-based retirement plan adviser firm Channel Financial.`,
        '2022-01-07 12:22:34.429+00',
        'https://www.investmentnews.com/sageview-channel-deal-215605'
      )
    ];

    this.notifications = [alert, alert, alert, alert, alert, alert, alert, alert, alert];

    this.display = new BehaviorSubject(this.newsHeadlines);
  }
}
