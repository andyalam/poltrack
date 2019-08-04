/** Data types consumed by UI elements including the report card configuration components
 * and search result list component.
 */
import { Actor } from './actors.model';
import { ActorProviderScorecard } from './provider-scorecards.model';
import { ActorProviderScorecardAction } from './scorecard-actions.model';
import { MAX_AZURE_SEARCH_PAGES } from './constants';

/* REPORT CARDS CONFIGURATION DATA MODEL */
/* Data model for the report cards configuration is a hierarchical representation of
 * the three NgRx entities (Actor, ActorProviderScorecard, and ActorProviderScorecardAction):
 *
 * Array<ActorConfig>
 *     Array<ActorProviderScorecardConfig>
 *          Array<ActorProviderScorecardAction>
 *
 * This hierarchy gets updated every time the NgRx entities are updated.
 */

/** The top level of the report card configuration hierarchy.  It contains information about one
 * actor (politician) and scorecards available for this actor.
 */
export interface ActorConfig extends Actor {
  scorecards: Array<ActorProviderScorecardConfig>;
}

/** The second level of the report card configuration hierarchy contains information about one
 * scorecard (set of opinions about political actions from one information provider) and
 * actions (ActorProviderScorecardAction) included in this scorecard.
 * The NgRx entity ActorProviderScorecardAction is used directly as the actions are the lowest level
 * of the configuration hierarchy.
 */
export interface ActorProviderScorecardConfig extends ActorProviderScorecard {
  actions: Array<ActorProviderScorecardAction>;
}

/* AZURE SEARCH REQUEST DATA MODEL */

/** Represents an Azure Search service request */
export class AzureSearchRequest {
  private _totalMatchingRecords = 0;
  private _totalPagesAvailable = 0;
  private _pagesToSkip = 0;

  azureIndexNumber = 0;
  searchString = '';
  orderByFields = '';

  /** Number of pages to skip during the next search with the same
   * search string and other search parameters.
   */
  get pagesToSkip() { return this._pagesToSkip; }
  set pagesToSkip(value: number) {
    this._pagesToSkip = value;
    this.isNextPageAvailable = this.setNextPageAvailable();
  }
  recordsPerPage = 1;
  get totalMatchingRecords() { return this._totalMatchingRecords; }
  set totalMatchingRecords(value: number) {
    this._totalMatchingRecords = value;
    this._totalPagesAvailable = this.setTotalPagesAvailable();
    this.isNextPageAvailable = this.setNextPageAvailable();
  }

  get totalPagesAvailable() { return this._totalPagesAvailable; }

  /** true if more pages of results are available */
  isNextPageAvailable = false;

  private setNextPageAvailable(): boolean {
    return (this._pagesToSkip >= this._totalPagesAvailable) ? false : true;
  }

  private setTotalPagesAvailable() {
    const calculatedPagesAvailable = Math.ceil(this._totalMatchingRecords / this.recordsPerPage);

    return (calculatedPagesAvailable <= MAX_AZURE_SEARCH_PAGES) ? calculatedPagesAvailable : MAX_AZURE_SEARCH_PAGES;
  }

  /** Returns a clone of this instance */
  public clone(): AzureSearchRequest {
    const clone: AzureSearchRequest = new AzureSearchRequest(
      this.azureIndexNumber, this.searchString, this.recordsPerPage
    );
    clone.orderByFields = this.orderByFields;
    clone.pagesToSkip = this.pagesToSkip;
    clone.totalMatchingRecords = this.totalMatchingRecords;

    return clone;
  }

  constructor(indexNumber: number, searchString: string, recordsPerPage: number) {
    this.azureIndexNumber = indexNumber;
    this.searchString = searchString;
    this.recordsPerPage = recordsPerPage;
  }
}

/* SEARCH RESULTS DATA MODEL */
/* Represents data received from the back-end formatted to support selection and deselection of various items
 * (actors, scorecards, actions) by the user. In response to user's actions, search results are stored
 *  (or deleted from) the NgRx entities.
 */
/** Represents one Actor search result with a unique ID
 * usable by Actor Selection UI */
export class ActorSearchResult {
  /** should be equal to item.id */
  id: string;
  isSelected: boolean;
  item: Actor;
}

export interface ActorProviderScorecardSearchResultItem
  extends ActorProviderScorecard {
  actions: Array<ActorProviderScorecardAction>;
}

/** Represents one provider scorecard search result with a unique ID
 * usable by Provider Selection UI */
export class ActorProviderScorecardSearchResult {
  /** should be equal to item.id */
  id: string;
  index: number;
  isSelected: boolean;
  item: ActorProviderScorecardSearchResultItem;
}
