import { Filter } from '@ghostfolio/common/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  public constructor() {}

  public buildFiltersFromQueryParams({
    filterByAccounts,
    filterByAssetClasses,
    filterBySearchQuery,
    filterByTags
  }: {
    filterByAccounts?: string;
    filterByAssetClasses?: string;
    filterBySearchQuery?: string;
    filterByTags?: string;
  }): Filter[] {
    const accountIds = filterByAccounts?.split(',') ?? [];
    const assetClasses = filterByAssetClasses?.split(',') ?? [];
    const searchQuery = filterBySearchQuery?.toLowerCase();
    const tagIds = filterByTags?.split(',') ?? [];

    return [
      ...accountIds.map((accountId) => {
        return <Filter>{
          id: accountId,
          type: 'ACCOUNT'
        };
      }),
      ...assetClasses.map((assetClass) => {
        return <Filter>{
          id: assetClass,
          type: 'ASSET_CLASS'
        };
      }),
      {
        id: searchQuery,
        type: 'SEARCH_QUERY'
      },
      ...tagIds.map((tagId) => {
        return <Filter>{
          id: tagId,
          type: 'TAG'
        };
      })
    ];
  }
}
